import React, { useEffect, useState } from "react";
import "./index.css";
import styled from "styled-components";

//components
import BurgerButton from "./components/BurgerButton";
import Tabla_Indice from "./components/TablaIndice";

//functions
import MSJ_FROMFRONT_sendAdressUnformatedReports from "./SendAndReceiveData";

//import MSJ_FROMBACK_IndiceDB from "./SendAndReceiveData";
//import MSJ_FROMBACK_filesDB_Data_Carpet from "./SendAndReceiveData";

import FileListTable from "./components/TablaFiles";

/*import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined
} from "@ant-design/icons";

const { Sider, Header, Content } = Layout;*/

const MainDiv = styled.div`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  //line-height: 1.5;
  //font-weight: 400;

  //font-synthesis: none;
  //text-rendering: optimizeLegibility;

  //background-color: #383b3d;
  //color: #e9e9e9;
  //color-scheme: light dark;
  //color: rgba(255, 255, 255, 0.87);

  // background-color: #242424;
  background-color: #d1d1d1;

  //padding: 2rem;
  display: grid;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const Sider = styled.div`
  width: 80px;
  background-color: #001529;
  color: #fff;
`;

const Header = styled.div`
  background-color: #fff;
  //padding: 0;
  width: 100%;
  //height:10vh;
`;

const Content = styled.div`
  //margin: 16px;
  background-color: #f0f2f5;
  //padding: 24px;
  //border-radius: 8px;
  //box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MenuIcon = styled.div`
  font-size: 24px;
  //margin-top: 5px;
`;

const ContentHeader = styled.h1`
  font-size: 20px;
  //margin: 5px;
`;

const GridContainer = styled.div`
  /* Estilos para el contenedor con CSS Grid */
  display: grid;
  grid-template-rows: auto 1fr; /* Una fila automática arriba, y una fila fr (proporcional) abajo */
  //gap: 5px; /* Espacio entre las filas */
  height: 100%; /* Establece la altura del contenedor al 100% del viewport */
  width: 100%;
 // padding: 5px;

`;

const TopContainer = styled.div`
  /* Estilos para el contenedor superior */
  background-color: #f0f2f5;
  //padding: 24px;
  //border-radius: 8px;
  //box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  //height:15vh;
`;

const BottomContainer = styled.div`
  /* Estilos para el contenedor inferior */
  display: grid;
  grid-template-columns: 3fr 1fr; /* Dos columnas de igual tamaño */
  //gap: 5px; /* Espacio entre las columnas */
  height: calc(75vh);
`;

const LeftBottomContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  
`;

const RightBottomContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

function App() {
  const [tablaIndice, setTablaIndice] = useState({ rows: [] });
  //const [fileList, setFileList] = useState(null);

  //console.log("prueba")
  useEffect(() => {
    MSJ_FROMFRONT_sendAdressUnformatedReports(); // it's used to send to main a carpet adress. where we can find unformated "Reports CHR and HDR" files
  }, []);

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
        const msj = await window.electronAPI.recibirMensajeIndiceDB(); //desde preload.js

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
        <div style={{ display: "flex" }}>
          <Sider>
            {/* Menú */}
            <MenuIcon>☰</MenuIcon>
            <MenuIcon>◉</MenuIcon>
            <MenuIcon>📂</MenuIcon>
          </Sider>
          <GridContainer>
            <Header>
              {/* Barra superior */}
              <BurgerButton />
              <ContentHeader>Barra superior</ContentHeader>
            </Header>
            <TopContainer>
              {/* Contenedor superior */}
              <div>Contenido de la página</div>
            </TopContainer>
            <BottomContainer>
              {/* Contenedor inferior */}
              <LeftBottomContainer>
                <Tabla_Indice data={tablaIndice} />
              </LeftBottomContainer>
              <RightBottomContainer>
                <FileListTable />
              </RightBottomContainer>
            </BottomContainer>
          </GridContainer>
        </div>
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
