const electron = require('electron')
const { app, BrowserWindow } = electron

let win = undefined

app.on("ready", () => {
  win = new BrowserWindow({
    height: 800,
    width: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile("index.html")
})
