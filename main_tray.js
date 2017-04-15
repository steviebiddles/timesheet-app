const {ipcMain} = require('electron')
const menubar = require('menubar')
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');

installExtension(VUEJS_DEVTOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));

const mb = menubar({
  width: 1280,
  height: 600
})

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here

  require('electron-debug')({ showDevTools: true })
  require('devtron').install()
})

ipcMain.on('checkLoggedIn', (event) => {
  event.returnValue = true
})

ipcMain.on('testsend', (event, arg) => {
  console.log(arg)  // prints "ping"
  console.log('pong')
})

/*
{
  app: the electron require('app') instance,
  window: the electron require('browser-window') instance,
  tray: the electron require('tray') instance,
  positioner: the electron-positioner instance,
  setOption(option, value): change an option after menubar is created,
  getOption(option): get an menubar option,
  showWindow(): show the menubar window,
  hideWindow(): hide the menubar window
}
*/
