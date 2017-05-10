<template>
  <div class="geolocation">
    <button class="btn-location" v-on:click="getLocation" v-bind:disabled="searching" v-show="!showPosition">
      <div class="loading" v-if="searching">
        <div class="bullet"></div>
        <div class="bullet"></div>
        <div class="bullet"></div>
        <div class="bullet"></div>
        <div class="bullet"></div>
      </div>

      <span v-else>Get your location</span>
    </button>
    <p class="error" v-show="error">{{ error }}</p>
    
    <section class="location-info" v-bind:class="{ highlight: highlight }" v-show="showPosition">
      <h3>Location info:</h3>
      <span>{{ city }}</span>
      <span>{{ locationInfo.country }}</span>
    </section>

    <section class="map">
      <cc-map v-bind:lat="currentPosition.latitude" v-bind:long="currentPosition.longitude" v-if="showMap"></cc-map>
    </section>
  </div>
</template>

<script>
  import CcMap from './Map'

  export default {
    name: 'geolocation',

    components: {
      CcMap
    },

    data () {
      return {
        error: null,
        highlight: false,
        showPosition: false,
        searching: false,
        showMap: false,
        currentPosition: {
          latitude: '',
          longitude: ''
        },
        locationInfo: {
          city: '',
          neighborhood: '',
          admArea: '',
          country: ''
        }
      }
    },

    methods: {
      getLocation: function() {
        if ("geolocation" in navigator) {
          this.error = ''
          this.showPosition = false
          this.searching = true

          navigator.geolocation.getCurrentPosition((position) => {
            this.currentPosition.latitude = position.coords.latitude
            this.currentPosition.longitude = position.coords.longitude

            this.getCity()
          })
        } else {
          this.error = 'Your browser doesn\'t have support for geolocation!' 
        }
      },

      getCity: function() {
        // const geoUrl = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=GYqoGW1BnIwLzyt5zfSzCpVsmoF9Qd83&q='+ this.currentPosition.latitude +'%2C'+ this.currentPosition.longitude +''

        let geoUrl

        if (window.location.protocol === 'https:') {
          geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ this.currentPosition.latitude +','+ this.currentPosition.longitude +'&sensor=true&key=AIzaSyDH9VkR9iqxQ1oqODV5uSQltWGqJxxzj38'
        } else {
          geoUrl = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+ this.currentPosition.latitude +','+ this.currentPosition.longitude +'&sensor=true'
        }
        
        const geoPosition = this.$http.get(geoUrl)

        geoPosition.then((response) => {
          const info = response.body.results[0].address_components

          this.locationInfo.city = info[4].long_name
          this.locationInfo.neighborhood = info[3].long_name
          this.locationInfo.admArea = info[6].short_name
          this.locationInfo.country = info[7].long_name
          
          this.showPosition = true
          this.searching = false
          this.showMap = true

          let self = this
          
          setTimeout(function() {
            self.highlight = true
          }, 1)
        }).catch((error) => {
          this.error = error
          this.searching = false
        })
      }
    },

    computed: {
      city: function() {
        return `${this.locationInfo.neighborhood} - ${this.locationInfo.city}/${this.locationInfo.admArea}`
      }
    }
  }
</script>

<style scoped>
  .geolocation {
    text-align: center;
  }

  .btn-location {
    width: 70%;
    height: 4em;
    font-size: 1.4em;
    font-weight: 700;
    color: #EFF1F3;
    background: #009FB7;
    border: 0;
    border-radius: 1em;
    padding: 1em;
  }

  .btn-location:disabled {
    background: #696773;
  }

  .error {
    margin: 2em 1em;
  }

  .loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .bullet {
    width: .5em;
    height: .5em;
    background: #EFF1F3;
    border-radius: 50%;
    margin: 0 .2em;
  }

  .bullet:nth-child(1) {
    animation: pulse .5s infinite ease-in-out;
  }

  .bullet:nth-child(2) {
    animation: pulse .5s .1s infinite ease-in-out;
  }

  .bullet:nth-child(3) {
    animation: pulse .5s .2s infinite ease-in-out;
  }

  .bullet:nth-child(4) {
    animation: pulse .5s .3s infinite ease-in-out;
  }

  .bullet:nth-child(5) {
    animation: pulse .5s .4s infinite ease-in-out;
  }

  .location-info {
    border-radius: 1em;
    background-color: #fff;
    padding: 1em;
    margin-bottom: 2em;
    transition: background-color .5s ease-in-out;
  }

  .highlight {
    background-color: #FED766;
  }

  .location-info span {
    display: block;
  }

  @keyframes pulse {
    0% {
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }

    50% {
      transform: scale3d(1.4, 1.4, 1.4);
      opacity: .1;
    }

    100% {
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }
  }
</style>
