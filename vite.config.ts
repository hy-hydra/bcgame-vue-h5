/* eslint-disable node/prefer-global/process */
import path from 'node:path'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'

import { visualizer } from 'rollup-plugin-visualizer'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'

import viewport from 'postcss-mobile-forever'
import autoprefixer from 'autoprefixer'

import { viteVConsole } from 'vite-plugin-vconsole'
import UnoCSS from 'unocss/vite'
import mock from './build/mock/createMockServer'
// import postCssPxToRem from 'postcss-pxtorem'

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  
  return {
    base: env.VITE_APP_PUBLIC_PATH, 
    // 兼容 Cli
    define: {
      'process.env.VUE_APP_API_BASE_URL': JSON.stringify(env.VITE_APP_API_BASE_URL),
      'process.env.VUE_APP_PUBLIC_PATH': JSON.stringify(env.VITE_APP_PUBLIC_PATH),
      'process.env.VITE_APP_WS_URL': JSON.stringify(env.VITE_APP_WS_URL),
      'process.env.VITE_APP_HOSTNAME': JSON.stringify(env.VITE_APP_HOSTNAME),
    },
     
    plugins: [
      vue(),
      vueJsx(),
      visualizer(),
      UnoCSS(),

      legacy({
        targets: ['defaults', 'not IE 11'],
      }),

      Components({
        dts: true,
        resolvers: [VantResolver()],
        types: [],
      }),

      AutoImport({
        include: [
          /\.[tj]sx?$/,
          /\.vue$/,
          /\.vue\?vue/,
        ],
        imports: [
          'vue',
          'vue-router',
          'vitest',
        ],
        dts: true,
      }),

      viteVConsole({
        entry: [path.resolve('src/main.ts')],
        localEnabled: command === 'serve',
        enabled: false,
        config: {
          maxLogNumber: 1000,
          theme: 'light',
        },
      }),

      mock({
        watch: true,
        mockUrlList: [/api/],
        cwd: process.cwd(),
        enable: env.VITE_HTTP_MOCK === 'true' && process.env.NODE_ENV !== 'production',
      }),
    ],

    css: {
      preprocessorOptions:{
        less:{
          additionalData: `@import "@/styles/var.less";`,
          javascriptEnabled: true,

        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
          viewport({
            appSelector: '#app',
            viewportWidth: 375,
            maxDisplayWidth: 750,
          }),
          // postCssPxToRem({
          //   rootValue({ file }) {
          //     return file.indexOf("vant") !== -1 ? 37.5 : 75;
          //   },
          //   propList: ["*"]
          // })
        ],
      },
   
    },

    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
    },

    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets'),
      },
    },

    server: {
      host: true,
      port: 3000,
      proxy: env.VITE_HTTP_MOCK === 'true'
        ? undefined
        : {
            '/api': {
              target: '',
              ws: false,
              changeOrigin: true,
            },
          },
    },
  }
}