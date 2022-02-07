const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

class TokenService {
  // return: accessTocken, refreshToken, expiresIn
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('accessSecret'), {
      expiresIn: '1h' //Время действия токена
    })

    const refreshToken = jwt.sign(payload, config.get('refreshSecret'))

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600
    }
  }

  // будет сохранять рефрештокен для определенного пользователя
  async save(user, refreshToken) {
    // проверяем, есть ли для этого пользователя запись с токеном
    const data = await Token.findOne({ user })
    if (data) {
      data.refreshToken = refreshToken // обновляем токен
      return data.save()
    }

    // Если записи не было, то создаем
    const token = await Token.create({ user, refreshToken })
    return token
  }
}

module.exports = new TokenService()
