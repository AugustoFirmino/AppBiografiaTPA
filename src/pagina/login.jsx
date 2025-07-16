import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- importar o hook

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate(); // <-- inicializar

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setMensagem(data.message);

      if (data.success) {
        // Espera 2 segundos e redireciona para /biografia
        setTimeout(() => {
          navigate('/cadastrar_directores');
        }, 2000);
      }

    } catch (error) {
      setMensagem('Erro ao conectar ao servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome de usuário</label>
            <input
              name="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              name="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
          >
            Entrar
          </button>
        </form>

        {mensagem && (
          <p className="mt-4 text-center text-sm text-gray-700">{mensagem}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
