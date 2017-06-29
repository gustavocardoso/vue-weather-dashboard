<template>
  <section class="location-map">
    <gmap-map v-bind:center="position" v-bind:zoom="16" map-type-id="terrain" class="map">
      <gmap-marker v-bind:position="position" v-bind:clickable="true" v-bind:draggable="true" v-bind:animation="2"></gmap-marker>
    </gmap-map>
  </section>
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

    computed: {
      position() {
        return { lat: parseFloat(this.latitude), lng: parseFloat(this.longitude) }
      }
    },

    created() {
      this.$emit('mapCompleted')
    },

    data () {
      return {
        showMap: false
      }
    },

    props: {
      latitude: {
        type: String,
        default() { return 0 }
      },
      
      longitude: {
        type: String,
        default() { return 0 }
      }
    }
  }
</script>

<style scoped>
  .location-map {
    width: 100%;
    height: 400px;
    margin: 0 auto 2em 0;
  }

  .map {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
  }
</style>
