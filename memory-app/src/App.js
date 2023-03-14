import { useEffect, useState } from "react";
import { cuadros } from "./datos";
import './App.css';

function App() {

const [aciertos, setAciertos] = useState(0);
const [intentos, setIntentos] = useState(0);
const cuadrosJuntos = [...cuadros, ...cuadros];

const cuadrosPrevios = cuadrosJuntos.map(valor => ({
  imagen: valor,
  estado: 0
}));

const [misCuadros, setMisCuadros] = useState([]);
const [misTiradas, setMisTiradas] = useState([]);

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

  const existe = misTiradas.find(objeto => objeto.indice ===index); //Para no hacer click en el mismo
  const yaEcontrada = misCuadros[index].estado;  //Para que no deje hacer click en uno ya encontrado

  if(misTiradas.length < 2 && !existe){

    setMisTiradas([...misTiradas, {
      imagen: misCuadros[index].imagen,
      indice: index
    }]);
    const prevItem = [...misCuadros];
    prevItem[index].estado = 1;
    setMisCuadros(prevItem);
  }
  
}

useEffect(() => {
  if(misTiradas.length === 2){
    setIntentos(intentos+1);
    if(misTiradas[0].imagen === misTiradas[1].imagen){
      setMisTiradas([]);
      setAciertos(aciertos + 1);
      if(aciertos + 1 >= cuadros.length){
        alert('Has acabado el juego')
      }
    }else{
      setTimeout(()=>{
        misTiradas.map(objeto => {
          const provisional = [...misCuadros];
          provisional[objeto.indice].estado = 0;
          setMisCuadros(provisional);
          setMisTiradas([]);
        })
      },2000)
    }
  }
}, [misTiradas])


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

      <div className="aciertos">
        {aciertos} aciertos de {intentos} intentos:
        {(intentos > 0) && (Math.round(aciertos * 100 /intentos))} % de acierto
      </div>

    </div>

    
  );
}

export default App;
