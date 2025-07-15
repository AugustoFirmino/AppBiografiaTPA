// Arquivo: App.jsx

import { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';

const initialState = {
  name: '',
  link: '',
  idade: '',
  nacionalidade: '',
  ocupacao: '',
  nascimento: '',
  falecimento: '',
  cargo: '',
  biografia: '',
  qualificacoes_academica: [''],
  experiencias: [''],
  titulo: [''],
  descricao: [''],
  premios: [''],
  idiomas: [''],
  email: '',
  contactos: [''],
  redes_sociais: [''],
  data_publicacao: '',
};

function App() {
  const [imagemModal, setImagemModal] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [selectedImagesToDelete, setSelectedImagesToDelete] = useState([]);
  const imagensRef = useRef([]);
  // Seleção de imagens para exclusão múltipla
  const handleToggleSelectImage = (id) => {
    setSelectedImagesToDelete((prev) =>
      prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelectedImages = () => {
    setImagens((prev) => prev.filter((img) => !selectedImagesToDelete.includes(img.id)));
    setSelectedImagesToDelete([]);
    // Atualiza o input file para manter apenas as imagens restantes
    if (fileInputRef.current) {
      const dt = new DataTransfer();
      imagens.forEach((img) => {
        if (!selectedImagesToDelete.includes(img.id) && img.file) dt.items.add(img.file);
      });
      fileInputRef.current.files = dt.files;
    }
    // Fecha modal se a imagem modal foi deletada
    if (imagemModal && selectedImagesToDelete.includes(imagemModal.id)) {
      setImagemModal(null);
    }
  };
  // Define data_publicacao automaticamente na criação do cadastro
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [form, setForm] = useState({ ...initialState, data_publicacao: getTodayDate() });
  const countryOptions = countryList().getData();

  useEffect(() => {
    imagensRef.current.forEach(img => {
      if (!imagens.find(i => i.url === img.url)) {
        URL.revokeObjectURL(img.url);
      }
    });
    imagensRef.current = imagens;
  }, [imagens]);

  // Handlers para campos simples
  const handleChange = e => {
    const { name, value } = e.target;
    // Se o campo alterado for nascimento, calcula idade automaticamente
    if (name === 'nascimento') {
      let idade = '';
      if (value) {
        const hoje = new Date();
        const nasc = new Date(value);
        let anos = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
          anos--;
        }
        idade = anos >= 0 ? String(anos) : '';
      }
      setForm(prev => ({ ...prev, nascimento: value, idade }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handler para nacionalidade (country select)
  const handleCountryChange = option => {
    setForm(prev => ({ ...prev, nacionalidade: option ? option.label : '' }));
  };

  // Handlers para arrays
  const handleArrayChange = (e, field, idx) => {
    const { value } = e.target;
    setForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === idx ? value : item)),
    }));
  };
  const handleAddArrayItem = field => {
    // Só permite adicionar se o último item não está vazio
    setForm(prev => {
      const arr = prev[field];
      if (arr.length === 0 || arr[arr.length - 1].trim() !== '') {
        return { ...prev, [field]: [...arr, ''] };
      }
      return prev;
    });
  };
  const handleRemoveArrayItem = (field, idx) => {
    setForm(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== idx) }));
  };

  // Imagem (mantém seleção múltipla e preview)
  const fileInputRef = useRef();
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
    // Para o formulário, pega a primeira imagem como principal
    if (files[0]) setForm(prev => ({ ...prev, image: files[0] }));
    // Limpa o input file para permitir re-seleção do mesmo arquivo se necessário
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Handler para descrição de cada imagem
  const handleImageDescricaoChange = (id, value) => {
    setImagens(prev => prev.map(img => img.id === id ? { ...img, descricao: value } : img));
  };

  const handleRemoveImage = id => {
    setImagens(prev => {
      const novas = prev.filter(img => img.id !== id);
      // Atualiza o input file para manter apenas as imagens restantes
      if (fileInputRef.current) {
        // Cria um novo DataTransfer para atualizar o input file
        const dt = new DataTransfer();
        novas.forEach(img => {
          if (img.file) dt.items.add(img.file);
        });
        fileInputRef.current.files = dt.files;
      }
      return novas;
    });
    if (imagemModal?.id === id) {
      setImagemModal(null);
    }
  };


  // Salvar (envio real para o servidor)
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    setEnviando(true);
    setMensagem("");
    try {
      const formData = new FormData();
      // Campos simples
      Object.entries(form).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v, idx) => {
            formData.append(`${key}[${idx}]`, v);
          });
        } else {
          formData.append(key, value);
        }
      });
      // Imagens
      imagens.forEach((img, idx) => {
        formData.append('fotos', img.file);
        formData.append(`descricao_foto_${idx+1}`, img.descricao || "");
        formData.append(`rotate_foto_${idx+1}`, img.rotate || 0);
      });
      const resp = await fetch('http://localhost:3001/api/directores', {
        method: 'POST',
        body: formData
      });
      if (resp.ok) {
        setMensagem('Cadastro realizado com sucesso!');
        setForm({ ...initialState, data_publicacao: getTodayDate() });
        setImagens([]);
        setImagemModal(null);
      } else {
        setMensagem('Erro ao cadastrar. Tente novamente.');
      }
    } catch (err) {
      setMensagem('Erro de conexão com o servidor.');
    }
    setEnviando(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Cadastro de Directores</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow p-6 space-y-6 border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Nome</label>
                <input name="name" value={form.name} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Link</label>
                <input name="link" value={form.link} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Link externo (opcional)" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Idade</label>
                <div className="relative">
                  <input
                    name="idade"
                    value={form.idade ? form.idade + ' Anos' : ''}
                    readOnly
                    required
                    className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-gray-100 cursor-not-allowed pr-16"
                    placeholder="Idade"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Nacionalidade</label>
                <Select
                  options={countryOptions}
                  value={countryOptions.find(opt => opt.label === form.nacionalidade) || null}
                  onChange={handleCountryChange}
                  isClearable={false}
                  placeholder="Selecione a nacionalidade..."
                  classNamePrefix="react-select"
                  formatOptionLabel={option => (
                    <div className="flex items-center gap-2">
                      <ReactCountryFlag countryCode={option.value} svg style={{ width: '1.5em', height: '1.5em' }} />
                      <span>{option.label}</span>
                    </div>
                  )}
                  styles={{
                    control: (base) => ({ ...base, minHeight: '48px', borderRadius: '0.5rem', borderColor: '#bfdbfe', boxShadow: 'none' }),
                    option: (base, state) => ({ ...base, padding: '10px 16px', backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#e0e7ff' : 'white', color: state.isSelected ? 'white' : '#1e293b' }),
                  }}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Ocupação</label>
                <input name="ocupacao" value={form.ocupacao} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Ocupação" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Nascimento</label>
                <input type="date" name="nascimento" value={form.nascimento} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Data de nascimento" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Falecimento</label>
                <input type="date" name="falecimento" value={form.falecimento} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Data de falecimento (opcional)" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Cargo</label>
                <input name="cargo" value={form.cargo} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Cargo" />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-blue-800 mb-1">Biografia</label>
              <textarea name="biografia" value={form.biografia} onChange={handleChange} rows={5} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Biografia detalhada do director" />
            </div>
            {/* Imagens */}
            <div className="mt-6">
              <label className="block font-semibold">Galerias de Fotos</label>
              <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
              {imagens.length > 0 && (
                <div className="flex items-center gap-4 mt-2 mb-2">
                  <button
                    type="button"
                    className={`bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={handleDeleteSelectedImages}
                    disabled={selectedImagesToDelete.length === 0}
                  >
                    Excluir Selecionadas
                  </button>
                  <span className="text-sm text-gray-500">
                    {selectedImagesToDelete.length === 0
                      ? 'Nenhuma imagem selecionada'
                      : `${selectedImagesToDelete.length} imagem${selectedImagesToDelete.length > 1 ? 's' : ''} selecionada${selectedImagesToDelete.length > 1 ? 's' : ''}`}
                  </span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {imagens.map(img => (
                  <div key={img.id} className="relative flex flex-col items-center">
                    <input
                      type="checkbox"
                      checked={selectedImagesToDelete.includes(img.id)}
                      onChange={() => handleToggleSelectImage(img.id)}
                      className="absolute top-1 left-1 w-4 h-4 accent-blue-600 z-10 bg-white border border-blue-300 rounded"
                      title="Selecionar para exclusão em lote"
                    />
                    <img
                      src={img.url}
                      className="w-20 h-20 object-cover rounded cursor-pointer border-2 border-blue-200"
                      style={{ transform: `rotate(${img.rotate}deg)` }}
                      onClick={() => setImagemModal(img)}
                    />
                    <input
                      type="text"
                      placeholder="Descrição da imagem"
                      value={img.descricao}
                      onChange={e => handleImageDescricaoChange(img.id, e.target.value)}
                      className="mt-1 text-xs p-1 border rounded w-20"
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5"
                      type="button"
                      onClick={() => handleRemoveImage(img.id)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Arrays dinâmicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['qualificacoes_academica','experiencias','titulo','descricao','premios','idiomas','contactos','redes_sociais'].map(field => (
            <div key={field}>
              <label className="block font-semibold capitalize">{field.replace(/_/g,' ')}</label>
              {form[field].map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <input value={item} onChange={e => handleArrayChange(e, field, idx)} className="input input-bordered w-full rounded border-gray-300 p-2" />
                  <button type="button" onClick={() => handleRemoveArrayItem(field, idx)} className="text-red-500 font-bold">-</button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem(field)}
                className={`text-blue-600 font-bold ${form[field].length > 0 && form[field][form[field].length-1].trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={form[field].length > 0 && form[field][form[field].length-1].trim() === ''}
              >Adicionar</button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="input input-bordered w-full rounded border-gray-300 p-2" />
          </div>
          <div className="flex flex-col items-center justify-end w-full">
            <label className="block font-semibold mb-1 text-center w-full">Data de Publicação</label>
            <div className="w-full flex items-center">
              <input
                name="data_publicacao"
                value={form.data_publicacao}
                readOnly
                className="text-blue-700 font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition-all border-0 focus:ring-2 focus:ring-blue-300 cursor-not-allowed w-full text-center outline-none"
                style={{ letterSpacing: '1px', background: 'none' }}
              />
            </div>
          </div>

        </div>
        <div className="flex flex-col items-center mt-8 gap-2">
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Salvar Cadastro'}
          </button>
          {mensagem && <div className="text-center font-semibold">{mensagem}</div>}
        </div>
      </form>

      {/* Modal de visualização de imagem */}
      {imagemModal && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          onClick={() => setImagemModal(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl relative max-w-lg w-full flex flex-col items-center animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-row items-center w-full justify-center relative">
              {/* Botão Anterior */}
              <button
                type="button"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-1.5 shadow focus:outline-none disabled:opacity-30 z-10 transition-all duration-150"
                style={{ fontSize: 20, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => {
                  const idx = imagens.findIndex(img => img.id === imagemModal.id);
                  if (idx > 0) {
                    setImagemModal({ ...imagens[idx - 1], rotate: imagens[idx - 1].rotate || 0 });
                  }
                }}
                disabled={imagens.findIndex(img => img.id === imagemModal.id) === 0}
                aria-label="Anterior"
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>&#8592;</span>
              </button>
              <img
                src={imagemModal.url}
                style={{ transform: `rotate(${imagemModal.rotate}deg)` }}
                className="rounded-lg border-4 border-blue-200 shadow-lg object-contain bg-gray-50 mx-8"
                alt="Visualização"
                width={350}
                height={350}
              />
              {/* Botão Próxima */}
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-1.5 shadow focus:outline-none disabled:opacity-30 z-10 transition-all duration-150"
                style={{ fontSize: 20, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => {
                  const idx = imagens.findIndex(img => img.id === imagemModal.id);
                  if (idx < imagens.length - 1) {
                    setImagemModal({ ...imagens[idx + 1], rotate: imagens[idx + 1].rotate || 0 });
                  }
                }}
                disabled={imagens.findIndex(img => img.id === imagemModal.id) === imagens.length - 1}
                aria-label="Próxima"
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>&#8594;</span>
              </button>
            </div>
            <div className="text-gray-600 text-xs mt-2 max-w-xs text-center truncate">
              {imagens.find(img => img.id === imagemModal.id)?.descricao || 'Sem descrição'}
            </div>
            <div className="flex flex-wrap gap-3 mt-6 justify-center w-full">
              <button
                type="button"
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition"
                onClick={() => setImagemModal(imagemModal => ({ ...imagemModal, rotate: (imagemModal.rotate - 90 + 360) % 360 }))}
              >
                Rotacionar -90°
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition"
                onClick={() => setImagemModal(imagemModal => ({ ...imagemModal, rotate: (imagemModal.rotate + 90) % 360 }))}
              >
                Rotacionar +90°
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition"
                onClick={() => {
                  const idx = imagens.findIndex(img => img.id === imagemModal.id);
                  handleRemoveImage(imagemModal.id);
                  // Após excluir, mostrar próxima imagem, ou anterior se não houver próxima
                  setTimeout(() => {
                    if (imagens.length > 1) {
                      if (idx < imagens.length - 1) {
                        setImagemModal(imagens[idx + 1]);
                      } else if (idx > 0) {
                        setImagemModal(imagens[idx - 1]);
                      } else {
                        setImagemModal(null);
                      }
                    } else {
                      setImagemModal(null);
                    }
                  }, 0);
                }}
              >
                Excluir
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-semibold transition"
                onClick={() => {
                  setImagens(prev => prev.map(img => img.id === imagemModal.id ? { ...img, rotate: imagemModal.rotate } : img));
                  setImagemModal(null);
                }}
              >
                Salvar
              </button>
            </div>
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
              onClick={() => setImagemModal(null)}
              aria-label="Fechar modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
