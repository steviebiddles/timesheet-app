import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import IssueList from './components/IssueList.vue'
import IssueDetail from './components/IssueDetail.vue'
import IssueSearch from './components/IssueSearch.vue'
import Event from './core/Event'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {path: '/', name: 'home', component: App},
    {path: '/issue-list', name: 'issue-list', component: IssueList},
    {path: '/issue-detail', name: 'issue-detail', component: IssueDetail},
    {path: '/issue-search', name: 'issue-search', component: IssueSearch}
  ]
})

const app = new Vue({
  router: router,
  data: {
    isIssueList: false,
    isIssueDetailOrIssueSearch: false
  },
  mounted () {
    Event.$on('toggle', (view) => {
      if (view === 'issue-list') {
        this.$data.isIssueList = true
        this.$data.isIssueDetailOrIssueSearch = false
      } else {
        this.$data.isIssueList = false
        this.$data.isIssueDetailOrIssueSearch = true
      }
    })
  }
}).$mount('#app')