import React from 'react';
import '../hojas-de-estilo/Boton.css';

function Boton(props) {

  return (
    <div className={`boton-contenedor`}
    onClick={() => props.manejarClic(props.children)}>
      {props.children}
    </div>
  );
}

export default Boton;