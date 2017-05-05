<template>

    <div class="issue-search">

        <h1 class="title has-text-centered">Search</h1>

        <form>
            <div class="field has-addons">
                <p class="control is-expanded">
                    <input id="search-key" class="input" type="text" v-model="key" placeholder="Issue number">
                </p>
                <p class="control">
                    <a class="button is-info" @click="processSearch">Search</a>
                </p>
            </div>
        </form>

        <div v-if="result === true">

            <hr/>

            <div class="panel">

                <p class="panel-heading">
                    <img :src="issue.issuetype.iconUrl" :alt="issue.issuetype.name">
                    <span>{{ issue.key }}</span>
                </p>

                <div class="panel-block">
                    <div class="content">
                        <h2 class="title is-6 is-marginless">{{ issue.summary }}</h2>
                        <p><small>{{ issue.project.name }}</small></p>

                        <progress :class="progress" :value="issue.progress.progress" max="100">`${issue.progress.progress}%`</progress>

                        <table class="table is-bordered is-striped">
                            <tbody>
                            <tr>
                                <td>Reporter</td>
                                <td><a :href="`mailto:${issue.reporter.emailAddress}`">{{ issue.reporter.displayName }}</a></td>
                            </tr>
                            <tr>
                                <td>Assignee</td>
                                <td><a :href="`mailto:${issue.assignee.emailAddress}`">{{ issue.assignee.displayName }}</a></td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{{ issue.status.name }}</td>
                            </tr>
                            <tr>
                                <td>Priority</td>
                                <td><img :src="issue.priority.iconUrl" width="14" height="14" :alt="issue.priority.name"> {{ issue.priority.name }}</td>
                            </tr>
                            </tbody>
                        </table>

                        <p class="field">
                            <a class="button is-success is-fullwidth" @click="saveSearch">
                            <span class="icon is-small">
                              <i class="fa fa-check"></i>
                            </span>
                                <span>Save</span>
                            </a>
                        </p>
                        <p class="field">
                            <a class="button is-danger is-fullwidth" @click="cancelSearch">
                            <span class="icon is-small">
                              <i class="fa fa-times"></i>
                            </span>
                                <span>Cancel</span>
                            </a>
                        </p>

                    </div>

                </div>

            </div>

        </div>

        <div v-else-if="result === false">

            <hr/>

            <div class="notification is-warning">
                Not Found. Please try another search.
            </div>

        </div>

        <div v-if="saved === false">

            <hr/>

            <div class="notification is-danger">
                Not Saved. Please try again.
            </div>

        </div>

    </div>

</template>

<script>
  import Event from 'renderer/core/Event'

  const page = 'search-page'

  export default {
    name: page,
    mounted() {
      if (!this.$electron.ipcRenderer.sendSync('status-check')) {
        this.$router.push('sign-in-page')
      }
      Event.$emit('renderPageMenu', page)
    },
    data: function () {
      return {
        key: '',
        result: null,
        response: null,
        saved: null,
        issue: {
          key: '',
          summary: '',
          issuetype: '',
          project: '',
          reporter: '',
          assignee: '',
          priority: '',
          progress: '',
          status: ''
        }
      }
    },
    methods: {
      processSearch (event) {
        event.target.classList.add('is-loading')

        const response = this.$electron.ipcRenderer.sendSync('search', this.$data.key)

        if (response.total === 1) {
          this.$data.result = true
          this.$data.response = response
          this.$data.issue = {
            'key': response.issues[0].key,
            'summary': response.issues[0].fields.summary,
            'issuetype': response.issues[0].fields.issuetype,
            'project': response.issues[0].fields.project,
            'reporter': response.issues[0].fields.reporter,
            'assignee': response.issues[0].fields.assignee,
            'priority': response.issues[0].fields.priority,
            'progress': response.issues[0].fields.progress,
            'status': response.issues[0].fields.status
          }
        } else {
          this.$data.result = false
        }

        event.target.classList.remove('is-loading')
      },
      saveSearch (event) {
        if (this.$electron.ipcRenderer.sendSync('save', this.$data.response)) {
          this.$router.push('list-page')
        } else {
          this.$data.saved = false
        }
      },
      cancelSearch () {
        this.$router.push('list-page')
      }
    },
    computed: {
      progress () {
        let isStatus = 'progress is-success'

        if (this.issue.progress.progress < 25) {
          isStatus = 'progress is-danger'
        } else if (this.issue.progress.progress < 100) {
          isStatus =  'progress is-info'
        }

        return isStatus
      }
    }
  }
</script>

<style lang="scss">
    .panel-block {
        padding-bottom: 1rem;

        .content {
            width: 100%;
        }
    }
</style>