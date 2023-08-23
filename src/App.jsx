import React, { useEffect, useState } from "react";
import "./index.css";

//import BurgerButton from './BurgerButton';

//const electron = window.require('electron');
//import './styles.css';

const BurgerButton = ({ isActive, onClick }) => {
  return (
    <BurgerButtonWrapper className={isActive ? "active" : ""} onClick={onClick}>
      <Line1 isActive={isActive} rotation={45} />
      <Line2 isActive={isActive} rotation={-45} />
    </BurgerButtonWrapper>
  );
};

import styled from "styled-components";

const BurgerButtonWrapper = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  background: none;
  position: relative;
  cursor: pointer;
`;

const Line1 = styled.div`
  width: 20px;
  height: 3px;
  background-color: #333;
  position: absolute;
  top:50%;
  left: 50%;
  transform-origin: center;
  transition: transform 0.3s;

  ${({ isActive, rotation, spacing }) => `
    transform: translate(-50%, ${isActive ? '-50%' : '-40%'}) rotate(${
    isActive ? rotation : 0
  }deg) translateY(${isActive ? -spacing / 2 : 0}px);
  `}
`;

const Line2 = styled.div`
  width: 20px;
  height: 3px;
  background-color: #333;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transition: transform 0.3s;

  ${({ isActive, rotation }) =>
    isActive ? `transform: rotate(${rotation}deg);` : 'transform: rotate(0);'}
`;
function App() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

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
      <div className="App">
        <BurgerButton isActive={isActive} onClick={toggleMenu} />
      </div>

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
