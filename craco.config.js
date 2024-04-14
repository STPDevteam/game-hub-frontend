const CracoLessPlugin = require('craco-less')

module.exports = {
  babel: {
    plugins: ["@babel/plugin-proposal-class-properties"],
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Add a rule to handle .mjs files
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      });

      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        },
        styleLoaderOptions: { injectType: 'lazyStyleTag' },
        modifyLessRule(lessRule, context) {
          lessRule.test = /\.theme\.(less|css)$/i
          return lessRule
        }
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
