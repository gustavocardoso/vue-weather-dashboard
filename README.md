# vue-weather-dahboard

> A simple app to play with vue resources

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Teste
When i ran the `npm run test` commmand, i had an error like this:

```bash
ERROR in   Error: Child compilation failed:
  Entry module not found: Error: Can't resolve '/Users/guneto/Developer/vue-weather-dahboard/.tmp/mocha-webpack/index.html' in '/Users/guneto/Developer/vue-weather-dahboard/.tmp/mocha-webpack':
  Error: Can't resolve '/Users/guneto/Developer/vue-weather-dahboard/.tmp/mocha-webpack/index.html' in '/Users/guneto/Developer/vue-weather-dahboard/.tmp/mocha-webpack'
```

Accordingly with this [issue](https://github.com/jantimon/html-webpack-plugin/issues/151), I solved the problem just creating the file:

```bash
touch /Users/guneto/Developer/vue-weather-dahboard/.tmp/mocha-webpack/index.html
```

*Adjust the path to your own*

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
