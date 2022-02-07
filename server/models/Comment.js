const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    // Описываем поля, которые присутствуют в модели
    content: { type: String, required: true },
    // на чьей странице находится комментарий
    pageId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // id того человека, кто оставил комментарии
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: { createdAt: 'created_at' } // изменить createdAt в формат 'created_at', чтобы не переделывать после firebase
  }
)

module.exports = model('Comment', schema)
