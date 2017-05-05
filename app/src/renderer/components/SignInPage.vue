<template>

        <div class="sign-in-page">

            <h1 class="title has-text-centered">Sign In</h1>

            <div class="notification is-danger" v-show="signInFailure">
                Sign in failed!
            </div>

            <div class="field">
                <p class="control has-icon">
                    <input v-model="username" class="input" type="text" placeholder="Username">
                    <span class="icon is-small">
                      <i class="fa fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icon">
                    <input v-model="password" class="input" type="password" placeholder="Password">
                    <span class="icon is-small">
                      <i class="fa fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button class="button is-success is-pulled-right" @click="processSignIn">Login</button>
                </p>
            </div>

        </div>

</template>

<script>
  import Event from 'renderer/core/Event'

  const page = 'sign-in-page'

  export default {
    name: page,
    mounted() {
      this.$electron.ipcRenderer.send('sign-out')
      Event.$emit('renderPageMenu', page)
    },
    data: function () {
      return {
        username: '',
        password: '',
        signInFailure: false,
      }
    },
    methods: {
      processSignIn (event) {
        event.target.classList.add('is-loading')

        if (this.$electron.ipcRenderer.sendSync('sign-in', this.username, this.password)) {
          this.$router.push('list-page')
        } else {
          this.$data.signInFailure = true
        }

        event.target.classList.remove('is-loading')
      }
    }
  }
</script>

<style lang="scss">
</style>