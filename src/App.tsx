import { useState } from 'react'
import './App.css';
import {Cliente} from "./components/Cliente";
//import { useSearchParams } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  //const [searchParams] = useSearchParams();

  function dividirCadena(cadenaADividir = "", separador = "") {
    var arrayDeCadenas = cadenaADividir.split(separador);
    
    return arrayDeCadenas;

  }
  const [url,previo] = dividirCadena(document.URL, "?");
  const params = dividirCadena(previo, "&");
  return (
    <>
      <Cliente  post={params}/>
    </>
  )
}

export default App
