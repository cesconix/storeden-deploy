import { EventEmitter } from 'events'
import fs from 'fs'
import axios from 'axios'
import zip from './helpers/zip'
import upload from './helpers/upload'

const deploy = async ({
  apiKey,
  apiExchange,
  sourcePath,
  emitter = new EventEmitter()
}) => {
  if (!apiKey) {
    throw new Error('Missing "API Key"')
  }

  if (!apiExchange) {
    throw new Error('Missing "API Exchange"')
  }

  if (!sourcePath) {
    throw new Error('Missing "Source Path"')
  }

  if (typeof sourcePath === 'string') {
    sourcePath = { source: sourcePath }
  }

  try {
    fs.accessSync(sourcePath.source)
  } catch (e) {
    throw new Error('Source path is not a directory')
  }

  const instance = axios.create({
    baseURL: 'https://connect.storeden.com/v1.1'
  })

  instance.defaults.headers.common.key = apiKey
  instance.defaults.headers.common.exchange = apiExchange

  try {
    let file

    emitter.emit('zip', sourcePath)
    file = await zip(sourcePath, process.env.TMPDIR || '.', 'storeden')

    emitter.emit('upload', file)
    file = await upload(file, instance)

    emitter.emit('deployed', true)

    return file
  } catch (e) {
    emitter.emit('deployed', e)
    return new Error(e)
  }
}

export default deploy
