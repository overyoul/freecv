// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut, clipboard, Menu } = require('electron')
const path = require('path')
const schedule = require('node-schedule');
const Store = require('electron-store');
const store = new Store();
const createWindow = () => {
  // Create the browser window.
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  
  // 加载 index.html
  mainWindow.loadFile('index.html')
  // 这里是每秒都去拿一次剪贴板的内容，然后进行存储
  schedule.scheduleJob('* * * * * *', () => {store
    if(store.size==0||store.get((store.size-1).toString()).toString()!=clipboard.readText()){
      store.set(store.size.toString(), clipboard.readText());
    }
    console.log(store.size)
    console.log(store.get((store.size-1).toString()))
    // clipboard.write()
  });

  // 打开开发工具 
  // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。


app.whenReady().then(() => {
  createWindow()

  //注册Ctr+x事件
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    } else {
      mainWindow.minimize();
    }
  })

  // const ret1 = globalShortcut.register('CommandOrControl+C', () => {
  //   console.log('CommandOrControl+C is pressed')
  //   // clipboard.writeText('hello i am a bit of text!')
  //   console.log(clipboard.readText())
  //   console.log(clipboard.read())
  //   // console.log(clipboard.readHTML())
  // })

  if (!ret) {
    console.log('registration failed')
  }

  // 验证是否注册成功
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。
