import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LogoTPA from '../assets/imgs/tpa.png';
import '../styles/listasdirectores.css';

import { FiLogIn } from 'react-icons/fi'; // Ícone de login (Feather Icons)

import { getDirectores } from '../dados/api';

function Inicio({ onSelecionar }) {
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    setLoading(true);
    getDirectores()
      .then(data => setDirectores(data))
      .finally(() => setLoading(false));
  }, []);

  const filtrados = directores.filter((dir) =>
    (dir.nome || '').toLowerCase().includes(busca.toLowerCase())
  );

  const LoaderOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-none backdrop-blur-sm pointer-events-none">
      <div className="relative w-32 h-32">
        {[...Array(10)].map((_, i) => {
          const angle = (i * 360) / 10;
          const radius = 40;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <span
              key={i}
              className="absolute w-4 h-4 bg-blue-500 rounded-full animate-ping"
              style={{
                top: `calc(50% + ${y}px - 0.5rem)`,
                left: `calc(50% + ${x}px - 0.5rem)`,
                animationDelay: `${i * 0.1}s`
              }}
            ></span>
          );
        })}
      </div>
    </div>
  );
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col items-center py-10 px-2 animate-fade-in">
      <div className="w-full max-w-2xl flex flex-col items-center mb-8">
        <img src={LogoTPA} alt={'TPA'} className="w-32 mb-4 drop-shadow-lg" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-2 tracking-tight text-center drop-shadow">50 Anos 50 Histórias</h2>
        <p className="text-gray-600 text-lg mb-6 text-center max-w-xl">A Alma da Televisão</p>
        <div className="w-full flex justify-center mb-6">
          <input
            type="text"
            placeholder="Pesquisar diretor pelo nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-full border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-red-400 text-lg transition"
          />
            <div className="fixed top-4 right-4 z-50">
      
    </div>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white/80 rounded-2xl shadow-inner text-lg text-blue-700 font-bold"><LoaderOverlay /></div>
        ) : filtrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white/80 rounded-2xl shadow-inner">
            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            <p className="text-gray-500 text-lg font-medium">Nenhum diretor encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtrados.map((dir) => {
              // Mostra a primeira foto da galeria, se houver
              let imgUrl = '';
              if (Array.isArray(dir.fotos) && dir.fotos.length > 0) {
           imgUrl = `http://localhost:3001${dir.fotos[0]}`;

              }

                return (
            <button
              key={dir.id}
              onClick={() => {
 
         onSelecionar(dir.id);
   
  }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 flex flex-col items-center p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-red-50 hover:to-blue-50"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-red-600 shadow mb-4 group-hover:scale-105 transition-transform duration-300 bg-gray-100 flex items-center justify-center">
                {imgUrl ? (
                  <img src={imgUrl} alt={dir.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl text-gray-300 font-bold">?</span>
                )}
              </div>
              <p className="text-lg font-bold text-gray-800 group-hover:text-red-700 text-center mb-1">{dir.name}</p>
              <span className="text-xs text-gray-500 text-center">{dir.cargo}</span>
            </button>
          );
        })}
          </div>
        )}
      </div>
      
    </div>
  )
}

export default Inicio;
