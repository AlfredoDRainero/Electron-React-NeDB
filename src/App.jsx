
import React, { useState, useEffect } from "react";
import {splitText, convertLastFiveColumns} from './utils/TextFormater2'
import "./index.css"
//const electron = window.require('electron');


const Table = ({ data }) => {
  return (
    <table>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};



function App() {


  function enviarDatos() {
    const datos = { name: "asdasds", age: 301 }; // Datos a insertar en la base de datos
    window.electronAPI.enviarDatos(datos);

  }

  function enviarDireccion() {
    //const datos = { name: "John dd", age: 301 }; // Datos a insertar en la base de datos
    window.electronAPI.enviarDireccion("C:\\Users\\vwari8y.VW\\Documents\\informesCZ\\prueba4\\Electron-React-NeDB\\InformesSinProcesar\\");
    
  }

  enviarDatos();
  enviarDireccion();
  const [state, setState] =    useState();
  const [fileContent, setFileContent] = useState('');
  const [data, setData] = useState([]);

  /*function getValueFromFileAndRow(file, row, column) {
    if (file.length > row && file[row].length > column) {
      return file[row][column];
    }
    return undefined;
  }*/


  useEffect(() => {    return () => { };}, []); 





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





//--------------------------------------------------------------------------

