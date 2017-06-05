<template>
  <footer class="footer">
    <p>Developed by <a href="http://gustavocardoso.me">Gustavo Cardoso</a></p>
    <p>View the project on <a href="https://github.com/gustavocardoso/vue-weather-dashboard">Github</a></p>
  </footer>
</template>

<script>
  export default {

    name: 'Footer',

    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  .footer {
    width: 100%;
    font-size: 1em;
    text-align: center;
    color: #696773;
    padding: 1em 2em 2em 2em;
  }

  .footer a {
    color: #FED766;
  }

  .footer a:hover {
    color: #272727;
  }
</style>
