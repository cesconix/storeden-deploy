import FormData from 'form-data'
import fs from 'fs'
import debug from 'debug'

const log = debug('storeden')

const upload = async (src, axios) => {
  const stream = fs.createReadStream(src)

  const form = new FormData()
  form.append('file', stream)

  const res = await axios({
    url: '/template/package.json',
    method: 'POST',
    data: form,
    headers: form.getHeaders(),
    validateStatus: status => status < 500
  })

  log(res.data)

  if (res.status !== 200) {
    return new Error(res.data.error.message)
  }

  return true
}

export default upload
