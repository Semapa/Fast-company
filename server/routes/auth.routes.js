const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateUserData } = require('../utils/helpers')
const tokenService = require('../services/token.service')
const router = express.Router({ mergeParams: true })

// /api/auth/signUp
// 1. Получить данные для запросв (email, password...)
// 2. Проверить есть ли пользователь с таким именем
// 3. Захешировать пароль
// 4. Создать пользователя
// 5. Сгенерировать токены

router.post('/signUp', async (req, res) => {
  try {
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
})

router.post('/signInWithPassword', async (req, res) => {})

router.post('/token', async (req, res) => {})

module.exports = router
