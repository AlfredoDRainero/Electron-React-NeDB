export function splitText(text) {
    const rows = text.split('\n');
    const result = [];
  
    for (let i = 0; i < rows.length; i++) {
      const columns = rows[i].split('\t');
      const slicedColumns = columns.slice(0, 4).concat(columns.slice(5, 11));
      result.push(slicedColumns);
    }
  
    return result;
  }
  
  export function convertLastFiveColumns(data) {
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