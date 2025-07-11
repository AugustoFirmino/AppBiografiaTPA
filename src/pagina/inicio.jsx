import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoTPA from '../assets/imgs/tpa.png';
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
   
  <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 flex flex-col items-center py-10 px-2">
    <div className="w-full max-w-4xl flex flex-col items-center gap-6">
      <img src={LogoTPA} alt="TPA" className="w-28 drop-shadow-xl mb-2" />
      <h2 className="text-3xl md:text-4xl font-extrabold text-red-700 tracking-tight text-center mb-2">50 Anos 50 Histórias</h2>
      <div className="w-full flex justify-center mb-6">
        <input
          type="text"
          placeholder="Pesquisar diretor pelo nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-md px-5 py-3 rounded-full border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-700 text-lg placeholder-gray-400 transition"
        />
      </div>
      <div className="w-full">
        {filtrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white/70 rounded-xl shadow-inner">
            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            <p className="text-gray-500 text-lg font-medium">Nenhum diretor encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
            {filtrados.map((dir) => (
              <Link
                key={dir.id}
                to={`/biografia/${dir.name}/${dir.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 p-5 flex flex-col items-center transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-600 shadow mb-3 bg-gray-100">
                  <img src={dir.image} alt={dir.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-lg font-bold text-gray-800 text-center group-hover:text-red-700 transition">{dir.name}</p>
                <span className="text-xs text-gray-500 mt-1">{dir.cargo || dir.nacionalidade}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
 
  )
}

export default Inicio;
