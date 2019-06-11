import Template from './Template'

export default {
  template: Template,
  pages: [
    {
      name: 'Home',
      inputPath: './src/pages/home.js',
      outputPath: './dist/index.html',
      props: {
        title: 'Welcome home!',
      }
    }
  ]
}
