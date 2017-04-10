<template>
    <div class="about">
        <h1>About Vue {{ name }}</h1>
    </div>
</template>

<script>
  const {ipcRenderer} = require('electron')

  export default {
    data () {
      return {
        name: "Stephen"
      }
    },
    mounted () {
        ipcRenderer.send('testsend', 'ping')
    },
    methods: {
    }
  }
</script>

<style>
    .about {
        background: green;
    }
</style>