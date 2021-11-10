import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../config.json'

// При такой настройке можно убрать основную часть url
// из методов .get, .put и тд (н.п. editQuality.jsx)
axios.defaults.baseURL = config.apiEndpoint

// Перехватчики ошибок при работе с сервером
axios.interceptors.response.use(
  (res) => res,
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
