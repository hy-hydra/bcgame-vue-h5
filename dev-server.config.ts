export const server = {
    proxy: {
      '/api': {
        // target: 'http://8.217.104.138:8110/demo/',
        // changeOrigin: true
        target: 'http://8.217.104.138:8110/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: '0.0.0.0'
}