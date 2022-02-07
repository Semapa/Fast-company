const express = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const { generateUserData } = require('../utils/helpers')
const tokenService = require('../services/token.service')
const Token = require('../models/Token')
const router = express.Router({ mergeParams: true })

// /api/auth/signUp
// 1. Получить данные для запросв (email, password...)
// 2. Проверить есть ли пользователь с таким именем
// 3. Захешировать пароль
// 4. Создать пользователя
// 5. Сгенерировать токены

router.post('/signUp', [
  // перечисляем правила для валидации
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длинна пароля 8 символов').isLength({
    min: 8
  }),
  async (req, res) => {
    try {
      // Проверяем валидации
      const errors = validationResult(req)
      // Если есть ошибки
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400
            // errors: errors.array()  // для обработки ошибок, прилетает подробный массив
          }
        })
      }

      // req.body содержатся данные, которые отправляются методом post
      const { email, password } = req.body

      // В коллекции пользователей ищем пользователя по email
      const exitingUser = await User.findOne({ email })

      // Если уже есть такой пользователь
      if (exitingUser) {
        return res.status(400).json({
          // эмулируем формат ошибок из firebase
          error: {
            message: 'EMAIL_EXISTS',
            code: 400
          }
        })
      }

      // Шифруем пароль (12 - сложность шифрования)
      const hashedPassword = await bcrypt.hash(password, 12)

      // Создаем пользователя в БД
      const newUser = await User.create({
        // Ставим на первое место, тк в последствии эти данные могут приходить в req.body
        ...generateUserData(),
        ...req.body,
        password: hashedPassword
      })

      // Генерируем набор токенов
      const tokens = tokenService.generate({ _id: newUser._id })
      await tokenService.save(newUser._id, tokens.refreshToken)

      res.status(201).send({ ...tokens, userId: newUser._id })
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже...'
      })
    }
  }
])

// 1. Валидируем входящие данные
// 2. Находим пользователя
// 3. Сравнить хеши пароля
// 4. Вернуть данные

router.post('/signInWithPassword', [
  check('email', 'Email некорректный').normalizeEmail().isEmail(),
  check('password', 'Пароль не может быть пустым').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      // Если есть ошибки валидации
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400
          }
        })
      }

      const { email, password } = req.body

      const exitingUser = await User.findOne({ email })
      //Если пользователя не существует
      if (!exitingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_NOT_FOUND',
            code: 400
          }
        })
      }

      //Сравниваем хешированые пароли
      const isPasswordEqual = await bcrypt.compare(
        password,
        exitingUser.password
      )
      // Если пароли не совпадают
      if (!isPasswordEqual) {
        return res.status(400).json({
          error: {
            message: 'INVALID_PASSWORD',
            code: 400
          }
        })
      }

      // Генерируем токены
      const tokens = tokenService.generate({ _id: exitingUser._id })
      await tokenService.save(exitingUser._id, tokens.refreshToken)

      res.status(200).send({ ...tokens, userId: exitingUser._id })
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже...'
      })
    }
  }
])

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

router.post('/token', async (req, res) => {
  try {
    // refresh_token -> refreshToken
    const { refresh_token: refreshToken } = req.body
    // в data._id будет id пользователя с таким токеном
    const data = tokenService.validateRefresh(refreshToken)

    // Получаем токен из БД
    const dbToken = await tokenService.findToken(refreshToken)

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // обновляем токены
    const tokens = await tokenService.generate({
      id: data._id
    })

    await tokenService.save(data._id, tokens.refreshToken)

    res.status(200).send({ ...tokens, userId: data._id })
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже...'
    })
  }
})

module.exports = router
