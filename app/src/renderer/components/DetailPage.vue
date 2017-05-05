<template>
    <div class="detail-page">
        <h1>Detail Page</h1>
    </div>
</template>

<script>
  import Event from 'renderer/core/Event'

  const page = 'detail-page'

  export default {
    name: page,
    mounted() {
      if (!this.$electron.ipcRenderer.sendSync('status-check')) {
        this.$router.push('sign-in-page')
      }
      Event.$emit('renderPageMenu', page)
    }
  }
</script>

<style>
</style>