'use strict'

const axios = require('axios')
const axiosInstance = axios.create({
  baseURL: 'https://golfnow.atlassian.net',
  headers: {
    'Content-Type': 'application/json'
  }
})

class Jira {
  constructor () {
  }

  processSignIn (username, password) {
    return new Promise((resolve, reject) => {
      axiosInstance.post('/rest/auth/1/session', {
        username: username,
        password: password
      }).then(response => {
        resolve(`${response.data.session.name}=${response.data.session.value}`)
      }).catch(error => reject(error))
    })
  }

  processSearch (key, cookie) {
    return new Promise((resolve, reject) => {
      axiosInstance.get(
        `/rest/api/2/search?jql=key=${key}&fields=id,key,assignee,reporter,summary,project,status,priority,issuetype,progress`, {
          headers: {
            'cookie': cookie
          }
      }).then(response => {
        resolve(response.data)
      }).catch(error => reject(error))
    })
  }
}
// https://golfnow.atlassian.net/rest/api/2/search?jql=key=BGA-38&fields=id,key,assignee,reporter,summary,project,status,priority,issuetype
module.exports = Jira