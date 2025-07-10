import { BrowserRouter } from 'react-router-dom';
import {  Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react'

import ImagemDirector from '../assets/imgs/Augusto Firmino.jpeg';
import ImagemDirector2 from '../assets/imgs/MbalaGaston.jpg';

import LogoTPA from '../assets/imgs/tpa.png';

import '../styles/biografia.css'; // importamos o CSS separado



import { directors } from '../dados/directors';
import { fotos } from '../dados/fotos';

function Inicio() {
 

// Definindo o estado para o diretor selecionado
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
    const FotoPessoa = fotos.find(p => p.id === parseInt(id));
 
      const [secaoAtiva, setSecaoAtiva] = useState("biografia");
  return (
   
  <div >
    <div className="hamburger" onClick={toggleSidebar}>
    ☰
  </div>

  {/* Menu lateral */}
  <div className={`sidebar  ${isOpen ? 'open' : ''}`}>
     <img src={LogoTPA} alt={'TPA'} className="profile-img-log" />
    <img src={ImagemPessoa.image} alt="Perfil" className="profile-img" />
    {/* Lista de diretores */}
 <div className="black-bar"></div>
    <div className="bio-summary ">
         
  <h2>RESUMO DA BIOGRAFIA DE {ImagemPessoa.name}</h2>
 <div className="bio-list-n">
  <h3>Biografia</h3>
      <ul>
        <li  className={`px-4 py-2 rounded mx-[5px] ${
      secaoAtiva === "biografia"
        ? "bg-red-600 text-white"
        : "bg-gray-200 text-black"
    }`}
    onClick={() => setSecaoAtiva("biografia")}>Ver biografia</li>
       
      </ul>
   <h3>Depoimentos</h3>
      <ul>
        <li  className={`px-4 py-2 rounded mx-[5px] ${
      secaoAtiva === "depoimentos"
        ? "bg-red-600 text-white"
        : "bg-gray-200 text-black"
    }`}
    onClick={() => setSecaoAtiva("depoimentos")}> Ver depoimentos</li>
       
      </ul>
       <h3>Galerias de fotos</h3>
      <ul>
        <li  className={`px-4 py-2 rounded mx-[5px] ${
      secaoAtiva === "galeria"
        ? "bg-red-600 text-white"
        : "bg-gray-200 text-black"
    }`}
    onClick={() => setSecaoAtiva("galeria")}>Ver fotos</li>
       
      </ul>
     </div>
 <div className="bio-info">
      <p><strong>Ocupação</strong><br />{ImagemPessoa.ocupacao}</p>
      <p><strong>Data do Nascimento</strong><br />{ImagemPessoa.nascimento}</p>

    </div>


     <div className="bio-list">
      <h3>Biografias Mais Lidas</h3>
      <ul>
        <li>Monteiro Lobato</li>
        <li>Tarsila do Amaral</li>
   
      </ul>

      <h3>Biografias Atualizadas</h3>
      <ul>
        <li>São Paulo, Apóstolo</li>
        <li>Gregor Mendel</li>
      
       
       
      </ul>
 
      
    </div>
</div>
 
   
       <div className="voltar-link"> 
          <Link to="/" className='' >Voltar</Link>
         </div>
  </div>
  
   <div className="px-4 py-8 max-w-6xl mx-auto">
  
      {/* ===================== BLOCO: BIOGRAFIA ===================== */}
      {secaoAtiva === "biografia" && (
        <div className="bio-container">
          <div className="bio-card">
            <div className="author-card">
              <h4>{ImagemPessoa.name}</h4>
              <p>{ImagemPessoa.cargo}</p>
            </div>

            <h2 className="bio-title justificado fonte-padrao">
              Biografia do Director {ImagemPessoa.name}
            </h2>

            {ImagemPessoa?.biografia ? (
              <div className="justificado">
                <div
                  dangerouslySetInnerHTML={{ __html: ImagemPessoa.biografia }}
                />
              </div>
            ) : (
              <p>Nenhuma biografia disponível</p>
            )}

            <div className="justificado qualifications-box">
              <h3>Qualificações Académicas</h3>
              {Array.isArray(ImagemPessoa?.qualificacoes_academica) ? (
                ImagemPessoa.qualificacoes_academica.map((q, index) => (
                  <p key={index}>{q}</p>
                ))
              ) : (
                <p>Nenhuma qualificação disponível</p>
              )}
            </div>

            <div className="justificado qualifications-box">
              <h3>Nacionalidade</h3>
              <p>{ImagemPessoa.nacionalidade}</p>
            </div>

            <div className="justificado experience-box">
              <h3>Experiência Profissional</h3>
              {Array.isArray(ImagemPessoa?.experiencias) ? (
                ImagemPessoa.experiencias.map((exp, index) => (
                  <p key={index}>{exp}</p>
                ))
              ) : (
                <p>Nenhuma experiência profissional disponível</p>
              )}
            </div>

            <div className="obras-notaveis justificado">
              <h3>Obras Notáveis</h3>
              {Array.isArray(ImagemPessoa?.titulo) ? (
                ImagemPessoa.titulo.map((titulo, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-lg font-semibold text-blue-700">
                      {titulo}
                    </h4>
                    <p className="text-gray-600">
                      {ImagemPessoa.descricao?.[index] ||
                        "Sem descrição disponível"}
                    </p>
                  </div>
                ))
              ) : (
                <p>Nenhuma obra disponível</p>
              )}
            </div>

            <div className="justificado languages-box">
              <h3>Idiomas</h3>
              {Array.isArray(ImagemPessoa?.idiomas) ? (
                ImagemPessoa.idiomas.map((idioma, index) => (
                  <p key={index}>{idioma}</p>
                ))
              ) : (
                <p>Nenhum idioma disponível</p>
              )}
            </div>

            <div className="published-date">
              <i>Publicado em {ImagemPessoa.data_publicacao}</i>
            </div>
          </div>
        </div>
      )}

      {/* ===================== BLOCO: GALERIA ===================== */}
{secaoAtiva === "galeria" && FotoPessoa ? (
  <div>
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
      Galeria de {FotoPessoa.name}
    </h2>

    {Array.isArray(FotoPessoa.images) && FotoPessoa.images.length > 0 ? (
      <div className="flex flex-wrap justify-center gap-4 director-container">
        {FotoPessoa.images.map((img, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 w-[250px]"
          >
            <img
              src={img}
              alt={`Imagem ${index + 1} de ${FotoPessoa.name}`}
              className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105 director-container tm-imgs-galeria"
            />
            <div className="p-2">
              <p className="text-xs text-gray-600 text-center">
                {FotoPessoa.descricao?.[index] || ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">Nenhuma imagem disponível.</p>
    )}
  </div>
) : (
  secaoAtiva === "galeria" && <p className="text-center text-gray-500">Nenhum imagem disponível.</p>
)}

      {/* ===================== BLOCO: DEPOIMENTOS ===================== */}
      {secaoAtiva === "depoimentos" && (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Depoimentos
          </h2>
          <p className="text-gray-700 italic">
            Nenhum depoimento disponível no momento.
          </p>
        </div>
      )}
    </div>

    </div>
 
  )
}

export default Inicio;
