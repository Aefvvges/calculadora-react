import './App.css';
import Boton from './componentes/Boton';
import Pantalla from './componentes/Pantalla';
import BotonClear from './componentes/BotonClear';
import Logo from './componentes/Logo';
import { useState, useEffect, useCallback } from 'react';
import { evaluate } from 'mathjs';

function App() {

  const [input, setInput] = useState('');

  const esOperador = valor => {
    return isNaN(valor) && (valor !== '.') && (valor !== '=');
  };

  const manejarInput = (valor) => {
    const ultimoCaracter = input.slice(-1);
    if (input === '' && esOperador(valor)){
      return;
    }

    if (esOperador(ultimoCaracter) && esOperador(valor)) {
      setInput(input.slice(0,-1) + valor);
    } else {
      setInput(input + valor);
    }
  }

  const calcularResultado = useCallback(() => {
    if (input) {
      setInput(evaluate(input).toString());
    } else {
      setInput('');
    }
  }, [input]);

  useEffect(() => {
    const apretarTecla = (event) => {
      if (event.key === 'Enter') {
        calcularResultado();
      }
  };

  window.addEventListener('keydown', apretarTecla);

  return() => {
    window.removeEventListener('keydown', apretarTecla);
  };
});

  return (
    <div className='App'>
      <Logo />
      <div className='contenedor-calculadora'>
        <Pantalla input={input}/>
        <div className='fila'>
          <Boton manejarClic={manejarInput}>1</Boton>
          <Boton manejarClic={manejarInput}>2</Boton>
          <Boton manejarClic={manejarInput}>3</Boton>
          <Boton manejarClic={manejarInput}>+</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={manejarInput}>4</Boton>
          <Boton manejarClic={manejarInput}>5</Boton>
          <Boton manejarClic={manejarInput}>6</Boton>
          <Boton manejarClic={manejarInput}>-</Boton>          
        </div>
        <div className='fila'>
          <Boton manejarClic={manejarInput}>7</Boton>
          <Boton manejarClic={manejarInput}>8</Boton>
          <Boton manejarClic={manejarInput}>9</Boton>
          <Boton manejarClic={manejarInput}>*</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={calcularResultado}>=</Boton>
          <Boton manejarClic={manejarInput}>0</Boton>
          <Boton manejarClic={manejarInput}>.</Boton>
          <Boton manejarClic={manejarInput}>/</Boton>
        </div>
        <div className='fila'>
          <BotonClear manejarClear={() => setInput('')}>Clear</BotonClear>
        </div>
      </div>
    </div>
  );
}

export default App;
