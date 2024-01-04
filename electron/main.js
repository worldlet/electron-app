const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('node:path')
const { join } = require('path')
const fontList = require('font-list')

let fontArr;

// if (require('electron-squirrel-startup')) app.quit()

async function createWindow () {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    backgroundColor: '#2e2c29',
    center: true,
    icon: './public/icon.png',
    frame: true,
    titleBarStyle: 'hidden',  // "default" | "hidden" | "hiddenInset" | "customButtonsOnHover"
    titleBarOverlay: {
      color: 'rgba(255,255,255,0)',
      symbolColor: '#74b1be',
      height: 32
    },
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload.js')
    },
  })

  await fontList.getFonts().then(fonts => {
    fontArr = fonts
    console.log(fonts)
  }).catch(err => {
    console.log(err)
  })

  // 加载 Vue 应用的 index.html 文件
  // win.loadURL(isDev ? 'http://localhost:5173/' : `file://${__dirname}/dist/index.html`)
  // win.loadURL('http://localhost:5173/')
  win.loadFile(join(__dirname, '..', 'dist', 'index.html'))
}

// 隐藏菜单
Menu.setApplicationMenu(null)

// 如果没有窗口打开则打开一个窗口
app.whenReady().then(() => {
  ipcMain.handle('fonts', () => fontArr)
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 在所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
