<template lang="html">
  <footer class="footer">
    <p class="developer">Developed by <a href="http://gustavocardoso.me">Gustavo Cardoso</a></p>
    <p class="repo">View the project on <a href="https://github.com/gustavocardoso/vue-weather-dashboard">Github</a></p>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
  }
</script>

<style scoped>
  .footer {
    width: 100%;
    font-size: 1em;
    text-align: center;
    color: var(--shade);
    padding: 1em 2em 2em 2em;
  }

  .footer a {
    color: var(--base);
  }

  .footer a:hover {
    color: var(--dark);
  }
</style>
