const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

const Config = require('electron-config')
const config = new Config()

const Jira = require('./Jira')
const jira = new Jira()

app.setName('Timesheet App')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : `file://${__dirname}/index.html`

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 750,
    title: app.getName()
  })

  // load
  win.loadURL(winURL)

  if (process.env.NODE_ENV === 'development') {
    // Install `electron-debug` with `devtron`
    require('electron-debug')({showDevTools: true})

    // Install `vue-devtools`
    let installExtension = require('electron-devtools-installer')
    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then(() => {})
      .catch(err => {
        console.log('Unable to install `vue-devtools`: \n', err)
      })

    win.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('status-check', (event) => {
  return event.returnValue = config.has('sessionCookie')
})

ipcMain.on('sign-in', (event, username, password) => {
  jira.processSignIn(username, password)
    .then(cookie => {
      config.set('sessionCookie', cookie)
      event.returnValue = true
    })
    .catch(error => {
      config.delete('sessionCookie')
      event.returnValue = false
    })
})

ipcMain.on('sign-out', (event) => {
  config.delete('sessionCookie')
})

ipcMain.on('search', (event, key) => {
  jira.processSearch(key, config.get('sessionCookie'))
    .then(result => {
      event.returnValue = result
    })
    .catch(error => {
      console.error(error)
      event.returnValue = error
    })
})

ipcMain.on('save', (event, issue) => {
  const key = `issues.${issue.issues[0].key}`
  config.set(key, issue)

  return event.returnValue = config.has(key)
})

ipcMain.on('get-issues', (event) => {
  if (config.has('issues')) {
    event.returnValue = config.get('issues')
  } else {
    event.returnValue = null
  }
})
