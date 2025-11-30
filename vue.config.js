const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
}
