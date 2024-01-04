const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const { join } = require('path')

async function createWindow () {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    backgroundColor: '#fff',
    center: true,
    icon: './public/icon.png',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../electron/preload.js')
    },
  })

  // 加载 Vue 应用的 index.html 文件
  // win.loadURL(isDev ? 'http://localhost:5173/' : `file://${__dirname}/dist/index.html`)
  // win.loadURL('http://localhost:5173/')
  win.loadFile(join(__dirname, '..', 'dist', 'index.html'))
}

// 如果没有窗口打开则打开一个窗口
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 在所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
