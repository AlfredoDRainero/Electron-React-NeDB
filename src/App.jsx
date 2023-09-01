import React, { useEffect, useState } from "react";
import "./index.css";
import styled from "styled-components";

//components
import BurgerButton from './components/BurgerButton';
import Tabla_Indice from "./components/TablaIndice";


//functions
import MSJ_FROMFRONT_sendAdressUnformatedReports from "./SendAndReceiveData";

//import MSJ_FROMBACK_IndiceDB from "./SendAndReceiveData";
//import MSJ_FROMBACK_filesDB_Data_Carpet from "./SendAndReceiveData";


import FileListTable from "./components/TablaFiles";


const MainDiv = styled.div`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  display:grid;
  //background-color: #383b3d;
  //color: #e9e9e9;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  
  background-color: #242424;

  padding:2rem;
`;


function App() {

  const [tablaIndice, setTablaIndice] = useState({ rows: [] });
  //const [fileList, setFileList] = useState(null);

 //console.log("prueba")
  useEffect(() => {


    MSJ_FROMFRONT_sendAdressUnformatedReports();    // it's used to send to main a carpet adress. where we can find unformated "Reports CHR and HDR" files 



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
    // console.log("Mensaje 2recibido en app.jsx:", tablaIndice);
    //console.log("prueba:", fileList);
  }, [tablaIndice]);



  
  
  return (
    <>
    <MainDiv>

      <BurgerButton />

      

      <h2>Hello from React in Electron! laal</h2>

      <h1>Tabla generada</h1>

<FileListTable/>
    

      
  

      {/*<a>
      {JSON.stringify(tablaIndice)}    
  </a>*/}
      <Tabla_Indice data={tablaIndice}/>
      </MainDiv>
    </>
  );
}

export default App;




/*<h1>Data from SQLite Database</h1>
        <ul>
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
          <Table data={convertLastFiveColumns(splitText(fileContent))} />*/