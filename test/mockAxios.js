import axios from 'axios'

const mockAxios = axios.create({
  baseURL: 'http://localhost',
  auth: { apiKey: 'user', apiExchange: 'pass' }
})

export default mockAxios
