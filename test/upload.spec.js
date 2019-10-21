import nock from 'nock'
import mockAxios from 'axios'
import mockFs from 'mock-fs'
import upload from '../src/helpers/upload'

const baseUrl = 'http://localhost'
const src = '/home/cesconix/file'
const endpoint = '/template/package.json'

describe('helper: upload', () => {
  beforeEach(() => {
    mockFs({ '/home/cesconix/file': "Hello 👋 I'm a fake content" })
  })

  afterEach(mockFs.restore)

  it('should return http error message if upload fails', async () => {
    nock(baseUrl)
      .post(endpoint)
      .reply(400, { error: { message: 'failed' } })

    const check = upload(src, mockAxios)

    await expect(check).rejects.toThrow()
  })

  it('should throw error if server error occurs', async () => {
    nock(baseUrl)
      .post(endpoint)
      .reply(500, {})

    const check = upload(src, mockAxios)

    await expect(check).rejects.toThrow()
  })
})
