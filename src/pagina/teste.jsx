// UploadImagemTeste.jsx
import { useState } from 'react';

export default function UploadImagemTeste() {
  const [preview, setPreview] = useState(null);
  const [urlCloudinary, setUrlCloudinary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const enviarImagem = async () => {
    const fileInput = document.getElementById('input-imagem');
    const file = fileInput.files[0];
    if (!file) return alert("Selecione uma imagem.");

    const formData = new FormData();
    formData.append('imagem', file);

    setLoading(true);
    try {
      const resp = await fetch('https://appbiografiatpa.onrender.com/api/teste', {
        method: 'POST',
        body: formData,
      });

      const data = await resp.json();
      if (data.sucesso) {
        setUrlCloudinary(data.url);
      } else {
        alert("Erro ao enviar imagem.");
      }
    } catch (err) {
      console.error("Erro:", err);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded w-fit">
      <h2 className="text-xl font-semibold mb-2">Upload para Cloudinary</h2>

      <input
        id="input-imagem"
        type="file"
        accept="image/*"
        onChange={handleImagemChange}
        className="mb-2"
      />

      {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover mb-2" />}

      <button
        onClick={enviarImagem}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>

      {urlCloudinary && (
        <div className="mt-4">
          <p className="text-green-600 font-medium">✅ Imagem enviada com sucesso!</p>
          <a href={urlCloudinary} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Ver no Cloudinary
          </a>
        </div>
      )}
    </div>
  );
}
