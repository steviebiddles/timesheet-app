import Vue from 'vue'
import VueElectron from 'vue-electron'
import VueRouter from 'vue-router'
import Event from 'renderer/core/Event'

Vue.use(VueElectron)
Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/sign-in-page', name: 'sign-in-page', component: require('components/SignInPage.vue')
    },
    {
      path: '/list-page', name: 'list-page', component: require('components/ListPage.vue')
    },
    {
      path: '/search-page', name: 'search-page', component: require('components/SearchPage.vue')
    },
    {
      path: '/detail-page', name: 'detail-page', component: require('components/DetailPage.vue')
    }
  ]
})

const vm = new Vue({
  el: '#app',
  router: router,
  mounted() {
    this.$router.push('list-page')

    // start listening for events
    Event.$on('renderPageMenu', (page) => {
      this.initAppNavigation()

      switch (page) {
        case 'sign-in-page':
          this.appNavigationIsShown = false
          break
        case 'search-page':
        case 'detail-page':
          this.appNavigationIsShown = true
          this.backIsShown = true
          break
        default:
          this.appNavigationIsShown = true
          this.signOutIsShown = true
          this.searchIsShown = true
      }
    })

    Event.$on('externalLink', (url) => {
      this.$electron.shell.openExternal(url)
    })
  },
  data: {
    appNavigationIsShown: true,
    backIsShown: false,
    signOutIsShown: false,
    searchIsShown: false
  },
  methods: {
    initAppNavigation() {
      this.backIsShown = false
      this.signOutIsShown = false
      this.searchIsShown = false
    }
  }
})