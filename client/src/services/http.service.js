import axios from 'axios'
import { toast } from 'react-toastify'
// import { date } from 'yup/lib/locale'
import configFile from '../config.json'
import authService from './auth.service'

import localStorageService from './localStorage.service'

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
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()
    const isExpired = refreshToken && expiresDate < Date.now()

    // Если используем Firebase? то меняем эндпойнты
    if (configFile.isFireBase) {
      // Провверяем есть ли в конце "/"
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'

      // console.log('expiresDate ', expiresDate)
      // console.log('refreshToken', refreshToken)
      // Если есть refresh token
      if (isExpired) {
        // Возможно тут нужен url: https://securetoken.googleapis.com/v1/token
        const data = await authService.refresh()
        // console.log(data)
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        })
      }

      // Если юзер авторизован для доступа к защищенным путям
      // для Firebase нужно модифицировать config
      const accessToken = localStorageService.getAccessToken()
      if (accessToken) {
        // Если есть токен добавляем в query параметры auth
        config.params = { ...config.params, auth: accessToken }
      }
    } else {
      // Если есть refresh token
      if (isExpired) {
        // Возможно тут нужен url: https://securetoken.googleapis.com/v1/token
        const data = await authService.refresh()
        // Так как ключ значения одинаковые, то просто data
        localStorageService.setTokens({ data })
      }

      // Если юзер авторизован для доступа к защищенным путям
      // для Firebase нужно модифицировать config
      const accessToken = localStorageService.getAccessToken()
      if (accessToken) {
        // Если есть токен добавляем в query параметры auth
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`
        }
      }
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
    res.data = { content: res.data }
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
  patch: http.patch,
  delete: http.delete
}

export default httpService
