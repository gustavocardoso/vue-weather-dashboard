<template>
  <div class="map-container">
    <!-- <img class="map" v-bind:src="mapUrl" v-if="showMap" /> -->
    <gmap-map v-bind:center="position" v-bind:zoom="15" map-type-id="terrain" class="map">
      <gmap-marker v-bind:position="position" v-bind:clickable="true" v-bind:draggable="true"></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyC8BKWQMjVTp9aglGTaM3OGclkCwqKuFqI'
    }
  })

  export default {

    name: 'Map',

    props: ['lat', 'long'],

    data () {
      return {
        mapUrl: '',
        showMap: false
      }
    },

    created: function() {
      if (this.lat !== '' && this.long !== '') {
        this.showMap = true
      }
    },

    computed: {
      position: function() {
        return { lat: this.lat, lng: this.long }
      }
    }
  }
</script>

<style scoped>
  .map-container {
    width: 100%;
    height: 400px;
    margin: 0 auto;
  }

  .map {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
  }
</style>
