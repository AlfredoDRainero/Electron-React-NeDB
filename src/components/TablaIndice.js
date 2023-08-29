import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  margin: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Tabla_Indice = ({ data }) => {
  if (!data || !data.rows || data.rows.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  const headers = Object.keys(data.rows[0]);

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <TableHeader key={index}>{header}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <TableData key={colIndex}>{row[header]}</TableData>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Tabla_Indice;