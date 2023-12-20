module.exports = {
  packagerConfig: {
    productName: "firstAPP",
    asar: true,
    files: [
      "**/*",
      "!frontend/",
      "!run/",
      "!logs/",
      "!data/"
    ],
    nsis: {
      "oneClick": false,
      "allowElevation": true,
      "allowToChangeInstallationDirectory": true,
      // "installerIcon": "build/icons/icon.ico",
      // "uninstallerIcon": "build/icons/icon.ico",
      // "installerHeaderIcon": "build/icons/icon.ico",
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "shortcutName": "村儿里的"
    },
    mac: {
      // "icon": "build/icons/icon.icns",
      "artifactName": "第一个app",
      "darkModeSupport": true,
      "hardenedRuntime": false
    },
    win: {
      // "icon": "build/icons/icon.ico",
      "artifactName": "第一个app",
      "target": [
        {
          "target": "nsis"
        }
      ]
    },
    linux: {
      // "icon": "build/icons/icon.icns",
      "artifactName": "第一个app",
      "target": [
        "deb"
      ],
      "category": "Utility"
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
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
  ],
};
