import HTTP from '../http'

export default {
  get: function ($params) {
    let config = {
      params: $params
    }
    return HTTP.get('/api/company', config)
  },
  show: function ($companyId, $params) {
    let config = {
      params: $params
    }
    return HTTP.get('/api/company/' + $companyId, config)
  },
  save: function ($companyId, $data) {
    return HTTP.post('/api/company/' + $companyId, $data)
  }
}
