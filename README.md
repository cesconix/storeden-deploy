# Storeden Deploy

> deploy template made easy

[![build status](https://travis-ci.com/cesconix/storeden-deploy.svg)](https://travis-ci.com/cesconix/storeden-deploy)
[![npm version](https://img.shields.io/npm/v/storeden-deploy.svg)](https://www.npmjs.com/package/storeden-deploy)
[![dependencies](https://img.shields.io/david/cesconix/storeden-deploy.svg)](https://david-dm.org/cesconix/storeden-deploy)
[![devDependencies](https://img.shields.io/david/dev/cesconix/storeden-deploy.svg)](https://david-dm.org/cesconix/storeden-deploy?type=dev)
[![vulnerabilities](https://snyk.io/test/github/cesconix/storeden-deploy/badge.svg?targetFile=package.json)](https://snyk.io/test/github/cesconix/storeden-deploy?targetFile=package.json)
[![coverage](https://coveralls.io/repos/github/cesconix/storeden-deploy/badge.svg)](https://coveralls.io/github/cesconix/storeden-deploy)
[![javascript style guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![conventional commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Utility to deploy store theme on a Storeden instance.

## Installation

```bash
npm install storeden-deploy
```

## Usage

```javascript
import deploy from 'storeden-deploy'

deploy({
  apiKey: '<api-key>',
  apiExchange: '<api-exchange>',
  sourcePath: { source: '<source-path>', exclude: '<glob-pattern>' }
})
```

### Parameters

| Parameter     |      Type      | Mandatory | Default | Description                                                         |
| ------------- | :------------: | :-------: | :-----: | ------------------------------------------------------------------- |
| `apiKey`      |     String     |    yes    |         | API Key associated with your Storeden Store                         |
| `apiExchange` |     String     |    yes    |         | API Exchange associated with your Storeden Store                    |
| `sourcePath`  | String, Object |    yes    |         | Local source path where the script will look for template to deploy |

### Returns

A `Promise` fulfilled with `true` if deploy process succeded, otherwise an error object.

### Example - Deploy template

```javascript
import deploy from 'storeden-deploy'

let deployed

try {
  deployed = await deploy({
    apiKey: '927f134fe4c92986a528376f34a16c3FAKEd9b4d198359435da5f4f1f1a2d78042566d',
    apiExchange: '23c79cc5fb832839465df5d96fef55cae10584b58ab937FAKEecbdd9bbe33ad3',
    sourcePath: './myProject/dist'
  })
} catch (e) {
  deployed = false
}

console.log(deployed) // true for sure!
```

### Example - Deploy template excluding some directory or file

```javascript
import deploy from 'storeden-deploy'

let deployed

try {
  deployed = await deploy({
    apiKey: '927f134fe4c92986a528376f34a16c3FAKEd9b4d198359435da5f4f1f1a2d78042566d',
    apiExchange: '23c79cc5fb832839465df5d96fef55cae10584b58ab937FAKEecbdd9bbe33ad3',
    sourcePath: {
      source: './myProject/dist',
      exclude: '**/{widgets,generated/**'
    } // `exclude` property value must be a glob pattern'
  })
} catch (e) {
  deployed = false
}

console.log(deployed) // true for sure!
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT. Copyright (C) 2019 H-FARM (Enabling Solutions) - [Francesco Pasqua](mailto:francesco.pasqua@h-farm.com).
