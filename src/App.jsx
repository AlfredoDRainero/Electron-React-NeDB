
import React, { useState, useEffect } from "react";

function App() {
  function enviarDatos() {
    const datos = { name: "John dd", age: 301 }; // Datos a insertar en la base de datos
    window.electronAPI.enviarDatos(datos);
  }

  enviarDatos();
  const [state, setState] =    useState();

  useEffect(() => {
    
    return () => {
     
    };
  }, []); 

  return (
    <div>
      <h2>Hello from React in Electron! laal</h2>
      {/* Contenido principal de tu aplicación */}
    </div>
  );
}

export default App;
