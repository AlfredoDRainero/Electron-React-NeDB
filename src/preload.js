// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

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


  recibirMensaje,
  recibirMensajeIndiceDB,
  MSJ_DateTimePartnbPathFromFile_Main_to_App
});

// Función para recibir el mensaje desde main.js y exponerlo al contexto del navegador
async function recibirMensaje() {
  return new Promise((resolve) => {
    ipcRenderer.once('mensaje-desde-main', (_, mensaje) => {
      resolve(mensaje);
    });
    ipcRenderer.send('obtener-mensaje');
  });
}


async function recibirMensajeIndiceDB() {
  return new Promise((resolve) => {
    ipcRenderer.once('mensaje-desde-main_indice_DB_B', (_, mensaje) => {        //desde main
    
      resolve(mensaje);
    });
    ipcRenderer.send('obtener-mensaje_indice_fom_DB');                           //desde main
  });
}

//
async function MSJ_DateTimePartnbPathFromFile_Main_to_App() {
  return new Promise((resolve) => {
    ipcRenderer.once('dateTimePartnbPathFromFile_Main_to_App', (_, mensaje) => {
      console.log("2 mensaje:"+mensaje)
      resolve(mensaje);
    });
    ipcRenderer.send('obtener-mensaje2');
    
  });
}

