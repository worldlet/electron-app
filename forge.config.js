module.exports = {
  packagerConfig: {
    productName: "firstAPP",
    appId: 'app.yard',
    asar: true,
    icon: './public/icon'
  },
  rebuildConfig: {},
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,  // 允许更改安装目录
    installerIcon: "./public/icon.ico",
    uninstallerIcon: "./public/icon.ico",
    installerHeaderIcon: "./public/icon.ico",
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: "村儿里的"
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // iconUrl: 'https://url/to/icon.ico',     // 控制面板显示图标
        setupIcon: './public/icon.ico',         // 安装图标
        // certificateFile: './cert.pfx',
        // certificatePassword: 'this-is-a-secret',
        loadingGif: './public/loading.gif',
        setupExe: 'app.exe',

        "noMsi": true, // 禁用 MSI 安装
        "useZip": true, // 使用 zip 文件而不是 Squirrel 安装程序
        "createDesktopShortcut": true,
        "perMachine": true, // 允许安装程序安装到 Program Files

        // 配置自定义安装过程窗口
        "title": "第一个APP的安装过程",
        "name": "myapp",
        "headerIcon": "./public/icon.ico",
        "backgroundColor": "#dadada",
        "installerIcon": "./public/icon.ico",
        "license": "./public/license.txt",
        "installsperclick": 1,
        "windowed": true,
        "allowToChangeInstallationDirectory": true,
        "displayLanguages": ["en", "es", "fr"], // 显示的安装语言
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './public/icon.png'
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ]
};
