import React, { useEffect } from "react";
import "./index.css";
//const electron = window.require('electron');

function App() {

  useEffect(() => {
    function enviarDatos() {
      const datos = { name: "asdasds", age: 301 }; // Datos a insertar en la base de datos
      window.electronAPI.enviarDatos(datos);
    }

    function enviarDireccion() {
      //const datos = { name: "John dd", age: 301 }; // Datos a insertar en la base de datos
      window.electronAPI.enviarDireccion(
        "C:\\Users\\vwari8y.VW\\Documents\\informesCZ\\prueba4\\Electron-React-NeDB\\InformesSinProcesar\\"
      );
    }

    enviarDatos();
    enviarDireccion();
  });


  useEffect(() => {
    async function obtenerMensaje() {
      try {
        const mensaje = await window.electronAPI.recibirMensaje();
        console.log("Mensaje 1recibido en app.jsx:", mensaje);
      } catch (error) {
        console.error("Error al obtener el mensaje:", error);
      }
    }

    obtenerMensaje();

    
   
  }, []);

  /*useEffect(() => {

    async function DateTimePartnbPathFromFile() {
      try {
        const mensaje = await window.electronAPI.MSJ_DateTimePartnbPathFromFile_Main_to_App();
        console.log("Mensaje 2 recibido en app.jsx:", mensaje);
      } catch (error) {
        console.error("Error al obtener el mensaje:", error);
      }
    }

    DateTimePartnbPathFromFile()

  }, []);
*/

  return (
    <div>
      <h2>Hello from React in Electron! laal</h2>

      {/* <button onClick={openFile}>Abrir Archivo</button>*/}
      <h1>Tabla generada</h1>
      {/*<h1>Data from SQLite Database</h1>
        <ul>
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
          <Table data={convertLastFiveColumns(splitText(fileContent))} />*/}
    </div>
  );
}

export default App;


