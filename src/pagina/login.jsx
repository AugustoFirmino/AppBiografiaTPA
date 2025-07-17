import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi'; // Ícone de login (Feather Icons)
import { Link } from 'react-router-dom';
function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [mensagem, setMensagem] = useState('');
  const [successo, setSuccesso] = useState(null);
  const navigate = useNavigate();

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
      setSuccesso(data.success);

      // Esconde a mensagem após 10 segundos (em qualquer caso)
      setTimeout(() => {
        setMensagem('');
        setSuccesso(null);
      }, 10000);

      // Se sucesso, redireciona após 2 segundos
      if (data.success) {
        setTimeout(() => {
          navigate('/cadastrar_directores');
        }, 2000);
      }

    } catch (error) {
      setMensagem('Erro ao conectar ao servidor');
      setSuccesso(false);

      // Esconde mensagem de erro após 10 segundos
      setTimeout(() => {
        setMensagem('');
        setSuccesso(null);
      }, 10000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-blue-700 mb-1">Nome de usuário</label>
            <input
              name="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-blue-700 mb-1">Senha</label>
            <input
              name="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        {mensagem && (
          <p className={`mt-4 flex items-center justify-center gap-2 text-sm ${successo ? 'text-green-600' : 'text-red-600'}`}>
            {successo === true && <AiOutlineCheckCircle size={20} />}
            {successo === false && <AiOutlineCloseCircle size={20} />}
            {mensagem}
          </p>
        )}
      </div>
        <Link
        to="/login"
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
      >
        <FiLogIn className="text-lg" />
        voltar
      </Link>
    </div>
  );
}

export default Login;
