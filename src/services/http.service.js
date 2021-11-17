import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

// При такой настройке можно убрать основную часть url
// из методов .get, .put и тд (н.п. editQuality.jsx)
axios.defaults.baseURL = configFile.apiEndpoint

// Чтобы не менять данные по эндпойнтам, перехватываем здесь
// изменяем на нужные нам нп profession/ на profession.json
// или profession/34234 на profession/34234.json
axios.interceptors.request.use(
  function (config) {
    // Если используем Firebase? то меняем эндпойнты
    if (configFile.isFireBase) {
      // Провверяем есть ли в конце "/"
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
      console.log('config.url', config.url)
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function transformData(data) {
  // Проверяем существует ли data, т.к. Firebase в случае ошибки вернет null
  return data
    ? Object.keys(data).map((key) => ({
        // в этом месте если необходимо можно добавить id, в нашем случае он есть внутри объекта
        ...data[key]
      }))
    : []
}

// Перехватчики ошибок при работе с сервером
axios.interceptors.response.use(
  (res) => {
    // если это FireBase
    if (configFile.isFireBase) {
      // т.к. в хуке useUsers используем {content} необходимо трансформировать res.data
      res.data = { content: transformData(res.data) }
      console.log(res.data)
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
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}

export default httpService
