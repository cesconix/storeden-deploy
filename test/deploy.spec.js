import { EventEmitter } from 'events'
import mockFs from 'mock-fs'
import * as zip from '../src/helpers/zip'
import * as upload from '../src/helpers/upload'
import deploy from '../src/main'

const emitter = new EventEmitter()
const mockFileTree = {
  '/templates': {
    project_1: { int_foo: {}, int_bar: {} },
    project_2: { int_hello: {}, int_world: {} }
  }
}

describe('deploy', () => {
  it('should throw an exception if missed "apiKey" property', async () => {
    const check = deploy({})
    await expect(check).rejects.toThrowError('Missing "API Key"')
  })

  it('should throw an exception if missed "apiExchange" property', async () => {
    const check = deploy({ apiKey: 'test' })
    await expect(check).rejects.toThrowError('Missing "API Exchange"')
  })

  it('should throw an exception if missed "sourcePath" property', async () => {
    const check = deploy({
      apiKey: 'test',
      apiExchange: 'test'
    })
    await expect(check).rejects.toThrowError('Missing "Source Path"')
  })

  it('should throw an exception if source path folder does not exist', async () => {
    // setup
    mockFs(mockFileTree)

    // work
    const check = deploy({
      apiKey: 'test',
      apiExchange: 'test',
      sourcePath: { source: '/templates/project_fail' }
    })

    mockFs.restore()

    // assertions
    await expect(check).rejects.toThrowError('Source path is not a directory')
  })

  it('should upload storeden template successfully', async () => {
    // setup
    mockFs(mockFileTree)
    zip.default = jest
      .fn()
      .mockImplementation(() => Promise.resolve('/tmp/archive.zip'))
    upload.default = jest.fn().mockImplementation(() => Promise.resolve(true))

    // work
    const result = await deploy({
      apiKey: 'test',
      apiExchange: 'test',
      sourcePath: { source: '/templates/project_1' },
      emitter
    })

    mockFs.restore()

    // assertions
    expect(result).toEqual(true)
  })
})
