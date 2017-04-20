<template>

    <div class="issue-search">

        <section class="section">
            <div class="container">
                <h1 class="title">Search</h1>

                <form>
                    <div class="field has-addons">
                        <p class="control is-expanded">
                            <input class="input" type="text" placeholder="Issue number">
                        </p>
                        <p class="control">
                            <a class="button is-info">Search</a>
                        </p>
                    </div>
                </form>

            </div>
        </section>

        <section class="section">
            <div class="container">
                <nav class="panel">
                    <p class="panel-heading">
                        <img src="https://golfnow.atlassian.net/secure/viewavatar?size=xsmall&avatarId=13015&avatarType=issuetype" alt="Story">
                        <span>BGA-38</span>
                    </p>
                    <div class="panel-block">
                        <div class="content" style="width: 100%;">
                            <h2 class="title is-6 is-marginless">Sort Greenfees by Date Created</h2>
                            <p><small>BRS Green Fee API</small></p>

                            <table class="table is-bordered is-striped">
                                <tbody>
                                <tr>
                                    <td>Reporter</td><td><a href="mailto:peter.murray@brsgolf.com">Peter Murray</a></td>
                                </tr>
                                <tr>
                                    <td>Assignee</td><td><a href="mailto:stephen.mcauley@nbcuni.com">Stephen McAuley</a></td>
                                </tr>
                                <tr>
                                    <td>Priority</td><td><img src="http://findicons.com/files/icons/2015/24x24_free_application/24/up.png" width="14" height="14" alt="Normal"> Normal</td>
                                </tr>
                                </tbody>
                            </table>

                            <p><a class="button is-info is-fullwidth">Add</a></p>
                            <p><a class="button is-danger is-fullwidth">Cancel</a></p>

                        </div>
                    </div>
                </nav>
            </div>
        </section>

    </div>

</template>

<script>
  import Event from '../core/Event'

  const {ipcRenderer} = require('electron')

  export default {
    name: 'issue-search',
    mounted () {
      ipcRenderer.send('testsend', 'ping')
      Event.$emit('toggle')
    },
    data () {
      return {
      }
    },
  }
</script>

<style>
    .issue-search {
    }
</style>