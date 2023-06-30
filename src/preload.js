// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
/*const { ipcRenderer, contextBridge } = require("electron");
const { platform } = require("os");
// can be accessed through window.app
contextBridge.exposeInMainWorld('app', {
platform: platform(), // create a property oj the app object for
platform
}
)
*/

// Importa los módulos de Electron que necesites
const { contextBridge, ipcRenderer } = require('electron');

// Exponer métodos o propiedades al contexto del navegador
contextBridge.exposeInMainWorld('electronAPI', {
  // Ejemplo de método que se puede llamar desde el proceso de renderizado
  enviarMensaje: (mensaje) => {
    ipcRenderer.send('mensaje', mensaje);
  },

  enviarDatos: (datos) => {
    ipcRenderer.send('datos-para-insertar', datos);
  },

  enviarDireccion: (datos) => {
    ipcRenderer.send('direccion', datos);
  },


  // Ejemplo de método que escucha eventos del proceso principal
  recibirMensaje: (callback) => {
    ipcRenderer.on('mensaje', (event, mensaje) => {
      callback(mensaje);
    });
  }
});


/*
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendDataToMainProcess: (data) => {
    ipcRenderer.send('data-from-renderer', data);
  },
  receiveDataFromMainProcess: (callback) => {
    ipcRenderer.on('data-from-main', (event, data) => {
      callback(data);
    });
  }
});*/