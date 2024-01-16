/*
 * @Author: 陈庆贤
 * @Date: 2023-09-09 15:24:48
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-10-19 15:55:53
 * @Description:
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': 'http://api-driver.marsview.cc'
    }
  }
})
