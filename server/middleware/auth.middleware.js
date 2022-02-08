const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
  // метод обпределяет доступность сервера, нас не интересует, пропускаем
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    // Токет хранится с таком формате:
    // Bearer lkjlj;adfasdfasdfojklfdj
    const token = req.headers.authorization.split(' ')[1]
    // Если нет токена
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const data = tokenService.validateAccess(token)
    // в express можно модифицировать req, res и они будут видны в другом месте
    // добавляем поле user в нем значение после проверки
    // data - { _id: '620141c215046055d1d6f76d', iat: 1644312957, exp: 1644316557 }
    req.user = data
    next() // чтобы выполнялись остальные midlleware
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
