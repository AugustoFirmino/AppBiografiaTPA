// frontend/src/App.jsx
import { useEffect, useState } from 'react';

function App() {
  const [directors, setDirectors] = useState([]);
  const [form, setForm] = useState({
    name: '', idade: '', nacionalidade: '', ocupacao: '', nascimento: '', cargo: '',
    biografia: '', qualificacoes_academica: '', experiencias: '', idiomas: '', data_publicacao: ''
  });

  const [fotos, setFotos] = useState([]);
  const [fotoForm, setFotoForm] = useState({ name: '', images: '', descricao: '' });

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
    const { name, value } = e.target;
    setFotoForm({ ...fotoForm, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
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
    setForm({
      name: '', idade: '', nacionalidade: '', ocupacao: '', nascimento: '', cargo: '',
      biografia: '', qualificacoes_academica: '', experiencias: '', idiomas: '', data_publicacao: ''
    });
    fetchDirectors();
  };

  const handleFotoSubmit = async e => {
    e.preventDefault();
    const newFoto = {
      ...fotoForm,
      images: fotoForm.images.split(', '),
      descricao: fotoForm.descricao.split(', ')
    };
    await fetch('http://localhost:3001/api/fotos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFoto),
    });
    setFotoForm({ name: '', images: '', descricao: '' });
    fetchFotos();
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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Directores</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input name="name" placeholder="Nome" className="border w-full p-2" value={form.name} onChange={handleChange} />
        <input name="idade" placeholder="Idade" className="border w-full p-2" value={form.idade} onChange={handleChange} />
        <input name="nacionalidade" placeholder="Nacionalidade" className="border w-full p-2" value={form.nacionalidade} onChange={handleChange} />
        <input name="ocupacao" placeholder="Ocupação" className="border w-full p-2" value={form.ocupacao} onChange={handleChange} />
        <input name="nascimento" placeholder="Data de nascimento" className="border w-full p-2" value={form.nascimento} onChange={handleChange} />
        <input name="cargo" placeholder="Cargo" className="border w-full p-2" value={form.cargo} onChange={handleChange} />
        <textarea name="biografia" placeholder="Biografia (HTML)" className="border w-full p-2" value={form.biografia} onChange={handleChange} />
        <input name="qualificacoes_academica" placeholder="Qualificações (separadas por vírgula)" className="border w-full p-2" value={form.qualificacoes_academica} onChange={handleChange} />
        <input name="experiencias" placeholder="Experiências (separadas por vírgula)" className="border w-full p-2" value={form.experiencias} onChange={handleChange} />
        <input name="idiomas" placeholder="Idiomas (separados por vírgula)" className="border w-full p-2" value={form.idiomas} onChange={handleChange} />
        <input name="data_publicacao" placeholder="Data de publicação" className="border w-full p-2" value={form.data_publicacao} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Lista de Directores</h2>
      <ul>
        {directors.map(d => (
          <li key={d.id} className="border p-2 mb-2">
            <strong>{d.name}</strong> - {d.nacionalidade} - {d.cargo}
            <button onClick={() => deleteDirector(d.id)} className="text-red-600 ml-4">Apagar</button>
          </li>
        ))}
      </ul>

      <hr className="my-6" />

      <h1 className="text-2xl font-bold mb-4">Cadastro de Fotos</h1>
      <form onSubmit={handleFotoSubmit} className="space-y-2 mb-6">
        <input name="name" placeholder="Nome do Director" className="border w-full p-2" value={fotoForm.name} onChange={handleFotoChange} />
        <input name="images" placeholder="URLs das Imagens separadas por vírgula" className="border w-full p-2" value={fotoForm.images} onChange={handleFotoChange} />
        <input name="descricao" placeholder="Descrições separadas por vírgula" className="border w-full p-2" value={fotoForm.descricao} onChange={handleFotoChange} />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Salvar Foto</button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Galeria de Fotos</h2>
      <ul>
        {fotos.map(f => (
          <li key={f.id} className="border p-2 mb-2">
            <strong>{f.name}</strong>
            <button onClick={() => deleteFoto(f.id)} className="text-red-600 ml-4">Apagar</button>
            <ul className="mt-2 ml-4 list-disc">
              {f.images.map((img, i) => (
                <li key={i}><a href={img} target="_blank" rel="noopener noreferrer">{f.descricao[i] || 'Sem descrição'}</a></li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
