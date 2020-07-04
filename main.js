const electron = require('electron')
const { app, BrowserWindow } = electron

let win = undefined

app.on("ready", () => {
  win = new BrowserWindow({
    height: 500,
    width: 700,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile("index.html")
})
