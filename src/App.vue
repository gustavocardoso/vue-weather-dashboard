<template>
  <div id="app">
    <wd-header></wd-header>

    <section class="content">
      <wd-geolocation v-on:locationCompleted="locationCompleted"></wd-geolocation>

      <wd-weather v-if="loadWeather"></wd-weather>
    </section>

    <wd-footer></wd-footer>
  </div>
</template>

<script>
  import store from './store/store'
  import WdHeader from './components/structure/Header'
  import WdFooter from './components/structure/Footer'
  import WdGeolocation from './components/geolocation/Geolocation'
  import WdWeather from './components/weather/Weather'

  export default {
    name: 'app',

    components: {
      WdHeader,
      WdFooter,
      WdGeolocation,
      WdWeather
    },
    
    data() {
      return {
        loadWeather: false
      }
    },

    methods: {
      locationCompleted() {
        this.loadWeather = true
      }
    }
  }
</script>

<style>
  :root {
    --dark: #272727;
    --light: #EFF1F3;
    --highlight: #FED766;
    --shade: #696773;
    --base: #009FB7;
    --error: #c03;
  }

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
    width: 100%;
    padding: 2em;
    margin: 0 auto;
  }

  @media screen and (min-width: 991px) {
    .content {
      width: 60%;
    }
  }
</style>
