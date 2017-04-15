<template>
    <section class="section">
        <div class="container sign-in">

            <h1 class="title">Sign In</h1>

            <form>
                <div class="field">
                    <p class="control has-icon">
                        <input class="input" type="email" placeholder="Email">
                        <span class="icon is-small">
                          <i class="fa fa-envelope"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icon">
                        <input class="input" type="password" placeholder="Password">
                        <span class="icon is-small">
                          <i class="fa fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-success is-pulled-right">Login</button>
                    </p>
                </div>
            </form>

        </div>
    </section>
</template>

<script>
  const {ipcRenderer} = require('electron')

  export default {
    name: 'timesheet-app',
    mounted () {
      this.checkSignedIn()
    },
    methods: {
      checkSignedIn: function () {
        if (ipcRenderer.sendSync('checkLoggedIn')) {
          this.$router.push('issue-search')
        }
      }
    }
  }
</script>

<style>
    .sign-in {
    }
</style>