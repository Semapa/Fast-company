const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    // Описываем поля, которые присутствуют в модели
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    completedMeetings: Number, // можно не указывать объект, и тип если один параметр
    image: String,
    profession: { type: Schema.Types.ObjectId, ref: 'Profession' }, // Связь с профессиями по id
    qualities: [{ type: Schema.Types.ObjectId, ref: 'Quality' }], // Т.к. качеств может быть много указываем []
    rate: Number,
    sex: { type: String, enum: ['male', 'female', 'other'] }
  },
  {
    timestamps: true
  }
)

module.exports = model('User', schema)
