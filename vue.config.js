module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000', // 后端地址
          changeOrigin: true,
          ws: true, // 启用 WebSocket 代理
        },
      },
    },
  };