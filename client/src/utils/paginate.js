import _ from 'lodash'

// Функция для разбития массива на части
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize

  /** Отрезаем массив начиная со startIndex
   * _.slice(items, startIndex)
   * Берем из нового массива нужное количество элементов для одной страницы
   * _.take(_.slice(items, startIndex), pageSize)
   */

  // Чтобы не вкладывать функцию в функцию оборачиваем наш массив в объект lodash и чейним
  // value возвращает конечный массив
  return _(items).slice(startIndex).take(pageSize).value()
}
