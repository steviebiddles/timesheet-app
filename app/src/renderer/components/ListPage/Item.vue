<template>
    <div class="list-page-item">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    <img :src="issue.fields.issuetype.iconUrl" :alt="issue.fields.issuetype.name"> {{ issue.key }}
                </p>
                <a class="card-header-icon" @click="toggleCardBody">
                  <span class="icon">
                    <i :class="upOrDownAngle"></i>
                  </span>
                </a>
            </header>
            <div class="card-body" v-show="isCardBodyShown">
                <div class="card-content">
                    <div class="content">
                        <h2 class="title is-6 is-marginless">{{ issue.fields.summary }}</h2>
                        <p><small>{{ issue.fields.project.name }}</small></p>

                        <progress :class="progress" :value="issue.fields.progress.progress" max="100">`${issue.fields.progress.progress}%`</progress>

                        <table class="table is-bordered is-striped">
                            <tbody>
                            <tr>
                                <td>Reporter</td>
                                <td><a :href="`mailto:${issue.fields.reporter.emailAddress}`">{{ issue.fields.reporter.displayName }}</a> <small class="is-danger" v-if="issue.fields.reporter.active === false">Inactive</small></td>
                            </tr>
                            <tr>
                                <td>Assignee</td>
                                <td><a :href="`mailto:${issue.fields.assignee.emailAddress}`">{{ issue.fields.assignee.displayName }}</a> <small class="is-danger" v-if="issue.fields.assignee.active === false">Inactive</small></td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{{ issue.fields.status.name }}</td>
                            </tr>
                            <tr>
                                <td>Priority</td>
                                <td>
                                    <img :src="issue.fields.priority.iconUrl" :alt="issue.fields.priority.name" width="14" height="14"> {{ issue.fields.priority.name }}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <p class="has-text-centered"><a :href="`https://golfnow.atlassian.net/browse/${ issue.key }`" @click="openExternal">View issue on Jira <i class="fa fa-external-link"></i></a></p>
                    </div>
                </div>
                <footer class="card-footer">
                    <a class="card-footer-item is-danger">Delete</a>
                    <a class="card-footer-item">Log Work</a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
  import Event from 'renderer/core/Event'

  export default {
    name: 'list-page-item',
    data: function () {
      return {
        isCardBodyShown: false
      }
    },
    props: [
      'issue'
    ],
    methods: {
      toggleCardBody () {
        this.isCardBodyShown = !this.isCardBodyShown
      },
      openExternal (event) {
        event.preventDefault()
        Event.$emit('externalLink', event.target.href)
      }
    },
    computed: {
      upOrDownAngle () {
        if (this.isCardBodyShown) {
          return 'fa fa-angle-up'
        } else {
          return 'fa fa-angle-down'
        }
      },
      progress () {
        let isStatus = 'progress is-success'

        if (this.issue.fields.progress.progress < 25) {
          isStatus = 'progress is-danger'
        } else if (this.issue.fields.progress.progress < 100) {
          isStatus =  'progress is-info'
        }

        return isStatus
      }
    }
  }
</script>

<style lang="scss">
    .list-page-item {
        .card-header-title {
            img {
                margin-right: .500rem;
            }
        }

        .card-header-icon {
            border-left: 1px solid #DBDBDB;
        }

        .card-footer {
            a {
                &.is-danger {
                    color: #ff3860;

                    &:hover {
                        color: #4a4a4a;
                    }
                }
            }
        }

        small {
            &.is-danger {
                color: #FF2B56;
                display: block;
            }
        }

        .fa-external-link {
            font-size: 1rem;
            display: inline;
            margin-left: .2500rem;
        }
    }
</style>