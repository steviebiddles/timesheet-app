<template>
    <div class="issue-search">
        <section class="section">
            <div class="container">
                <div class="issue-list">
                    <h1 class="title">Issues</h1>

                    <issue-list-item :myVariable="myVariable">TBS-1234</issue-list-item>
                    <issue-list-item :myVariable="myVariable">BGA-868</issue-list-item>
                    <issue-list-item :myVariable="myVariable">TBS-1923</issue-list-item>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
  import IssueListItem from './IssueListItem.vue'

  export default {
    name: 'issue-list',
    components: {
      IssueListItem
    },
    data () {
      return {
        myVariable: 'stephen'
      }
    },
  }
</script>

<style>
    .issue-list {
    }
</style>