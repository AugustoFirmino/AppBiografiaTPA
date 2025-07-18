// Funções utilitárias para consumir a API de directores

const BASE_URL = 'https://tpaonline-001-site2.ntempurl.com';

export async function getDirectores() {
  const resp = await fetch(`${BASE_URL}/api/listar/directores`);
  if (!resp.ok) throw new Error('Erro ao buscar directores');
  return await resp.json();
}

export async function getDirectorById(id) {
  const directores = await getDirectores();
  return directores.find(d => String(d.id) === String(id));
}
