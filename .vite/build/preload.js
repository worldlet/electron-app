"use strict";const{contextBridge:e,ipcRenderer:s}=require("electron");e.exposeInMainWorld("versions",{node:()=>process.versions.node,chrome:()=>process.versions.chrome,electron:()=>process.versions.electron,fonts:()=>s.invoke("fonts")});e.exposeInMainWorld("getInfo",{test:o=>s.send("test",o)});