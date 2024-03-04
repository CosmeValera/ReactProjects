const path = require('path');

module.exports = {
  // ... Other webpack configuration options

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Convert images < 8kb to base64 strings
              fallback: 'file-loader',
            },
          },
        ],
      },
    ],
  },
};
