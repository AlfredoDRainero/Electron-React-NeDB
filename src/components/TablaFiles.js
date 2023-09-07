import React, { useEffect, useState } from "react";
import styled from "styled-components";


const TableContainer = styled.div`
  width: 100%; // Ajusta el ancho de la tabla según tus necesidades
  //justify-self: start;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  text-align: left;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  cursor: pointer;
  max-width: 20vw; /* Establece el ancho máximo */
  white-space: nowrap; /* Evita el salto de línea */
  overflow: hidden; /* Oculta el exceso de texto */
  text-overflow: ellipsis; /* Muestra los tres puntos */
`;

function SubStringDateAndFilename(texto) {
  const indicePunto = texto.lastIndexOf(".");
  const indiceGuionBajo = texto.lastIndexOf("_", indicePunto) - 5;
  if (indiceGuionBajo !== -1 && indicePunto !== -1) {
    const subcadenaDate = texto.slice(indiceGuionBajo + 1, indicePunto); // Extraemos la subcadena entre el primer "." y el segundo "_"
    const subcadenaName = texto.slice(0, indiceGuionBajo); // Extraemos la subcadena desde el inicio hasta el indiceGuionBajo
    return {
      date: subcadenaDate,
      name: subcadenaName
    };
  } else {
    return "No se encontraron las marcas requeridas.";
  }
}

function FileListTable() {
  const [fileList, setFileList] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedSubRow, setExpandedSubRow] = useState(null);

  const resultado = fileList.map((elemento) =>
    SubStringDateAndFilename(elemento)
  );

  // Utilizamos un conjunto (Set) para almacenar los nombres únicos
  /* El Set es una estructura de datos en JavaScript que solo puede contener valores únicos. 
  Cuando convertimos el arreglo de nombres en un conjunto usando new Set(), 
  automáticamente elimina cualquier duplicado.*/
  const nombresUnicos = [...new Set(resultado.map((file) => file.name))];

  useEffect(() => {
    async function fetchData() {
      try {
        const msj = await window.electronAPI.MSJ_filesDB_Data_Carpet();
        setFileList(msj);
      } catch (error) {
        console.error("Error al obtener el mensaje:", error);
      }
    }

    fetchData();
  }, []);

  const handleRowClick = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null); // Si la fila ya está expandida, ciérrala
    } else {
      setExpandedRow(index); // De lo contrario, expande la fila haciendo clic en ella
    }
  };

  const readDBfile = (archivo) => {
    console.log("file",archivo)
  };



  
  

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Nombre de Archivo</Th>
          </tr>
        </thead>
        <tbody>
          {/*-----------------------------------------------------------------------------------------file name----------------------------*/}
          {nombresUnicos.map((nombre, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => setExpandedRow(index)}>
              <Td>
                  {nombre}<div style={{margin:"5px"}}>{/*---------------------------------------------file date----------------------------*/}
                          <Table>
                          <tbody>                          
                          {expandedRow === index &&
                          resultado
                            .filter((file) => file.name === nombre)
                            .map((file, subIndex) => (
                              <tr
                                key={subIndex}
                                onClick={() =>
                                  setExpandedSubRow(subIndex) &
                                  readDBfile(file.name + "_" + file.date + ".db")
                                  //console.log("click en", file.date)
                                }
                              >
                              <td>
                                  {file.date}{expandedSubRow === subIndex && (
                                    <div style={{margin:"5px", fontSize:"12px"}}>{/*--------------------Reports----------------------------*/}
                                    <Table>
                                    <tbody>
                                          <tr>
                                            <td>5 lib m2 ra 3971</td>
                                            <td>7:51</td>
                                            <td>dia 1</td>
                                          </tr>
                                          <tr>
                                            <td>5 lib m2 ra 3971</td>
                                            <td>7:51</td>
                                            <td>dia 1</td>
                                          </tr>
                                    </tbody>
                                    </Table>
                                    </div>
                                  )}{/*----------------------------------------------------------------------------------------------------*/}
                                </td>
                              </tr>
                            ))}
                            </tbody>
                            </Table>
                            </div>{/*------------------------------------------------------------------------------------------------------*/}
              </Td>
              </tr>
            </React.Fragment>
          ))}{/*---------------------------------------------------------------------------------------------------------------------------*/}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default FileListTable;
