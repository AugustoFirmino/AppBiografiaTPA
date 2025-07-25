// Funções utilitárias para consumir a API de directores

export async function getDirectores() {
  const res = await fetch('http://localhost:3001/api/listar/directores');
  if (!res.ok) throw new Error('Erro ao buscar diretores');
  return res.json();
}



export async function getDirectorById(id) {
  const res = await fetch(`http://localhost:3001/api/directores/${id}`);
  if (!res.ok) throw new Error('Erro ao buscar diretor por ID');
  return res.json();
}