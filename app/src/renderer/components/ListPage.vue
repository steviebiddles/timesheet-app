<template>
    <div class="list-page">
        <h1 class="title has-text-centered">Issues</h1>

        <list-page-item v-for="issue in issues" :key="issue.id" :issue="issue.issues[0]"></list-page-item>
    </div>
</template>

<script>
  import ListPageItem from 'components/ListPage/Item'
  import Event from 'renderer/core/Event'
  const page = 'list-page'

  export default {
    name: page,
    mounted() {
      if (!this.$electron.ipcRenderer.sendSync('status-check')) {
        this.$router.push('sign-in-page')
      }
      Event.$emit('renderPageMenu', page)
    },
    components: {
      ListPageItem
    },
    data () {
      return {
        issues: this.$electron.ipcRenderer.sendSync('get-issues')
      }
    }
  }
</script>

<style lang="scss">
    .list-page {

    }
</style>