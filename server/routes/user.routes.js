const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })

router.patch('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params

    // Проверить что userId совпадает с юзером в текущей сессии
    // req.user = { _id: '620141c215046055d1d6f76d', iat: 1644312957, exp: 1644316557 }
    if (userId === req.user._id) {
      // {new: true} - важный параметр значит, что updatedUser получим только после того,
      // как фактически все обновится в базе, если без него мы получим на фронтенд старые данные
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true
      })
      res.send(updatedUser)
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже...'
    })
  }
})

// Добавляем middleware auth для защиты роута
router.get('/', auth, async (req, res) => {
  try {
    const list = await User.find()
    res.send(list) // Если у запроса статус 200, можно его не указывать
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже...'
    })
  }
})

module.exports = router
