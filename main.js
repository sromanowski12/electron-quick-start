const electron = require('electron');
const {
  app,
  BrowserWindow,
  Menu
} = require('electron');
const shell = require('electron').shell
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is garbage collected.
let mainWindow;
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Baseball33',
  database: 'sakila'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is', results[0].solution);
});

connection.end();
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  var application_menu = [{
    label: 'File',
    submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: () => {
          electron.dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory', 'multiSelections']
          });
        }
      },
      {
        label: 'Exit',
        click: () =>{
          app.exit();
        }
      },
    ]
  },
  {
    label: 'GitHub',
    click: () => {
      shell.openExternal('https://github.com/sromanowski12')
    }
  },
  {      
    label: 'submenu1',
    submenu: [{
        label: 'item1',
        accelerator: 'CmdOrCtrl+A',
        click: () => {
          mainWindow.openDevTools();
        }
      },
      {
        label: 'item2',
        accelerator: 'CmdOrCtrl+B',
        click: () => {
          mainWindow.closeDevTools();
        }
      }
    ]
  }];
  if (process.platform == 'darwin') {
    const name = app.getName();
    application_menu.unshift({
      label: name,
      submenu: [{
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        },
      ]
    });
  }

  menu = Menu.buildFromTemplate(application_menu);
  Menu.setApplicationMenu(menu);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});