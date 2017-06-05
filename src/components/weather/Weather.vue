<template>
  <section class="weather">
    <div class="weather-container" v-if="show">
      <header>
        <h2>Weather</h2>
        <p>Current conditions</p>
      </header>

      <section class="info">
        <p class="temperature"><span>{{ weather.temp }}</span>ºC</p>
        <img v-bind:src="weather.icon" class="weather-icon">
        <p class="text">{{ weather.weatherText }}</p>
      </section>
    </div>

    <section class="error" v-if="error">
      <p class="error-text">{{ error }}</p>
    </section>
  </section>
</template>

<script>
  import axios from 'axios'
  import { WEATHER_API_KEY } from '../../config/config'

  export default {

    name: 'Weather',

    data () {
      return {
        key: '',
        weather: {
          temp: '',
          weatherText: '',
          icon: ''
        },
        show: false,
        error: false
      };
    },

    created: function() {
      let wt = this.getLocationKey()
        .then(response => {
          const locationKey = response
          const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${WEATHER_API_KEY}`

          return axios.get(weatherUrl)
        })
        .then((response) => {
          const weatherInfo = response.data[0]

          this.weather.temp = weatherInfo.Temperature.Metric.Value
          this.weather.weatherText = weatherInfo.WeatherText.toLowerCase()
          this.weather.icon = `https://developer.accuweather.com/sites/default/files/${weatherInfo.WeatherIcon}-s.png`
          this.show = true
        })
        .catch((err) => {
          this.show = false
          this.error = 'Unable to load weather info'
        })
    },

    methods: {
      getLocationKey: function() {
        return new Promise((resolve, reject) => {
          const { currentPosition } = this.$store.state.location

          const geoUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${WEATHER_API_KEY}&q=${currentPosition}`
          
          axios.get(geoUrl)
            .then((response) => {
              if (response.data.Key !== '') {
                resolve(response.data.Key)
              }
            })
            .catch(err => reject(err))
        })
      }
    }
  };
</script>

<style scoped>
  .weather {
    text-align: center;
    color: #272727;
    background: #EFF1F3;
    border-radius: 1em;
  }

  .weather header {
    color: #EFF1F3;
    background: #009FB7;
    border-radius: 1em 1em 0 0;
    padding: .5em;
  }

  .weather header p {
    font-size: .8em;
  }

  .info {
    margin-top: 1em;
    padding: 0 1em 1em 1em;
  }

  .info .temperature {
    font-size: 1.2em;
    font-weight: normal;
  }

  .info .temperature span {
    font-size: 1.6em;
    font-weight: 700;
    color: #009FB7;
  }

  .error {
    font-weight: 500;
    text-align: center;
    color: #c03;
  }
</style>
