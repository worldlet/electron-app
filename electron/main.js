const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const path = require('node:path')
const { join, resolve } = require('path');
const fontList = require('font-list')
// const FontManager = require('font-manager')

// const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');

// const isDev = process.env.NODE_ENV === 'development';

if (require('electron-squirrel-startup')) app.quit();

let fontArr;

async function createWindow () {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    center: true,
    icon: './public/icon.png',
    frame: false,
    titleBarStyle: 'hidden',  // "default" | "hidden" | "hiddenInset" | "customButtonsOnHover"
    titleBarOverlay: {
      color: 'rgba(255,255,255,0)',
      symbolColor: '#74b1be',
      height: 32
    },
    // transparent: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload.js')
    },

    // 设置 Content Security Policy
    sandbox: true,
    disableHtmlFullscreenWindowResize: true,
    enableWebSQL: false,
    spellcheck: true,
    safeDialogs: true,
    safeDialogsMessage: 'This message is always displayed in a safe dialog',
  })

  await fontList.getFonts().then(fonts => {
    fontArr = fonts
    console.log(fonts)
  }).catch(err => {
    console.log(err)
  })

  // 获取系统的所有字体信息
  // const fonts = FontManager.getAvailableFontsSync()
  // console.log('System Fonts:', fonts);

  // 加载 Vue 应用的 index.html 文件
  // win.loadURL(isDev ? 'http://localhost:5173/' : `file://${__dirname}/dist/index.html`)
  // win.loadURL('http://localhost:5173/')
  // join(path.resolve(__dirname, '..'), '/dist/index.html')
  win.loadFile(join(__dirname, '..', 'dist', 'index.html'))

  // 打开开发者工具
  // win.webContents.openDevTools()
}

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

// 如果没有窗口打开则打开一个窗口
app.whenReady().then(() => {
  /*installExtension('nhdogjmejiglipccpnnnanhbledajbpd')
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));*/


  ipcMain.handle('fonts', () => fontArr)
  createWindow()
  // showNotification()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 在所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})