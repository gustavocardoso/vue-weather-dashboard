<template>
  <header class="main-header">
    <wd-logo></wd-logo>
    <h1 class="name">Weather Dashoboard</h1>
    <p class="description">A simple app to play with vue.js</p>
  </header>
</template>

<script>
  import WdLogo from './Logo.vue'

  export default {
    name: 'header',
    components: {
      WdLogo
    }
  }
</script>

<style scoped>
  .main-header {
    color: var(--light);
    text-align: center;
    background: var(--dark);
    padding: 1em 2em;
  }

  .main-header .name {
    font-size: 2em;
    font-weight: bold;
    letter-spacing: -.1em;
    color: var(--highlight);
    margin: 0;
  }

  .main-header .description {
    font-size: 1.1em;
    margin-top: -.5em;
  }
</style>
