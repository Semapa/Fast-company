const express = require('express')
const auth = require('../middleware/auth.middleware')
const Comment = require('../models/Comment')
const router = express.Router({ mergeParams: true })

// /api/comment
router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      // чтобы получить query параметры orderBy, equalTo
      const { orderBy, equalTo } = req.query
      // теперь их можно использовать при поиске в БД
      const list = await Comment.find({ [orderBy]: equalTo })
      res.send(list)
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже...'
      })
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        pageId: req.body.currentUserId
      })
      res.status(201).send(newComment)
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже...'
      })
    }
  })

router.delete('/:commentId', auth, async (req, res) => {
  try {
    const { commentId } = req.params
    const removedComment = await Comment.findById(commentId)
    // анaлогчный метод, только с фильтром
    // const removedComment = await Comment.find({ _id: commentId })

    // проверяем, можно ли удалять комментарий
    // может удалять тот, кто его создал
    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.remove()
      return res.send(null)
    } else {
      // если не совпадают id
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже...'
    })
  }
})

module.exports = router
