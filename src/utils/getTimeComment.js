export function getTimeComment(createTime) {
  let delta = Date.now() - Number(createTime)

  const deltaDays = Math.floor(delta / 1000 / 60 / 60 / 24)
  delta -= deltaDays * 1000 * 60 * 60 * 24

  const deltaHours = Math.floor(delta / 1000 / 60 / 60)
  delta -= deltaHours * 1000 * 60 * 60

  const deltaMinutes = Math.floor(delta / 1000 / 60)
  delta -= deltaMinutes * 1000 * 60

  const deltaSeconds = Math.floor(delta / 1000)

  const deltaMonth = Math.floor(deltaDays / 31)
  const deltaYear = Math.floor(deltaMonth / 12)

  let min, str

  if (deltaSeconds <= 60) {
    str = `1 минута назад`
  }

  if (deltaMinutes) {
    if (deltaMinutes <= 5) {
      min = 5
    } else if (deltaMinutes <= 10) {
      min = 10
    } else if (deltaMinutes <= 30) {
      min = 30
    } else {
      min = deltaMinutes
    }
    str = `${min} минут назад`
  }

  if (deltaHours) {
    str = `${deltaHours} ${getEndingOfWord(deltaHours, [
      'час',
      'часа',
      'часов'
    ])} ${min} минут`
  }
  if (deltaDays) {
    str = `${deltaDays} дней `
  }
  if (deltaMonth) {
    str = `${deltaDays - deltaMonth * 31} ${getEndingOfWord(
      deltaDays - deltaMonth * 31,
      ['день', 'дня', 'дней']
    )} ${deltaMonth} ${getEndingOfWord(deltaMonth, [
      'месяц',
      'месяца',
      'месяцев'
    ])} `
  }

  if (deltaYear) {
    str = `${deltaDays - deltaMonth * 31} ${getEndingOfWord(
      deltaDays - deltaMonth * 31,
      ['день', 'дня', 'дней']
    )} ${deltaMonth - deltaYear * 12} ${getEndingOfWord(
      deltaMonth - deltaYear * 12,
      ['месяц', 'месяца', 'месяцев']
    )} ${deltaYear} ${getEndingOfWord(deltaYear, ['год', 'года', 'лет'])}`
  }

  //   console.log(
  //     `deltaDays:${deltaDays} deltaHours:${deltaHours} deltaMinutes:${deltaMinutes} deltaSeconds:${deltaSeconds}`
  //   )
  return str
}

function getEndingOfWord(num, textArray) {
  num = Math.abs(num) % 100
  const n1 = num % 10
  if (num > 10 && num < 20) {
    return textArray[2]
  }
  if (n1 > 1 && n1 < 5) {
    return textArray[1]
  }
  if (n1 === 1) {
    return textArray[0]
  }
  return textArray[2]
}
