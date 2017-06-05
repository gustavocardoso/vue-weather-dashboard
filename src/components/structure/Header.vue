<template>
  <header class="main-header">
    <wd-logo></wd-logo>
    <h1 class="name">Weather Dashoboard</h1>
    <p class="description">A simple app to play with vue.js</p>
  </header>
</template>

<script>
  import WdLogo from './Logo'

  export default {
    name: 'header',
    components: {
      WdLogo
    }
  }
</script>

<style scoped>
  .main-header {
    color: #F7FFF7;
    text-align: center;
    background: #272727;
    padding: 1em 2em;
  }

  .main-header .name {
    font-size: 2em;
    font-weight: bold;
    letter-spacing: -.1em;
    color: #FED766;
    margin: 0;
  }

  .main-header .description {
    font-size: 1.1em;
    color: #EFF1F3;
    margin-top: -.5em;
  }
</style>
