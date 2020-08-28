const path = require('path')
const execSync = require('child_process').execSync

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 从git中读取版本
process.env.VUE_APP_VERSION = execSync('git log -1 HEAD --pretty=format:"%h"').toString().trim()

module.exports = {
  assetsDir: 'static',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))

    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_TITLE
      return args
    })
  },
  productionSourceMap: false
}
