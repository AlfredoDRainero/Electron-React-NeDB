function splitText(text) {
  const rows = text.split("\n"); // Divide el texto en filas utilizando el carácter de nueva línea ('\n')
  const result = []; // Matriz vacía para almacenar el resultado

  for (let i = 0; i < rows.length; i++) {
    const columns = rows[i].split("\t"); // Divide cada fila en columnas utilizando el carácter de tabulación ('\t')
    const slicedColumns = columns.slice(0, 4).concat(columns.slice(5, 11)); // Obtiene un subconjunto de columnas según los índices especificados
    result.push(slicedColumns); // Agrega las columnas al resultado
  }

  return result; // Devuelve la matriz resultante
}

function splitTextTitulo(text) {
  const rows = text.split("\n");
  const result = [];

  for (let i = 0; i < rows.length; i++) {
    const columns = rows[i].split("\t");
    const selectedColumns = [
      columns[2], // Columna 3 filename
      columns[4], // Columna 5 date
      columns[6], // Columna 7 time
      columns[8], // Columna 9 dmesn (machine name)
      columns[22], // Columna 23 partcomment
      columns[37], // Columna 38 order
      columns[55] // Columna 56 temperature
    ];

    result.push(selectedColumns);
  }

  return result;
}



function convertLastFiveColumns(data) {
  const newData = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const newRow = row.slice();

    for (let j = newRow.length - 6; j < newRow.length; j++) {
      const value = newRow[j];

      if (!isNaN(Number(value))) {
        const parsedValue = Number(value).toFixed(3);
        newRow[j] = parsedValue.toString();
      }
    }

    newData.push(newRow);
  }

  return newData;
}

// esta funcion devuelve todo el texto hasta que aparece el primer "_" es para depurar el nombre de los archivos leidos

function obtenerSubcadenaHastaGuionBajo(texto) {
  const indiceGuionBajo = texto.indexOf("_");
  if (indiceGuionBajo !== -1) {
    return texto.slice(0, indiceGuionBajo);
  } else {
    return texto;
  }
}

module.exports = {
  obtenerSubcadenaHastaGuionBajo,
  splitText,
  convertLastFiveColumns,
  splitTextTitulo

};
