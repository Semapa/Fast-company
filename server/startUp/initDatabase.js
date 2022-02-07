/*  Задача этого метода проверить
 *  1. У любого пользователя будет как минимум в БД qualities & professions
 *  2. Они равны mock данным
 */

// Подключаем модели для взамимодействия с БД
const Profession = require('../models/Profession')
const Quality = require('../models/Quality')

const professionMock = require('../mock/professions')
const qualitiesMock = require('../mock/qualities')

module.exports = async () => {
  // Получить все записи професссий
  const professions = await Profession.find()
  if (professions.length !== professionMock.length) {
    await createInitialEntity(Profession, professionMock)
  }

  const qualities = await Quality.find()
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock)
  }
}

async function createInitialEntity(Model, data) {
  // Чтобы не было дублирований, очищаем коллекцию
  await Model.collection.drop()

  // Работает с массивом и ждет пока все выполнятся
  return Promise.all(
    data.map(async (item) => {
      try {
        // Удаляем id из объекта, чтобы он не записывался в базу данных
        delete item._id
        const newItem = new Model(item)
        // сохраняем в базу
        await newItem.save()
        return newItem
      } catch (error) {
        return error
      }
    })
  )
}
