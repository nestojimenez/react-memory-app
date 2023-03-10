import { useEffect, useState } from "react";
import { cuadros } from "./datos";
import './App.css';

function App() {

const cuadrosJuntos = [...cuadros, ...cuadros];

const cuadrosPrevios = cuadrosJuntos.map(valor => ({
  imagen: valor,
  estado: 0
}));

const [misCuadros, setMisCuadros] = useState([]);
const [misTiradas, setMisTiraas] = useState([]);

useEffect(()=>{
  
  for(let i = cuadrosPrevios.length-1; i>0; i--){
    const azar = Math.floor(Math.random()*(i+1));  //Para incluir los valores que el floor mando a cero, entonces nunca tendremos cero
    [cuadrosPrevios[i], cuadrosPrevios[azar]] = [cuadrosPrevios[azar], cuadrosPrevios[i]];
  }
  setMisCuadros([...cuadrosPrevios])
  
}, []);

const tapado = {
  backgroundImage: `url(https://www.html6.es/img/rey_.png)`
}

const marcar = (index) => {
  const prevItem = [...misCuadros];
  prevItem[index].estado = 1
  setMisCuadros(prevItem);
}


  return (
    <div className="cuadros">
      {misCuadros.map((dato, index) => 
      (dato.estado === 0)
      ? (<div onClick={() => marcar(index)} className="cuadro" key={index} style={tapado}>
        <div className="atras">
          <img src="https://www.html6.es/ima/naranja.png" alt="" />
        </div>
      </div>) 

      :(<div onClick={() => marcar(index)} className="cuadro" key={index} style={{backgroundImage: `url(${misCuadros[index].imagen})`}}>
        <div className="atras">
          <img src="https://www.html6.es/ima/naranja.png" alt="" />
        </div>
      </div>)
    )}
    </div>
  );
}

export default App;
