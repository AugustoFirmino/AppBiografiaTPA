
import {  Link} from 'react-router-dom';

import { useState } from 'react'
import LogoTPA from '../assets/imgs/tpa.png';

import ImagemDirector1 from '../assets/imgs/Augusto Firmino.jpeg';
import ImagemDirector2 from '../assets/imgs/MbalaGaston.jpg';

import '../styles/listasdirectores.css'; // importamos o CSS separado


import { directors } from '../dados/directors';
function Inicio() {
 

  const [selectedDirector, setSelectedDirector] = useState(null);

  const handleClick = (director) => {
    setSelectedDirector(director);
  };


   const [busca, setBusca] = useState('');

  const filtrados = directors.filter((dir) =>
    dir.name.toLowerCase().includes(busca.toLowerCase())
  );
  return (
   
  <div >
      
      <div  className='search-container'>
      
       <input
        type="text"
        placeholder="Pesquisar diretor pelo nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        
      />
     </div>

        <img src={LogoTPA} alt={'TPA'} />
      <h2> 50 Anos 50 Histórias</h2>
         <div className="fundo">
      
{filtrados.length === 0 ? (
  <div className="nenhum-diretor">
    <p>Nenhum diretor encontrado.</p>
  </div>
) : (
  <div className="director-container">
    {filtrados.map((dir) => (
      <Link
        key={dir.id}
        to={`/biografia/${dir.name}/${dir.id}`}
        className="director-card"
      >
        <img src={dir.image} alt={dir.name} />
        <p className="director-name">{dir.name}</p>
      </Link>
    ))}
  </div>
)}
      
       </div>
    </div>
 
  )
}

export default Inicio;
