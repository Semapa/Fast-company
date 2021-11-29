import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

// Создаем отдельный экземпляр axios
// чтобы этот файл не являлся настройкой для глобального axios
// можно создавать несколько различных инстансов
const http = axios.create({
  // При такой настройке можно убрать основную часть url
  // из методов .get, .put и тд (н.п. editQuality.jsx)
  baseURL: configFile.apiEndpoint
})

// Чтобы не менять данные по эндпойнтам, перехватываем здесь
// изменяем на нужные нам нп profession/ на profession.json
// или profession/34234 на profession/34234.json
http.interceptors.request.use(
  function (config) {
    // Если используем Firebase? то меняем эндпойнты
    if (configFile.isFireBase) {
      // Провверяем есть ли в конце "/"
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
      // console.log('config.url', config.url)
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function transformData(data) {
  // Проверяем существует ли data, т.к. Firebase в случае ошибки вернет null
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        // в этом месте если необходимо можно добавить id, в нашем случае он есть внутри объекта
        ...data[key]
      }))
    : data
}

// Перехватчики ошибок при работе с сервером
http.interceptors.response.use(
  (res) => {
    // если это FireBase
    if (configFile.isFireBase) {
      // т.к. в хуке useUsers используем {content} необходимо трансформировать res.data
      res.data = { content: transformData(res.data) }
    }
    return res
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedErrors) {
      console.log('http.service - error:', error)
      toast.error('Somthing was wrong. Try it later')
      toast('Unexpected error')
    }

    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
}

export default httpService
