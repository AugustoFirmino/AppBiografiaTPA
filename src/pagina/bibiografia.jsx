import { BrowserRouter } from 'react-router-dom';
import {  Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react'

import ImagemDirector from '../assets/imgs/Augusto Firmino.jpeg';
import ImagemDirector2 from '../assets/imgs/francisco mendes.jpg';
import LogoTPA from '../assets/imgs/tpa.png';

import '../styles/biografia.css'; // importamos o CSS separado





function Inicio() {
 const directors = [
  {
    id:1,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
    idade:'39',
    nacionalidade:'Angolana'
  },
     {
       id:2,
       name: 'Augusto Afonso Firmino',
       image: ImagemDirector,
       link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
       idade:'59',
       nacionalidade:'Angolana'
     },
    {
     id:3,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
    {
       id:4,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:5,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:6,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:7,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:8,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:9,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:10,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:11,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:12,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:13,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:14,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:15,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:16,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:17,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:18,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:19,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:20,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
 {
     id:21,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
 {
     id:22,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
 {
     id:23,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
 {
     id:24,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
   {
     id:25,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
   {
     id:26,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
 {
     id:27,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
 {
     id:28,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
 {
     id:29,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
 {
     id:30,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
 {
     id:31,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:32,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:32,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:32,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:33,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:34,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:34,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:35,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:36,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:37,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:38,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:39,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:40,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:41,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:42,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:43,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:44,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:45,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:46,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:47,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:48,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
  {
     id:49,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },
{
     id:50,
    name: 'Augusto Afonso Firmino',
    image: ImagemDirector,
    link: 'https://en.wikipedia.org/wiki/Quentin_Tarantino',
     idade:'39',
    nacionalidade:'Angolana'
  },






];

  const [selectedDirector, setSelectedDirector] = useState(null);

  //criando o controle de clique para fexhar e abrir o menu
  const handleClick = (director) => {
    setSelectedDirector(director);
  };

    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

    const { nome, id } = useParams();
    const ImagemPessoa = directors.find(p => p.id === parseInt(id));


    
  return (
   
  <div >
    <div className="hamburger" onClick={toggleSidebar}>
    ☰
  </div>

  {/* Menu lateral */}
  <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    <img src={ImagemPessoa.image} alt="Perfil" className="profile-img" />
 <div className="black-bar"></div>
    <div className="bio-summary">
         
  <h2>RESUMO DA BIOGRAFIA DE AUGUSTO FIRMINO</h2>
 <div className="bio-info">
      <p><strong>Ocupação</strong><br />Programador e Empreendedor</p>
      <p><strong>Data do Nascimento</strong><br />05/05/1818</p>

    </div>


     <div className="bio-list">
      <h3>Biografias Mais Lidas</h3>
      <ul>
        <li>Monteiro Lobato</li>
        <li>Karl Marx</li>
        <li>Romero Britto</li>
        <li>Tarsila do Amaral</li>
        <li>Nelson Mandela</li>
      </ul>

      <h3>Biografias Atualizadas</h3>
      <ul>
        <li>São Paulo, Apóstolo</li>
        <li>Gregor Mendel</li>
        <li>Vladimir Putin</li>
        <li>Mário de Andrade</li>
        <li>São Francisco de Assis</li>
        <li>Lionel Messi</li>
      </ul>
    </div>
</div>
 
   
       <div className="voltar-link"> 
          <Link to="/" >Voltar</Link>
         </div>
  </div>
   <div className="bio-container">
    
      <div className="bio-card ">
         <img src={LogoTPA} alt={'TPA'} />
          <div className="author-card">
         <h4>Augusto Firmino</h4>
         <p>Director de Produtos Digitais</p>
          </div>

        <h2 className="bio-title justificado">Biografia do Director {ImagemPessoa.name}</h2>
   <div className='justificado'>
        <p>{ImagemPessoa.name}  é um jovem angolano de {ImagemPessoa.idade} anos de idade, nascido no Rangel, em Luanda, e criado no cazenga, Hoji ya Henda. É um programador e empreendedor no ramos das Tecnologias de Informação e Comunicação, tendo criado a sua primeira empresa, INOKRI, em 2016, com o objectivo de oferecer serviços e soluções inovadoras ao mercado nacional. Em 2019, decidiu criar a startup SÓCIA, uma plataforma voltada para a economia de partilha que tem como finalidade principal criar poder de compra no seio das famílias angolanas. É um renomeado Diretor da Televisão pública de Angola com mais de 15 anos de experiência na indústria audiovisual. Iniciou sua carreira como assistente de produção e se destacou dirigindo novelas e séries de grande sucesso.</p>
  <p>{ImagemPessoa.name}  é um jovem angolano de {ImagemPessoa.idade} anos de idade, nascido no Rangel, em Luanda, e criado no cazenga, Hoji ya Henda. É um programador e empreendedor no ramos das Tecnologias de Informação e Comunicação, tendo criado a sua primeira empresa, INOKRI, em 2016, com o objectivo de oferecer serviços e soluções inovadoras ao mercado nacional. Em 2019, decidiu criar a startup SÓCIA, uma plataforma voltada para a economia de partilha que tem como finalidade principal criar poder de compra no seio das famílias angolanas. É um renomeado Diretor da Televisão pública de Angola com mais de 15 anos de experiência na indústria audiovisual. Iniciou sua carreira como assistente de produção e se destacou dirigindo novelas e séries de grande sucesso.</p>
  
   </div>

  <div className="justificado qualifications-box">
      <h3>Qualificações Académicas</h3>
      <p>
        Técnico médio em Informática, pelo Instituto de Telecomunicações (ITEL).
      </p>
      <p>
        Licenciado em Engenharia Informática, pela Universidade Técnica de Angola (UTANGA).
      </p>
    </div>


        <div>
      <div className="justificado experience-box">
      <h3>Experiência Profissional</h3>
      <ul>
        <li>2008/2009 – Service Desk no Ministério da Energia e Águas</li>
        <li>2009/2012 – ServiceDesk na Televisão Pública de Angola</li>
        <li>2012/2018 – Chefe do Departamento de Sistemas Empresariais da Televisão Pública de Angola</li>
        <li>2009/2010 – Professor de Projecto Tecnológico no Instituto de Telecomunicações</li>
        <li>2005/2006 – Software helpdesk na Coimbrasoft</li>
      </ul>
    </div>

  <div className="obras-notaveis">
      <h3 className='justificado'>Obras Notáveis</h3>

      <div className="obra">
        <h4>ARREIOU</h4>
        <p>Uma obra que aborda a resistência emocional e cultural em tempos de mudanças sociais profundas.</p>
      </div>

      <div className="obra">
        <h4>SÓCIA</h4>
        <p>Explora a relação entre o indivíduo e o coletivo, destacando o papel da solidariedade e da cooperação.</p>
      </div>

      <div className="obra">
        <h4>QUALIFICAR</h4>
        <p>Foca na importância da educação técnica e do desenvolvimento profissional para a transformação social.</p>
      </div>
    </div>

        <p><strong>Prêmios:</strong> Vencedor do Trofeu Unitel Go Talk 5ª Edição, Prêmio TedxLuanda 2025, entre outros.</p>
    
    
     <div className="justificado languages-box">
      <h3>Idiomas</h3>
      <p>Português – Nativo</p>
      <p>Inglês – Intermediário</p>
    </div>


    <div className="published-date">
     <i>Publicado em 20/5/25</i> 
    </div>
    </div>
  
  
   </div>
      


    
    </div>
   
 


    </div>
 
  )
}

export default Inicio;
