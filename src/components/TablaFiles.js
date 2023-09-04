import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TableContainer = styled.div`

  width: 100%; // Ajusta el ancho de la tabla según tus necesidades
  justify-self: end;
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
  max-width: 50px; /* Establece el ancho máximo */
  white-space: nowrap; /* Evita el salto de línea */
  overflow: hidden; /* Oculta el exceso de texto */
  text-overflow: ellipsis; /* Muestra los tres puntos */
`;

function FileListTable() {
  const [fileList, setFileList] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

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

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Nombre de Archivo</Th>
          </tr>
        </thead>
        <tbody>
          {fileList.map((fileName, index) => (
            <React.Fragment key={index}>
              <tr>
                <Td onClick={() => handleRowClick(index)}>{fileName}</Td>
              </tr>
              {expandedRow === index && (
                <tr>
                  <Td>Contenido adicional aquí</Td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default FileListTable;
