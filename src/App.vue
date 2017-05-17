<template>
  <div id="app">
    <wd-header></wd-header>

    <section class="content">
      <wd-geolocation></wd-geolocation>

      <wd-weather></wd-weather>
    </section>
  </div>
</template>

<script>
  import WdHeader from './components/header/Header'
  import WdGeolocation from './components/geolocation/Geolocation'
  import WdWeather from './components/weather/Weather'

  export default {
    name: 'app',
    data() {
      return {
        
      }
    },

    components: {
      WdHeader,
      WdGeolocation,
      WdWeather
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Rubik', sans-serif;
  }

  body {
    font: normal normal 16px/1.5 'Roboto Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .content {
    padding: 2em;
  }
</style>
