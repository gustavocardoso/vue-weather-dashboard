<template>
  <section class="geolocation-box">
    <button class="getlocation" v-on:click="getLocation" v-bind:disabled="searching" v-show="!showPosition">
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
    
    <section class="locationinfo" v-bind:class="{ '-highlight': highlight }" v-show="showPosition">
      <h3>Location info:</h3>
      <span>{{ locationInfo.formatted }}</span>
      <span>{{ locationInfo.country }}</span>
    </section>

    <section class="map">
      <cc-map v-bind:latitude="currentLatitude" v-bind:longitude="currentLongitude" v-if="showMap" v-on:mapCompleted="mapCompleted"></cc-map>
    </section>
  </section>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'

  import { GMAPS_API_KEY, WEATHER_API_KEY } from '../../config/config'
  
  import CcMap from './Map'

  export default {
    name: 'geolocation',

    components: {
      CcMap
    },

    computed: {
      ...mapState({
        location: state => state.location
      }),
      
      currentPosition() {
        console.log(this.location)
        const location = this.$store.state.location
        return `${location.latitude},${location.longitude}`
      },

      currentLatitude() {
        const { latitude } = this.$store.state.location
        return latitude
      },

      currentLongitude() {
        const { longitude } = this.$store.state.location
        return longitude
      },

      locationInfo() {
        const { locationInfo } = this.$store.state
        
        return {
          city: locationInfo.city,
          neighborhood: locationInfo.neighborhood,
          admArea: locationInfo.admArea,
          country: locationInfo.country,
          formatted: `${locationInfo.neighborhood} - ${locationInfo.city} / ${locationInfo.admArea}`
        }
      }
    },

    data () {
      return {
        error: null,
        highlight: false,
        showPosition: false,
        searching: false,
        showMap: false
      }
    },

    methods: {
      getCity() {
        let geoUrl

        if (window.location.protocol === 'https:') {
          geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.currentPosition}&sensor=true&key=${GMAPS_API_KEY}`
        } else {
          geoUrl = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${this.currentPosition}&sensor=true`
        }
        
        axios.get(geoUrl)
          .then((response) => {
            const info = response.data.results[0].address_components
            
            const payload = {
              city: info[4].long_name,
              neighborhood: info[3].long_name,
              admArea: info[6].short_name,
              country: info[7].long_name
            }

            this.$store.dispatch('updateLocationInfo', payload)
                      
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
      },

      getLocation() {
        if ("geolocation" in navigator) {
          this.error = ''
          this.showPosition = false
          this.searching = true

          navigator.geolocation.getCurrentPosition((position) => {
            this.getLocationKey(position.coords.latitude, position.coords.longitude)
              .then((response) => {
                if (response !== '') {
                  const payload = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    currentPosition: `${position.coords.latitude},${position.coords.longitude}`,
                    locationKey: response
                  }

                  this.$store.dispatch('updateLocation', payload)

                  this.getCity()
                }
              })
              .catch(err => err)
          })
        } else {
          this.error = 'Your browser doesn\'t have support for geolocation!' 
        }
      },

      getLocationKey(latitude, longitude) {
        return new Promise((resolve, reject) => {
          const geoUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${WEATHER_API_KEY}&q=${latitude},${longitude}`
          
          axios.get(geoUrl)
            .then((response) => {
              if (response.data.Key !== '') {
                resolve(response.data.Key)
              }
            })
            .catch(err => reject(err))
        })
      },

      mapCompleted() {
        this.$emit('locationCompleted')
      }
    }
  }
</script>

<style scoped>
  .geolocation-box {
    text-align: center;
  }

  .geolocation-box .getlocation {
    width: 70%;
    height: 4em;
    font-size: 1.4em;
    font-weight: 700;
    color: var(--light);
    background: var(--base);
    border: 0;
    border-radius: 1em;
    padding: 1em;
    margin-top: 1em;
  }

  .geolocation-box .getlocation:disabled {
    background: #var(--shade);
  }

  .geolocation-box .error {
    margin: 2em 1em;
  }

  .geolocation-box .loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .geolocation-box .bullet {
    width: .5em;
    height: .5em;
    background: var(--light);
    border-radius: 50%;
    margin: 0 .2em;
  }

  .geolocation-box .bullet:nth-child(1) {
    animation: pulse .5s infinite ease-in-out;
  }

  .geolocation-box .bullet:nth-child(2) {
    animation: pulse .5s .1s infinite ease-in-out;
  }

  .geolocation-box .bullet:nth-child(3) {
    animation: pulse .5s .2s infinite ease-in-out;
  }

  .geolocation-box .bullet:nth-child(4) {
    animation: pulse .5s .3s infinite ease-in-out;
  }

  .geolocation-box .bullet:nth-child(5) {
    animation: pulse .5s .4s infinite ease-in-out;
  }

  .locationinfo {
    border-radius: 1em;
    background-color: #fff;
    padding: 1em;
    margin-bottom: 2em;
    transition: background-color .5s ease-in-out;
  }

  .-highlight {
    background-color: var(--highlight);
  }

  .locationinfo span {
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
