module.exports = {
    // ...other configurations
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,  // Process both .js and .jsx files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],  // Babel presets for ES6+ and React
            },
          },
        },
        // other rules if any
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],  // Add .jsx to the list of resolved file extensions
    },
  };
  