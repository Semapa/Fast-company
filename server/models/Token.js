const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    // id человека для которого токен актуален
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = model('Token', schema)
