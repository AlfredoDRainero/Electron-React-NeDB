import React, { useEffect, useState } from "react";
import "./index.css";

import BurgerButton from './components/BurgerButton';
import Tabla_Indice from "./components/TablaIndice";

function App() {

  const [tablaIndice, setTablaIndice] = useState({ rows: [] });


 //console.log("prueba")
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
  },[]);

  

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
        console.log("prueba")
        const msj  = await window.electronAPI.recibirMensajeIndiceDB();//desde preload.js
        //setTablaIndice(msj );
        console.log("Mensaje 2recibido en app.jsx:", msj);
      } catch (error) {
        console.error("Error al obtener el mensaje:", error);
      }
    }
    console.log("tabla",tablaIndice)
    //obtenerMensaje();
    obtenerMensajeIndiceDB();
   
  }, []);
  
  
  return (
    <div>

      <BurgerButton />

      

      <h2>Hello from React in Electron! laal</h2>

      <h1>Tabla generada</h1>

     {/* <Tabla_Indice data={tablaIndice} />*/}
     
    </div>
  );
}

export default App;




 {/*<h1>Data from SQLite Database</h1>
        <ul>
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
          <Table data={convertLastFiveColumns(splitText(fileContent))} />*/}