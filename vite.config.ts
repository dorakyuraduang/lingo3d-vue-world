import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias: {
      '@': path.resolve('src')
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
      },
    },
  }, server: {
    open: true,
    host: '0.0.0.0'
  }
}
)