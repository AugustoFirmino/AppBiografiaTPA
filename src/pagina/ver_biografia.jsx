
import { Link, useParams } from 'react-router-dom';
import LogoTPA from '../assets/imgs/tpa.png';
//import { depoimentos } from "../dados/depoimentos";
import { useState, useEffect } from 'react';
import { getDirectorById } from '../dados/api';



//icon para actualizaçao de dados
import { ArrowPathIcon } from "@heroicons/react/24/solid";


function Inicio() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState("biografia");
  const [slideIndex, setSlideIndex] = useState(null);
  const { id } = useParams();
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  //const DepoimentosPessoa = depoimentos.filter(p => p.id === parseInt(id));

  const navItems = [
    { key: "biografia", label: "Biografia" },
    { key: "depoimentos", label: "Depoimentos" },
    { key: "galeria", label: "Galeria de Fotos" },
  ];

  useEffect(() => {
    setLoading(true);
    getDirectorById(id)
      .then(d => setDirector(d))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-xl font-bold text-blue-700">Carregando...</div>;
  }
  if (!director) {
    return <div className="flex items-center justify-center min-h-screen text-xl font-bold text-red-700">Diretor não encontrado.</div>;
  }

  // Para galeria: fotos e descrições
  const galeriaImages = Array.isArray(director.fotos)
    ? director.fotos.map(f => `https://appbiografiatpa.onrender.com/${f.caminho}`)
    : [];
  const galeriaDescricoes = Array.isArray(director.fotos)
    ? director.fotos.map(f => `${f.descricao}`)
    : [];


  return (
    <div className="fixed inset-0 min-h-screen bg-gray-50 flex overflow-x-hidden">
      {/* Sidebar */}
      {/* Sidebar responsivo */}
      <aside
        className={`h-full w-64 bg-white shadow-lg border-r z-20 flex-shrink-0 flex flex-col fixed top-0 left-0 transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:block`}
        style={{ minWidth: '16rem' }}
      >
        <div className="flex flex-col items-center py-8 px-4 h-full">
          <img src={LogoTPA} alt="TPA" className="w-24 mb-6" />
          {/* Imagem de perfil: primeira foto da galeria, se houver */}
          {galeriaImages[0] ? (
            <img src={galeriaImages[0]} alt="Perfil" className="w-28 h-28 rounded-full object-cover border-4 border-red-600 shadow mb-4" />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-red-600 shadow mb-4 flex items-center justify-center text-3xl text-gray-400">?</div>
          )}
          <h2 className="text-lg font-bold text-gray-800 mb-1 text-center">{director?.nome}</h2>
          <p className="text-sm text-gray-500 mb-4 text-center">{director?.cargo}</p>
          <nav className="w-full">
            {navItems.map(item => (
              <button
                key={item.key}
                className={`w-full text-left px-4 py-2 rounded mb-2 font-medium transition-colors ${
                  secaoAtiva === item.key
                    ? "bg-red-600 text-white shadow"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setSecaoAtiva(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 w-full">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Info</h3>
            <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Ocupação:</span> {director?.ocupacao}</div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Nascimento:</span> {director?.nascimento.split('T')[0]}</div>
          </div>
       
          <Link to="/cadastrar_directores/1" className="mt-8 inline-block text-red-600 font-semibold hover:underline transition">← Voltar</Link>
        
        
        
        </div>
      </aside>

      {/* Hamburger for mobile */}
      {/* Botão hamburguer para mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white border rounded-full p-2 shadow-lg"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Abrir menu"
      >
        <span className="text-2xl text-red-600">☰</span>
      </button>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 h-full overflow-y-auto flex items-start justify-center transition-all duration-300">
        {/* BIOGRAFIA */}
        {secaoAtiva === "biografia" && (
          <section className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-8 mt-10 md:mt-16">
            <h1 className="text-3xl font-extrabold mb-4 text-center tracking-tight">
              <span className="text-black">Biografia de </span>
              <span className="text-red-700">{director?.nome}</span>
            </h1>
            {director?.biografia ? (
              <div className="prose max-w-none mb-6 text-justify text-gray-800" style={{textAlign: 'justify'}} dangerouslySetInnerHTML={{ __html: director.biografia }} />
            ) : (
              <p className="text-gray-500">Nenhuma biografia disponível.</p>
            )}
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Qualificações Acadêmicas */}
             {/* Qualificações Acadêmicas */}
<div className="bg-gray-50 rounded-xl p-6 shadow flex flex-col gap-2 border border-gray-100 w-full md:col-span-2">
  <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
    <span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span>
    Qualificações Académicas
  </h3>
  {Array.isArray(director?.qualificacoes_academica) && director.qualificacoes_academica.length > 0 ? (
    <ul className="list-disc list-inside text-gray-600 text-justify">
      {director.qualificacoes_academica.map((q, i) => (
        <li key={i}>{q}</li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-400">Nenhuma qualificação disponível.</p>
  )}
</div>

              
              {/* Experiência Profissional */}
              <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl p-6 shadow-xl flex flex-col gap-4 border border-red-100 md:col-span-2">
                <h3 className="font-extrabold text-lg text-red-700 mb-3 flex items-center gap-2 tracking-tight"><svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m-6 4V7a4 4 0 014-4h4a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4h4" /></svg> Experiência Profissional</h3>
                {Array.isArray(director?.experiencias) && director.experiencias.length > 0 ? (
                  <ol className="space-y-4">
                    {director.experiencias.map((exp, i) => (
                      <li key={i} className="relative bg-white border border-red-100 rounded-xl shadow flex items-start gap-3 p-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-base shadow-sm border border-red-200">{i+1}</div>
                        <span className="text-gray-700 text-justify leading-relaxed font-medium">{exp}</span>
                      </li>
                    ))}
                  </ol>
                ) : <p className="text-gray-400">Nenhuma experiência disponível.</p>}
              </div>
              {/* Idiomas e Nacionalidade lado a lado, expandindo toda a largura */}
              <div className="flex flex-col md:flex-row gap-4 w-full md:col-span-2">
                {/* Idiomas */}
                <div className="bg-gray-50 rounded-xl p-6 shadow flex-1 flex flex-col gap-2 border border-gray-100">
                  <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2"><span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span> Idiomas</h3>
                  {Array.isArray(director?.idiomas) && director.idiomas?.length  > 0 ? (
                    <ul className="list-disc list-inside text-gray-600 text-justify">
                      {director.idiomas.map((idioma, i) => <li key={i}>{idioma}</li>)}
                    </ul>
                  ) : <p className="text-gray-400">Nenhum idioma disponível.</p>}
                </div>
                {/* Nacionalidade */}
                <div className="bg-gray-50 rounded-xl p-6 shadow flex-1 flex flex-col gap-2 border border-gray-100 md:h-full overflow-hidden">
                  <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2"><span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span> Nacionalidade</h3>
                  <p className="text-gray-600 text-justify">{director?.nacionalidade || "Não informada"}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl p-6 shadow border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2"><span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span> Obras Notáveis</h3>
          
          
              {Array.isArray(director?.premios) && director.premios.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {director.premios.map((premio, i) => (
        <div
          key={i}
          className="group relative bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col gap-2 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5zm0 0V10m0 10v-6" />
              </svg>
            </div>
            <span className="font-bold text-lg text-blue-800 group-hover:text-blue-900 transition">
              {premio.titulo || "Título não disponível"}
            </span>
          </div>
          <span className="block text-gray-700 text-justify text-sm">
            {premio.descricao || "Sem descrição disponível"}
          </span>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-400">Nenhuma obra disponível.</p>
  )}

            </div>

            <div className="mt-10 flex justify-end">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full shadow text-xs font-semibold text-blue-700 border border-blue-200">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Publicado em {director?.data_publicacao.split('T')[0]}
              </div>
            </div>
          </section>
        )}

        {/* GALERIA */}
        {secaoAtiva === "galeria" && (
          <section className="w-full max-w-5xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-tight drop-shadow-lg">
              Galeria de <span className="text-red-700">{director?.nome}</span>
            </h2>
            {galeriaImages.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {galeriaImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative group bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100"
                    >
                      <div className="overflow-hidden h-64 flex items-center justify-center bg-gray-100">
                        <img
                          src={img}
                          alt={`Imagem ${index + 1} de ${director.nome}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 right-3 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 shadow backdrop-blur-sm">
                          {index + 1} / {galeriaImages.length}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col items-center">
                        <p className="text-sm text-gray-700 text-center font-medium mb-2 min-h-[2.5rem]">
                          {galeriaDescricoes[index] || 'Sem descrição'}
                        </p>
                        <button
                          className="mt-2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={() => setSlideIndex(index)}
                          title="Ver imagem em tamanho real"
                        >
                          Ver em tamanho real
                        </button>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-200/30 via-transparent to-transparent pointer-events-none group-hover:from-blue-300/40 transition-all duration-300" />
                    </div>
                  ))}
                </div>
                {/* Modal Slide */}
                {typeof slideIndex === 'number' && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 flex flex-col items-center p-6 animate-fade-in">
                      <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold focus:outline-none"
                        onClick={() => setSlideIndex(null)}
                        aria-label="Fechar"
                      >
                        ×
                      </button>
                      <div className="flex items-center justify-center w-full h-96 max-h-[70vh] relative">
                        <button
                          className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 disabled:opacity-40"
                          onClick={() => setSlideIndex((prev) => prev > 0 ? prev - 1 : prev)}
                          disabled={slideIndex === 0}
                          aria-label="Imagem anterior"
                        >
                          ‹
                        </button>
                        <img
                        
                          src={galeriaImages[slideIndex]}
                          alt={`Imagem ${slideIndex + 1} de ${director.name}`}
                          className="max-h-96 max-w-full object-contain rounded-xl mx-auto"
                        />
                        <button
                          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 disabled:opacity-40"
                          onClick={() => setSlideIndex((prev) => prev < galeriaImages.length - 1 ? prev + 1 : prev)}
                          disabled={slideIndex === galeriaImages.length - 1}
                          aria-label="Próxima imagem"
                        >
                          ›
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between w-full">
                        <span className="text-sm text-gray-700 font-semibold">{galeriaDescricoes[slideIndex] || 'Sem descrição'}</span>
                        <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-1 shadow text-blue-700 font-bold text-sm ml-4">
                          <span>{slideIndex + 1}</span>
                          <span className="text-gray-400">/</span>
                          <span>{galeriaImages.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-gray-500 italic text-lg mt-10">Nenhuma imagem disponível.</p>
            )}
          </section>
        )}

        {/* DEPOIMENTOS */}
        {secaoAtiva === "depoimentos" && (
          <section className="w-full max-w-5xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-8 text-center tracking-tight drop-shadow-lg">
              <span className="text-black">Depoimentos</span>
            </h2>
            {Array.isArray(director.depoimentos) && director.depoimentos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {director.depoimentos.map((depoimento, index) => (
                  <div
                   key={depoimento.id || index}

                    className="relative group bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 p-8 flex flex-col gap-6"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-400 bg-blue-100 flex items-center justify-center shadow-lg">
                        {depoimento.avatar ? (
                          <img  src={depoimento.avatar} alt={depoimento.nome} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        )}
                      </div>
                      <div>
                        <span className="block font-bold text-gray-800 text-lg">{depoimento.nome}</span>
                        <span className="block text-xs text-blue-600 font-semibold">{depoimento.cargo}</span>
                      </div>
                    </div>
                    <div className="relative bg-white/80 rounded-xl p-6 shadow-inner border border-blue-100">
                      <div className="absolute -top-6 left-4 text-7xl text-blue-100 select-none leading-none pointer-events-none font-serif">“</div>
                      <p className="text-gray-800 italic leading-relaxed text-justify text-base font-medium z-10 relative">
                        {depoimento.mensagem}
                      </p>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 italic text-lg mt-10">Ainda não há depoimentos para este diretor.</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default Inicio;
