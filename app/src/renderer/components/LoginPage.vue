<template>
    <div class="login-page">
        <h1 @click="getName">Login Page 123</h1>
    </div>
</template>

<script>
  export default {
    name: 'login-page',
    methods: {
      getName () {
        console.log(this.$electron.remote.app.getName())
        this.$electron.ipcRenderer.send('testsend', 'ping')
      }
    }
  }
</script>

<style lang="scss">
    h1 {
        background: $testColour;
    }
</style>