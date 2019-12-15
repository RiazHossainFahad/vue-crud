module.exports = {
  /** Bypass CORS */
  devServer: {
    proxy: {
      '/api': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
