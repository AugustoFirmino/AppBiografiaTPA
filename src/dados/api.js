// Funções utilitárias para consumir a API de directores

export async function getDirectores() {
  const resp = await fetch('http://localhost:3001/api/listar/directores');
  if (!resp.ok) throw new Error('Erro ao buscar directores');
  return await resp.json();
}

export async function getDirectorById(id) {
  const directores = await getDirectores();
  // O id pode ser string ou number
  return directores.find(d => String(d.id) === String(id));
}
