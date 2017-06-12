<template>
  <section class="weather-box">
    <div class="container" v-if="show">
      <header>
        <h2>Weather</h2>
        <p>Current conditions</p>
      </header>

      <section class="info">
        <p class="temperature"><span>{{ weather.temp }}</span>ºC</p>
        <img v-bind:src="weather.icon" class="icon">
        <p class="text">{{ weather.weatherText }}</p>
      </section>
    </div>

    <section class="error" v-if="error">
      <p class="text">{{ error }}</p>
    </section>
  </section>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'

  import { WEATHER_API_KEY } from '../../config/config'

  export default {

    name: 'Weather',

    computed: {
      ...mapState({
        locationKey: state => state.location.locationKey
      })
    },

    created() {
      this.getCurrentConditions()
    },

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

    methods: {
      getCurrentConditions() {
        const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${this.locationKey}?apikey=${WEATHER_API_KEY}`

        axios.get(weatherUrl)
        .then((response) => {
          const weatherInfo = response.data[0]
          const weatherIconName = (parseInt(weatherInfo.WeatherIcon, 10) < 10) ? `0${weatherInfo.WeatherIcon}` : weatherInfo.WeatherIcon

          this.weather.temp = weatherInfo.Temperature.Metric.Value
          this.weather.weatherText = weatherInfo.WeatherText.toLowerCase()
          this.weather.icon = `https://developer.accuweather.com/sites/default/files/${weatherIconName}-s.png`
          this.show = true
        })
        .catch((err) => {
          this.show = false
          this.error = 'Unable to load weather info: ' + err
        })
      }
    }
  };
</script>

<style scoped>
  .weather-box {
    text-align: center;
    color: var(--dark);
    background: var(--light);
    border-radius: 1em;
  }

  .weather-box header {
    color: #EFF1F3;
    background: #009FB7;
    border-radius: 1em 1em 0 0;
    padding: .5em;
  }

  .weather-box header p {
    font-size: .8em;
  }

  .weather-box .info {
    margin-top: 1em;
    padding: 0 1em 1em 1em;
  }

  .weather-box .info .temperature {
    font-size: 1.2em;
    font-weight: normal;
  }

  .weather-box .info .temperature span {
    font-size: 1.6em;
    font-weight: 700;
    color: var(--base);
  }

  .weather-box .error {
    font-weight: 500;
    text-align: center;
    color: var(--error);
    padding: 1em;
  }
</style>
