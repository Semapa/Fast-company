const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    // Описываем поля, которые присутствуют в модели
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // добавит два поля, когда создана модель и когда обновлена
  }
)

module.exports = model('Profession', schema)
