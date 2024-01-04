const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  fonts: () => ipcRenderer.invoke('fonts'),
  // 除函数之外，我们也可以暴露变量
})

contextBridge.exposeInMainWorld('getInfo', {
  test: (testInfo) => ipcRenderer.send('test', testInfo),
})
