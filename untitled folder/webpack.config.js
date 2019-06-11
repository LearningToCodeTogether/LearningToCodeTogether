const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

function StaticSiteGenerator(){
  console.log('constructor', arguments)
}

StaticSiteGenerator.prototype.apply = function(compiler){
  console.log('apply', arguments);
   compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
     console.log('assets:', compilation.assets)
   })
}



module.exports = {

  entry: './src/index.js',

  output: {
    filename: 'index.js',
    // path: './dist/index.js',
    /* IMPORTANT!
     * You must compile to UMD or CommonJS
     * so it can be required in a Node context: */
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
    ]
  },

  plugins: [
    new StaticSiteGenerator(),
    // new StaticSiteGeneratorPlugin({
    //   paths: [
    //     '/pages/',
    //   ],
    //   locals: {
    //     // Properties here are merged into `locals`
    //     // passed to the exported render function
    //     greet: 'Hello'
    //   }
    // })
  ]

};
