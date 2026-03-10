const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/art-decor-frontend/' // Reemplaza 'nombre-del-repositorio' con el nombre de tu repositorio en GitHub
  : '/'
})