import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import About from './components/About.vue'

Vue.use(VueRouter)
let router = new VueRouter({
  routes: [
    { path: '/', component: App },
    { path: '/about', component: About }
  ]
})

const app = new Vue({
  router
}).$mount('#app')