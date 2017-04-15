<template>
    <div class="issue-search">
        <section class="section">
            <div class="container">
                <div class="issue-list">
                    <h1 class="title">Issues</h1>

                    <issue-list-item>TBS-1234</issue-list-item>
                    <issue-list-item>BGA-868</issue-list-item>
                    <issue-list-item>TBS-1923</issue-list-item>
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
    }
  }
</script>

<style>
    .issue-list {
    }
</style>