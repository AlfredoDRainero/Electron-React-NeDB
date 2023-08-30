import React, { useEffect, useState } from "react";
import "./index.css";
import styled from "styled-components";
import BurgerButton from './components/BurgerButton';
import Tabla_Indice from "./components/TablaIndice";


const MainDiv = styled.div`

  display:grid;
  background-color: #383b3d;
  color: #e9e9e9;
`;


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
        
        setTablaIndice(msj);
        //console.log("Mensaje 2recibido en app.jsx:", tablaIndice);
      } catch (error) {
        console.error("Error al obtener el mensaje:", error);
      }
    }
    console.log("tabla",tablaIndice)
    //obtenerMensaje();

    obtenerMensajeIndiceDB();
   
  }, []);

  useEffect(() => {
    console.log("Mensaje 2recibido en app.jsx:", tablaIndice);
  }, [tablaIndice]);
  
  
  return (
    <>
    <MainDiv>

      <BurgerButton />

      

      <h2>Hello from React in Electron! laal</h2>

      <h1>Tabla generada</h1>

     

      
  

      {/*<a>
      {JSON.stringify(tablaIndice)}    
  </a>*/}
      <Tabla_Indice data={tablaIndice}/>
      </MainDiv>
    </>
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