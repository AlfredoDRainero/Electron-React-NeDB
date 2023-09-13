import React, { useEffect, useState } from "react";
const { ipcMain } = require("electron");

export  function MSJ_FROMFRONT_sendAdressUnformatedReports(direccion) {
  // Verifica si la dirección es null o no
  console.log("Enviada carpeta")
  direccion =
    direccion === null
      ? "C:\\Users\\vwari8y.VW\\Documents\\informesCZ\\prueba4\\Electron-React-NeDB\\InformesSinProcesar\\"
      : direccion;
  // envía la dirección a -> preload -> main
  window.electronAPI.enviarDireccion(direccion);
}











export default  MSJ_FROMFRONT_sendAdressUnformatedReports;

/*
     const [tablaIndice, setTablaIndice] = useState({ rows: [] });
    const [fileList, setFileList] = useState(null);


    //
    useEffect(() => {
      async function obtenerMensaje() {
        try {
          const mensaje = await window.electronAPI.recibirMensaje();
          console.log("Mensaje 1recibido en app.jsx:", mensaje);
        } catch (error) {
          console.error("Error al obtener el mensaje:", error);
        }
      }
  
      async function obtenerMensajeIndiceDB() {
        try {
         // console.log("prueba")
          const msj  = await window.electronAPI.recibirMensajeIndiceDB();//desde preload.js
          
          setTablaIndice(msj);
          //console.log("Mensaje 2recibido en app.jsx:", tablaIndice);
        } catch (error) {
          console.error("Error al obtener el mensaje:", error);
        }
      }
      //console.log("tabla",tablaIndice)
      //obtenerMensaje();
  
      obtenerMensajeIndiceDB();
     
    }, []);
  
  
  
    
    useEffect(() => {
      async function MSJ_FROMMAIN_filesDB_Data_Carpet() {
        try {
          const msj = await window.electronAPI.MSJ_filesDB_Data_Carpet(); //desde preload.js
          //console.log("lista archivos:",msj)
          setFileList(msj);
          //setTablaIndice(msj);
          //console.log("Mensaje 2recibido en app.jsx:", tablaIndice);
        } catch (error) {
          console.error("Error al obtener el mensaje:", error);
        }
      }
  
      MSJ_FROMMAIN_filesDB_Data_Carpet();
    }, []);
  
    useEffect(() => {
      // console.log("Mensaje 2recibido en app.jsx:", tablaIndice);
      console.log("prueba:", fileList);
    }, [tablaIndice, fileList]);
  
  
    */
