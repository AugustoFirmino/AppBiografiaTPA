import { useEffect, useState } from 'react';

function App() {
  // Estado para modal/slidebar de visualização de imagem
  const [imagemModal, setImagemModal] = useState(null); // {url, idx}
  const [directors, setDirectors] = useState([]);
  const [form, setForm] = useState({
    name: '', idade: '', nacionalidade: '', ocupacao: '', nascimento: '', cargo: '',
    biografia: '', qualificacoes_academica: '', experiencias: '', idiomas: '', data_publicacao: ''
  });

  const [fotoForm, setFotoForm] = useState({ name: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [imagens, setImagens] = useState([]); // [{file, url, descricao}]
  const [fotos, setFotos] = useState([]);

  const fetchDirectors = async () => {
    const res = await fetch('http://localhost:3001/api/directors');
    const data = await res.json();
    setDirectors(data);
  };

  const fetchFotos = async () => {
    const res = await fetch('http://localhost:3001/api/fotos');
    const data = await res.json();
    setFotos(data);
  };

  useEffect(() => {
    fetchDirectors();
    fetchFotos();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFotoChange = e => {
    const { name, value, files } = e.target;
    if (name === 'images' && files) {
      // Revoga todos os blobs antigos
      imagens.forEach(img => { if (img.url.startsWith('blob:')) URL.revokeObjectURL(img.url); });
      const fileArr = Array.from(files);
      const novasImagens = fileArr.map(file => ({ file, url: URL.createObjectURL(file), descricao: '' }));
      setImagens(novasImagens);
    } else if (name.startsWith('descricao_')) {
      const idx = parseInt(name.split('_')[1], 10);
      setImagens(imgs => imgs.map((img, i) => i === idx ? { ...img, descricao: value } : img));
    } else {
      setFotoForm({ ...fotoForm, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Cadastro de director
    const newDirector = {
      ...form,
      qualificacoes_academica: form.qualificacoes_academica.split(', '),
      experiencias: form.experiencias.split(', '),
      idiomas: form.idiomas.split(', '),
    };
    await fetch('http://localhost:3001/api/directors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDirector),
    });
    // Cadastro de fotos
    if (imagens.length > 0) {
      const imageUrls = imagens.map(img => img.url);
      const descricoes = imagens.map(img => img.descricao || '');
      const newFoto = {
        name: fotoForm.name || form.name,
        images: imageUrls,
        descricao: descricoes
      };
      await fetch('http://localhost:3001/api/fotos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFoto),
      });
      imagens.forEach(img => { if (img.url.startsWith('blob:')) URL.revokeObjectURL(img.url); });
      setImagens([]);
    }
    setForm({
      name: '', idade: '', nacionalidade: '', ocupacao: '', nascimento: '', cargo: '',
      biografia: '', qualificacoes_academica: '', experiencias: '', idiomas: '', data_publicacao: ''
    });
    setFotoForm({ name: '' });
    setSuccessMsg('Cadastrado com sucesso!');
    fetchDirectors();
    fetchFotos();
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const deleteDirector = async id => {
    await fetch(`http://localhost:3001/api/directors/${id}`, { method: 'DELETE' });
    fetchDirectors();
  };

  const deleteFoto = async id => {
    await fetch(`http://localhost:3001/api/fotos/${id}`, { method: 'DELETE' });
    fetchFotos();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold mb-6 text-blue-800 text-center tracking-tight drop-shadow">Cadastro de Directores</h1>
        <form onSubmit={async (e) => {
          e.preventDefault();
          // Cadastro de director
          const newDirector = {
            ...form,
            qualificacoes_academica: form.qualificacoes_academica.split(', '),
            experiencias: form.experiencias.split(', '),
            idiomas: form.idiomas.split(', '),
          };
          await fetch('http://localhost:3001/api/directors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDirector),
          });
          // Cadastro de fotos
          if (imagens.length > 0) {
            const imageUrls = imagens.map(img => img.url);
            const descricoes = imagens.map(img => img.descricao || '');
            const newFoto = {
              name: fotoForm.name || form.name,
              images: imageUrls,
              descricao: descricoes
            };
            await fetch('http://localhost:3001/api/fotos', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newFoto),
            });
            imagens.forEach(img => { if (img.url.startsWith('blob:')) URL.revokeObjectURL(img.url); });
            setImagens([]);
          }
          setForm({
            name: '', idade: '', nacionalidade: '', ocupacao: '', nascimento: '', cargo: '',
            biografia: '', qualificacoes_academica: '', experiencias: '', idiomas: '', data_publicacao: ''
          });
          setFotoForm({ name: '' });
          setSuccessMsg('Cadastrado com sucesso!');
          fetchDirectors();
          fetchFotos();
          setTimeout(() => setSuccessMsg(''), 2500);
        }} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-4 border border-blue-100 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Nome" className="input-form" value={form.name} onChange={handleChange} />
            <input name="idade" placeholder="Idade" className="input-form" value={form.idade} onChange={handleChange} />
            <input name="nacionalidade" placeholder="Nacionalidade" className="input-form" value={form.nacionalidade} onChange={handleChange} />
            <input name="ocupacao" placeholder="Ocupação" className="input-form" value={form.ocupacao} onChange={handleChange} />
            <input name="nascimento" placeholder="Data de nascimento" className="input-form" value={form.nascimento} onChange={handleChange} />
            <input name="cargo" placeholder="Cargo" className="input-form" value={form.cargo} onChange={handleChange} />
            <input name="data_publicacao" placeholder="Data de publicação" className="input-form md:col-span-2" value={form.data_publicacao} onChange={handleChange} />
          </div>
          <textarea name="biografia" placeholder="Biografia (HTML)" className="input-form min-h-[80px]" value={form.biografia} onChange={handleChange} />
          <input name="qualificacoes_academica" placeholder="Qualificações (separadas por vírgula)" className="input-form" value={form.qualificacoes_academica} onChange={handleChange} />
          <input name="experiencias" placeholder="Experiências (separadas por vírgula)" className="input-form" value={form.experiencias} onChange={handleChange} />
          <input name="idiomas" placeholder="Idiomas (separados por vírgula)" className="input-form" value={form.idiomas} onChange={handleChange} />
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2 text-green-700 text-center">Cadastro de fotos para galerias</h2>
            <div className="relative mb-4">
              <input
                name="name"
                placeholder="Nome do Director (opcional para fotos)"
                className="input-form ml-0 w-[350px] max-w-full"
                value={fotoForm.name}
                onChange={handleFotoChange}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="block font-semibold">Selecionar Imagens</label>
                {imagens.length > 0 && (
                  <span className="text-xs text-gray-600 bg-gray-100 rounded px-2 py-0.5">{imagens.length} arquivo{imagens.length > 1 ? 's' : ''} atual</span>
                )}
              </div>
              <input name="images" type="file" accept="image/*" multiple className="input-form" onChange={handleFotoChange} />
              {imagens.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-2">
                  {imagens.map((img, i) => (
                    <div key={img.url} className="relative flex flex-col items-center">
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-700 z-10"
                        title="Excluir imagem"
                        onClick={() => {
                          if (img.url.startsWith('blob:')) {
                            try { URL.revokeObjectURL(img.url); } catch (e) { /* ignore */ }
                          }
                          setImagens(prev => prev.filter((_, idx) => idx !== i));
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                      <img
                        src={img.url}
                        alt="preview"
                        className="w-16 h-16 object-cover rounded shadow mb-1 cursor-pointer hover:scale-105 transition"
                        style={imagemModal && imagemModal.idx === i && typeof imagemModal.rotate === 'number' ? { transform: `rotate(${imagemModal.rotate}deg)` } : (img.rotate ? { transform: `rotate(${img.rotate}deg)` } : {})}
                        onClick={() => setImagemModal({ url: img.url, idx: i, rotate: img.rotate || 0 })}
                        title="Clique para ver em tamanho real"
                      />
                      <input
                        name={`descricao_${i}`}
                        placeholder={`Descrição da imagem ${i + 1}`}
                        className="input-form text-xs"
                        value={img.descricao || ''}
                        onChange={handleFotoChange}
                      />
                    </div>
                  ))}
      {/* Modal/slidebar para visualização da imagem em tamanho real */}
      {imagemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setImagemModal(null)}>
          <div
            className="relative rounded-xl shadow-xl p-4 max-w-full max-h-full flex flex-col items-center"
            style={{
              minWidth: 320,
              background: 'linear-gradient(to bottom right, #eff6ff 0%, #fff 100%)'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Barra de topo com fechar */}
            <div className="flex w-full justify-end gap-2 mb-2">
              <button
                className="bg-gray-200 hover:bg-gray-400 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow"
                title="Fechar visualização"
                style={{ position: 'relative', top: 0, right: 0 }}
                onClick={() => setImagemModal(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex items-center justify-center w-full" style={{ minHeight: 320, minWidth: 320 }}>
              <div style={{ marginTop: '3px', marginBottom: '3px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                  src={imagemModal.url}
                  alt="Imagem em tamanho real"
                  className="rounded-xl shadow-lg"
                  style={{
                    objectFit: 'contain',
                    background: 'none',
                    width: '100%',
                    height: '100%',
                    maxWidth: '320px',
                    maxHeight: '320px',
                    display: 'block',
                    margin: '0 auto',
                    transform: `rotate(${imagemModal.rotate || 0}deg)`
                  }}
                />
              </div>
            </div>
            {/* Opções de rotação e exclusão */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {/* Girar -90° */}
              <button
                className="px-3 py-2 rounded bg-gray-200 text-blue-700 font-bold shadow hover:bg-blue-100 flex items-center gap-1"
                title="Girar -90° (anti-horário)"
                onClick={() => {
                  setImagemModal(imagemModal ? {
                    ...imagemModal,
                    rotate: ((imagemModal.rotate || 0) - 90 + 360) % 360
                  } : null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 rotate-[-90deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                -90°
              </button>
              {/* Girar 90° */}
              <button
                className="px-3 py-2 rounded bg-gray-200 text-blue-700 font-bold shadow hover:bg-blue-100 flex items-center gap-1"
                title="Girar 90° (horário)"
                onClick={() => {
                  setImagemModal(imagemModal ? {
                    ...imagemModal,
                    rotate: ((imagemModal.rotate || 0) + 90) % 360
                  } : null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                90°
              </button>
              {/* Girar 180° */}
              <button
                className="px-3 py-2 rounded bg-gray-200 text-blue-700 font-bold shadow hover:bg-blue-100 flex items-center gap-1"
                title="Girar 180° (de cabeça para baixo)"
                onClick={() => {
                  setImagemModal(imagemModal ? {
                    ...imagemModal,
                    rotate: 180
                  } : null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                180°
              </button>
              {/* Resetar rotação */}
              <button
                className="px-3 py-2 rounded bg-gray-200 text-blue-700 font-bold shadow hover:bg-blue-100 flex items-center gap-1"
                title="Resetar rotação (0°)"
                onClick={() => {
                  setImagemModal(imagemModal ? {
                    ...imagemModal,
                    rotate: 0
                  } : null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>
                0°
              </button>
              {/* Salvar posição */}
              <button
                className="px-4 py-2 rounded bg-green-600 text-white font-bold shadow hover:bg-green-800 flex items-center gap-2"
                title="Salvar posição"
                onClick={() => {
                  if (imagemModal && typeof imagemModal.idx === 'number') {
                    setImagens(prev => prev.map((img, idx) => idx === imagemModal.idx ? { ...img, rotate: imagemModal.rotate || 0 } : img));
                  }
                  setImagemModal(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Salvar posição
              </button>
              {/* Excluir imagem */}
              <button
                className="px-4 py-2 rounded bg-red-600 text-white font-bold shadow hover:bg-red-800 flex items-center gap-2"
                title="Excluir imagem"
                onClick={() => {
                  const idx = imagemModal.idx;
                  const url = imagemModal.url;
                  if (url.startsWith('blob:')) {
                    try { URL.revokeObjectURL(url); } catch (e) { /* ignore */ }
                  }
                  setImagens(prev => prev.filter((_, i) => i !== idx));
                  setImagemModal(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Excluir imagem
              </button>
            </div>
          </div>
        </div>
      )}
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="btn-primary self-end mt-6">Salvar</button>
          {successMsg && <div className="text-green-700 font-bold text-center mt-2 animate-pulse">{successMsg}</div>}
        </form>
      </div>

      {/*
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Lista de Directores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {directors.map(d => (
            <div key={d.id} className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col gap-2 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg text-blue-800">{d.name}</span>
                <button onClick={() => deleteDirector(d.id)} className="text-red-600 font-bold hover:underline">Apagar</button>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                <span className="bg-blue-50 px-2 py-1 rounded-full border border-blue-100">{d.nacionalidade}</span>
                <span className="bg-blue-50 px-2 py-1 rounded-full border border-blue-100">{d.cargo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      */}

      {/*
      <div>
        <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">Galeria de Fotos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fotos.map(f => (
            <div key={f.id} className="bg-white rounded-xl shadow border border-green-100 p-6 flex flex-col gap-2 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg text-green-700">{f.name}</span>
                <button onClick={() => deleteFoto(f.id)} className="text-red-600 font-bold hover:underline">Apagar</button>
              </div>
              <ul className="mt-2 ml-2 list-disc text-gray-700 text-sm">
                {f.images.map((img, i) => (
                  <li key={i} className="mb-1"><a href={img} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">{f.descricao[i] || 'Sem descrição'}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      */}

      {/* Estilos utilitários para inputs e botões */}
      <style>{`
        .input-form {
          width: 100%;
          padding: 0.75rem 1rem; /* padding reduzido para melhor performance visual */
          border-radius: 0.75rem;
          border: 2px solid #2563eb; /* azul-600 do Tailwind */
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        input[type="file"].input-form {
          padding: 0;
          border: none;
          background: none;
          border-radius: 0;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .input-form:focus {
          border-color: #1d4ed8; /* azul-700 do Tailwind */
          box-shadow: 0 0 0 2px #93c5fd44;
        }
        .btn-primary { @apply bg-blue-600 text-white px-6 py-2 rounded font-bold shadow hover:bg-blue-700 transition; }
        .btn-success { @apply bg-green-600 text-white px-6 py-2 rounded font-bold shadow hover:bg-green-700 transition; }
      `}</style>
    </div>
  );
}

export default App;
