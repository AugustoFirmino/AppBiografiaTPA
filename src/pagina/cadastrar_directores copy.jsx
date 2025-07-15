// Arquivo: App.jsx

import { useEffect, useState, useRef } from 'react';

function App() {
  const [imagemModal, setImagemModal] = useState(null);
  const [imagens, setImagens] = useState([]);
  const imagensRef = useRef([]);

  useEffect(() => {
    // Revoga objetos blob antigos
    imagensRef.current.forEach(img => {
      if (!imagens.find(i => i.url === img.url)) {
        URL.revokeObjectURL(img.url);
      }
    });
    imagensRef.current = imagens;
  }, [imagens]);

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    const novas = files.map(file => ({
      id: `${file.name}_${file.size}_${file.lastModified}`,
      file,
      url: URL.createObjectURL(file),
      descricao: '',
      rotate: 0,
    }));
    setImagens(prev => [...prev, ...novas]);
  };

  const handleRemoveImage = id => {
    if (imagemModal?.id === id) {
      setImagemModal(null);
      requestAnimationFrame(() => {
        setImagens(prev => prev.filter(img => img.id !== id));
      });
    } else {
      setImagens(prev => prev.filter(img => img.id !== id));
    }
  };

  return (
    <div className="p-4">
      <input type="file" multiple onChange={handleImageChange} />
      <div className="flex flex-wrap gap-2 mt-4">
        {imagens.map(img => (
          <div key={img.id} className="relative">
            <img
              src={img.url}
              className="w-24 h-24 object-cover rounded cursor-pointer"
              style={{ transform: `rotate(${img.rotate}deg)` }}
              onClick={() => setImagemModal(img)}
            />
            <button
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5"
              onClick={() => handleRemoveImage(img.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {imagemModal && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          onClick={() => setImagemModal(null)}
        >
          <div
            className="bg-white p-4 rounded shadow relative max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={imagemModal.url}
              style={{ transform: `rotate(${imagemModal.rotate}deg)` }}
              className="max-w-full max-h-[80vh] rounded"
            />
            <div className="flex gap-2 mt-4 justify-center">
              <button onClick={() => setImagemModal(imagemModal => ({ ...imagemModal, rotate: (imagemModal.rotate - 90 + 360) % 360 }))}>
                Rotacionar -90°
              </button>
              <button onClick={() => setImagemModal(imagemModal => ({ ...imagemModal, rotate: (imagemModal.rotate + 90) % 360 }))}>
                Rotacionar +90°
              </button>
              <button onClick={() => {
                handleRemoveImage(imagemModal.id);
                setImagemModal(null);
              }}>
                Excluir
              </button>
              <button onClick={() => {
                setImagens(prev => prev.map(img => img.id === imagemModal.id ? { ...img, rotate: imagemModal.rotate } : img));
                setImagemModal(null);
              }}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
