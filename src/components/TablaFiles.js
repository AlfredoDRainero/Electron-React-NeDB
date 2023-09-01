import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
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
  max-width: 50px; /* Establece el ancho máximo */
  white-space: nowrap; /* Evita el salto de línea */
  overflow: hidden; /* Oculta el exceso de texto */
  text-overflow: ellipsis; /* Muestra los tres puntos */
`;


function FileListTable() {
  const [fileList, setFileList] = useState([]);

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

  useEffect(() => {
    console.log("fileList:", fileList);
  }, [fileList]);

  return (
    <TableContainer>
    <Table>
      <thead>
        <tr>
          <Th>Nombre de Archivo</Th>
        </tr>
      </thead>
      <tbody>
        {fileList.length > 0 ? (
          fileList.map((fileName, index) => (
            <tr key={index}>
              <Td>{fileName}</Td>
            </tr>
          ))
        ) : (
          <tr>
            <Td colSpan="1">No data available.</Td>
          </tr>
        )}
      </tbody>
    </Table>
  </TableContainer>
);
}

export default FileListTable;
