import axios from 'axios'
import qs from 'qs'

import MockAdapter from 'axios-mock-adapter'

const DEV_SERVER = window.location.hostname.indexOf('dev') !== -1 || window.location.hostname.indexOf('localhost') !== -1
const API_URL = !DEV_SERVER ? 'https://prod.ru/api' : 'https://test.ru/api'

let mock = new MockAdapter(axios)
mock.onGet('/api/company').reply(200, [
  { id: 1, name: 'Company1', date_reg: '19.01.2017', ogrn: '4545455454', active: 1, type: 'ИП' },
  { id: 2, name: 'Company2', date_reg: '02.10.2017', ogrn: '5455454545', active: 0, type: 'ООО' },
  { id: 3, name: 'Company3', date_reg: '19.01.2018', ogrn: '4646546565', active: 0, type: 'ООО' }
])

mock.onGet('/api/company/1').reply(200, { id: 1, name: 'Company1', date_reg: '19.01.2017', ogrn: '4545455454', active: 1, type: 'ИП' })
mock.onGet('/api/company/2').reply(200, { id: 2, name: 'Company2', date_reg: '02.10.2017', ogrn: '5455454545', active: 0, type: 'ООО' })
mock.onGet('/api/company/3').reply(200, { id: 3, name: 'Company3', date_reg: '19.01.2018', ogrn: '4646546565', active: 0, type: 'ООО' })

mock.onPost('/api/company/1').reply(200, {})
mock.onPost('/api/company/2').reply(200, {})
mock.onPost('/api/company/3').reply(200, {})

const HTTP = axios.create({
  baseURL: API_URL,
  headers: {},
  interceptors: {
    response: function (response) {
      console.log('response111: ', response)
    }
  }
})

HTTP.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
HTTP.defaults.headers.post['Content-Type'] = ''
HTTP.defaults.paramsSerializer = function (params) {
  return qs.stringify(params, {arrayFormat: 'brackets'})
}

const CancelToken = axios.CancelToken
const source = CancelToken.source()

HTTP.defaults.cancelToken = source.token
HTTP.defaults.timeout = 5000

HTTP.interceptors.request.use(function (config) {
  if (config.method === 'post' || config.method === 'put') {
    config.timeout = 20000
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

HTTP.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // отдаем ошибку дальше
  return window.Promise.reject(error)
}) // .bind(axios)

export default HTTP
