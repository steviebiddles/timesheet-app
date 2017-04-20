import Vue from 'vue'
import VueElectron from 'vue-electron'
import VueRouter from 'vue-router'

Vue.use(VueElectron)
Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/login-page', name: 'login-page', component: require('components/LoginPage.vue')
    },
    {
      path: '/list-page', name: 'list-page', component: require('components/ListPage.vue')
    }
  ]
})

const vm = new Vue({
  el: '#app',
  router: router,
  mounted() {
    if (2 < 2) {
      this.$router.push('list-page')
    } else {
      this.$router.push('login-page')
    }
  }
})