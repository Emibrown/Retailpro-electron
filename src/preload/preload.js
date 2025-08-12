const { contextBridge } = require('electron');
const { version } = require('../../package.json');

contextBridge.exposeInMainWorld('appInfo', { version });
