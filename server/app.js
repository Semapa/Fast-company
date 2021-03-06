const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const path = require('path')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// все роуты на которые будет реагировать приложения будут начинаться /api
app.use('/api', routes)

const PORT = config.get('port') ?? 8080

if (process.env.NODE_ENV === 'production') {
  // Если продакшн, отдаем статическую папку build
  app.use('/', express.static(path.join(__dirname, 'client')))

  const indexPath = path.join(__dirname, 'client', 'index.html')

  // Если до этого не сработали запросы по api
  app.get('*', (req, res) => {
    res.sendFile(indexPath)
  })
  // console.log('Production')
} else {
  console.log('Development')
}

async function start() {
  try {
    // проверить, есть ли в базе базовые сущности
    // как только произошло соединение, один раз(once, on-каждый раз)
    mongoose.connection.once('open', () => {
      initDatabase()
    })

    // подключаем БД
    await mongoose.connect(config.get('mongoUri'))
    console.log(chalk.green(`MongoDB connected.`))
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    })
  } catch (error) {
    console.log(chalk.red(error.message))
    // останавливаем процесс
    process.exit(1)
  }
}

start()
