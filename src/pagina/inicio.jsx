
import {  Link} from 'react-router-dom';

import { useState } from 'react'
import LogoTPA from '../assets/imgs/tpa.png';

import ImagemDirector1 from '../assets/imgs/Augusto Firmino.jpeg';
import ImagemDirector2 from '../assets/imgs/francisco mendes.jpg';

import '../styles/listasdirectores.css'; // importamos o CSS separado

function Inicio() {
 const directors = [
  {
    id:1,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
    {
       id:2,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
    {
     id:3,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
    {
       id:4,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:5,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:6,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:7,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:8,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:9,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:10,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:11,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:12,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:13,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:14,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:15,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:16,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:17,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:18,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:19,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:20,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:21,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:22,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:23,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:24,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:25,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
    {
     id:26,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:27,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:28,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:29,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:30,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
  {
     id:31,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
 {
     id:32,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:33,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
 {
     id:34,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
 {
     id:35,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:36,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:37,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:38,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:39,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:40,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:41,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:42,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:43,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:44,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:45,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:46,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:47,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:48,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:49,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
   {
     id:50,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector1,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
  },
];

  const [selectedDirector, setSelectedDirector] = useState(null);

  const handleClick = (director) => {
    setSelectedDirector(director);
  };

  return (
   
  <div >
        <img src={LogoTPA} alt={'TPA'} />
      <h2>Directores da TPA</h2>
         <div className="fundo">
      <div className="director-container">
   
      
        {directors.map((dir) => (

          <>

          <Link
            key={dir.id}
            to={`biografia/${dir.name}/${dir.id}`}
        
            className="director-card"
          >
            <img src={dir.image} alt={dir.name} />
             <p className="director-name"> <Link to={`/biografia/${dir.name}/${dir.id}`} className='azul'>  {dir.name} </Link ></p> 
          </Link>
      
          </>
        ))}
            
      </div>
       </div>
    </div>
 
  )
}

export default Inicio;
