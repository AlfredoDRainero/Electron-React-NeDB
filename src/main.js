const { app, BrowserWindow } = require("electron");

const { ipcMain } = require("electron");

const { SaveFilesToDB } = require("./services/database/FilesToDb");

const { obtenerRegistrosEncontrados } = require("./services/database/loadDB_NEDB");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //preload: path.join(__dirname, './preload.js'),
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// carga de archivos en base de datos con llamada activada pedida desde react
ipcMain.on("direccion", (event, ubicacion) => {
  SaveFilesToDB(ubicacion);
  console.log("ubicacion:", ubicacion);
});






ipcMain.on("obtener-mensaje2", async (event) => {

 await obtenerRegistrosEncontrados().then((registrosEncontrados) => {
    // Aquí podemos acceder a los datos en la variable registrosEncontrados
    event.sender.send("dateTimePartnbPathFromFile_Main_to_App", registrosEncontrados)   
  })
  .catch((error) => {

    console.error("Error al obtener registros:", error);
  });

    
});






// Función asincrónica que retorna una promesa con un mensaje
function doSomethingAsync() {
  return new Promise((resolve) => {
    // Simulamos una operación asincrónica
    //setTimeout(() => {
    resolve("¡Hola desde la promesa en main.js!");
    // }, 2000); // Esperamos 2 segundos antes de resolver la promesa
  });
}


ipcMain.on("obtener-mensaje", async (event) => {
  try {
    const mensaje = await doSomethingAsync();
    event.sender.send("mensaje-desde-main", mensaje);
  } catch (error) {
    // Manejo de errores si es necesario
    event.sender.send("mensaje-desde-main", "Error al obtener el mensaje");
  }
});
