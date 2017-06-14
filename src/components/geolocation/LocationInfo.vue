<template>
  <section class="locationinfo" v-bind:class="{ '-highlight': highlight }">
    <h3>Location info:</h3>
    <span>{{ location }}</span>
    <span>{{ country }}</span>
  </section>
</template>

<script>
  export default {
    name: 'locationInfo',

    props: {
      location: {
        type: String,
        default() { return 'Location not passed' }
      },

      country: {
        type: String,
        default() { return 'Country not passed' }
      },

      highlight: {
        type: Boolean,
        default() { return false }
      }
    },

    mounted: function() {
      this.$emit('locationInfoCompleted')
    }
  }
</script>

<style scoped>
  .locationinfo {
    border-radius: 1em;
    background-color: #fff;
    padding: 1em;
    transition: background-color .5s ease-in-out;
  }

  .-highlight {
    background-color: var(--highlight);
  }

  .locationinfo span {
    display: block;
  }
</style>
