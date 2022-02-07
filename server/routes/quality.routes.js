const express = require('express')
const Quality = require('../models/Quality')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const list = await Quality.find()
    res.status(200).send(list) // нам ключ лист не нужен, поэтому вместо json() делаем таким способом
  } catch (error) {
    // отправится на клиент
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже...'
    })
  }
})

module.exports = router
