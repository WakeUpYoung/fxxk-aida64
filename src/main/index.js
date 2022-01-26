import { app, BrowserWindow,ipcMain } from 'electron'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let timeToHideToolbar = null

function createWindow () {
  /**
   * Initial window options
   */
  const { Menu } = require('electron')

  mainWindow = new BrowserWindow({
    height: 360,
    width: 637,
    useContentSize: true,
    frame: true,
    show: true,
    backgroundColor: '#2fa8fb',

  })

  mainWindow.loadURL(winURL)
  Menu.setApplicationMenu(null);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  /*mainWindow.on('move', () => {
    if (timeToHideToolbar == null) {
      timeToHideToolbar = setTimeout(function () {
        mainWindow.webContents.send('hello', '1')
        console.log('hide the toolbar')
      }, 2000)
    } else {
      clearTimeout(timeToHideToolbar)
      timeToHideToolbar = setTimeout(function () {
        mainWindow.webContents.send('hello', '1')
        console.log('hide the toolbar')
      }, 2000)
    }

  })*/

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('minimize', (event) => {
  if (mainWindow.isMaximized()) {

  } else {
    mainWindow.minimize()
  }
})
ipcMain.on('closeApp', (e) => {
  app.quit()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
