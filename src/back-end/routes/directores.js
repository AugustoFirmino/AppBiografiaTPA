// routes/diretores.js
import express from 'express';

import multer from 'multer';
import path from 'path';
import fs from 'fs';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

dotenv.config(); 

import { pool } from '../db.js';



const router = express.Router();

router.post('/', (req, res) => {
  const {
    name, link, idade, nacionalidade, ocupacao, nascimento, falecimento,
    cargo, biografia, qualificacoes_academica, experiencias, titulo,
    descricao, idiomas, email, contactos, redes_sociais, data_publicacao, depoimentos
  } = req.body;

  const sql = `
    INSERT INTO usuarios (
      name, link, idade, nacionalidade, ocupacao, nascimento, falecimento,
      cargo, biografia, qualificacoes_academica, experiencias, titulo,
      descricao, idiomas, email, contactos, redes_sociais, data_publicacao, depoimentos
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(sql, [
    name, link, idade, nacionalidade, ocupacao, nascimento, falecimento,
    cargo, biografia,
    JSON.stringify(qualificacoes_academica),
    JSON.stringify(experiencias),
    JSON.stringify(titulo),
    JSON.stringify(descricao),
    JSON.stringify(idiomas),
    email,
    JSON.stringify(contactos),
    JSON.stringify(redes_sociais),
    data_publicacao,
    JSON.stringify(depoimentos)
  ], (err, result) => {
    if (err) return res.status(500).send('Erro ao salvar dados.');
    res.send({ message: 'Salvo com sucesso!', id: result.insertId });
  });
});












// Diretório base
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseUploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(baseUploadDir)) {
  fs.mkdirSync(baseUploadDir);
}

const tempUploadDir = path.join(baseUploadDir, 'temp');
fs.mkdirSync(tempUploadDir, { recursive: true });




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempPath = 'uploads/tmp';
    fs.mkdirSync(tempPath, { recursive: true });
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}-${file.originalname}`);
  }
});
const upload = multer({ storage });


router.post('/cadastrar/directores', upload.array('fotos'), async (req, res) => {
  try {
    const form = req.body;

    // 1. Insere o diretor para obter o ID
const [result] = await pool.query(
  `INSERT INTO usuarios (
    nome, link, nacionalidade, ocupacao, nascimento, falecimento,
    cargo, biografia,  email, data_publicacao,
   data_actualizacao
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
  [
    form.name,
    form.link,
    form.nacionalidade,
    form.ocupacao,
    form.nascimento || null,
    form.falecimento || null,
    form.cargo,
    form.biografia,
    
    form.email,
    
    new Date(), // data_publicacao
    new Date(), // data_actualizacao
     
  ]
);

    const diretorId = result.insertId;
    const pastaFinal = `uploads/${form.name.replace(/\s/g, "_")}-${diretorId}`;
    fs.mkdirSync(pastaFinal, { recursive: true });

    // 2. Move as fotos da pasta temporária para a final
    const novasFotos = [];
    req.files.forEach((file, index) => {
      const novaPath = path.join(pastaFinal, path.basename(file.path));
      fs.renameSync(file.path, novaPath);
      novasFotos.push(novaPath);
    });

   

    res.status(200).json({ sucesso: true, id: diretorId });
  } catch (err) {
  
    res.status(500).json({ erro: "Erro ao cadastrar diretor." });
  }
});


// Rota: POST /cadastrar/qualificacoes_academicas

router.post('/cadastrar/qualificacoes', async (req, res) => {
  try {
    const { id_director, qualificacoes } = req.body;

    if (!id_director || !Array.isArray(qualificacoes)) {
      return res.status(400).json({ erro: "Dados inválidos." });
    }

    for (const qual of qualificacoes) {
      await pool.query(
        `INSERT INTO qualificacoes_academicas (id_director, descricao) VALUES (?, ?)`,
        [id_director, qual.descricao]
      );
    }

    res.status(200).json({ sucesso: true, mensagem: 'Qualificações cadastradas com sucesso!' });

  } catch (err) {
    
    res.status(500).json({ erro: 'Erro ao cadastrar qualificações acadêmicas.' });
  }
});



// Rota: POST /cadastrar/experiencias_profissionais

router.post('/cadastrar/experiencias', async (req, res) => {
  try {
    const { id_director, experiencias } = req.body;

    if (!id_director || !Array.isArray(experiencias)) {
      return res.status(400).json({ erro: "Dados inválidos." });
    }

    for (const exp of experiencias) {
      await pool.query(
        `INSERT INTO experiencias (id_director, descricao) VALUES (?, ?)`,
        [id_director, exp.descricao]
      );
    }

    res.status(200).json({ sucesso: true, mensagem: 'Experiências cadastradas com sucesso!' });
  } catch (err) {
  
    res.status(500).json({ erro: 'Erro ao cadastrar experiências.' });
  }
});

// Rota: POST /cadastrar/idiomas
router.post('/cadastrar/idiomas', async (req, res) => {
  try {
    const { id_director, idiomas } = req.body;

    if (!id_director || !Array.isArray(idiomas)) {
      return res.status(400).json({ erro: "Dados inválidos." });
    }

    // Insere cada idioma com base no id do diretor
    for (const item of idiomas) {
      await pool.query(
        `INSERT INTO idiomas (id_director, idioma) VALUES (?, ?)`,
        [id_director, item.idioma]
      );
    }

    res.status(200).json({ sucesso: true, mensagem: 'Idiomas cadastrados com sucesso!' });

  } catch (err) {
    
    res.status(500).json({ erro: 'Erro ao cadastrar idiomas.' });
  }
});



// Rota: POST /cadastrar/contactos
router.post('/cadastrar/contactos', async (req, res) => {
  try {
    const { id_director, contactos } = req.body;

    if (!id_director || !Array.isArray(contactos)) {
      return res.status(400).json({ erro: "Dados inválidos." });
    }

    for (const item of contactos) {
      await pool.query(
        `INSERT INTO contactos (id_director, telefone) VALUES (?, ?)`,
        [id_director, item.telefone]
      );
    }

    res.status(200).json({ sucesso: true, mensagem: 'Contactos cadastrados com sucesso!' });
  } catch (err) {
    
    res.status(500).json({ erro: 'Erro ao cadastrar contactos.' });
  }
});


// Rota: POST /cadastrar/premios
router.post('/cadastrar/premios', async (req, res) => {
  try {
    const { id_director, premios } = req.body;

    if (!id_director || !Array.isArray(premios)) {
      return res.status(400).json({ erro: "Dados inválidos." });
    }

    for (const premio of premios) {
      await pool.query(
        `INSERT INTO premios (id_director, titulo, descricao) VALUES (?, ?, ?)`,
        [id_director, premio.titulo, premio.descricao]
      );
    }

    res.status(200).json({ sucesso: true, mensagem: 'Prêmios cadastrados com sucesso!' });
  } catch (err) {
    
    res.status(500).json({ erro: 'Erro ao cadastrar prêmios.' });
  }
});



// Rota: POST /cadastrar/depoimentos
router.post('/cadastrar/depoimentos', async (req, res) => {
  try {
    const { id_director, depoimentos } = req.body;

    if (!id_director || !Array.isArray(depoimentos)) {
      return res.status(400).json({ erro: "Dados inválidos." });
    }

    // Insere cada depoimento com base no id do diretor
    for (const dep of depoimentos) {
      await pool.query(
        `INSERT INTO depoimentos (id_director, nome, cargo, mensagem) VALUES (?, ?, ?, ?)`,
        [id_director, dep.nome, dep.cargo, dep.mensagem]
      );
    }

    res.status(200).json({ sucesso: true, mensagem: 'Depoimentos cadastrados com sucesso!' });

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar depoimentos.' });
  }
});


// rotas para cadastrar as imagens
router.post('/cadastrar/imagens', upload.array('imagens'), async (req, res) => {
  try {
    const { id_director } = req.body;
    const arquivos = req.files;

    if (!id_director || !arquivos || arquivos.length === 0) {
      return res.status(400).json({ erro: "ID do diretor ou imagens não fornecidos." });
    }

    const pastaFinal = `uploads/${id_director}`;
    fs.mkdirSync(pastaFinal, { recursive: true });

    for (let i = 0; i < arquivos.length; i++) {
      const file = arquivos[i];
      const novaPath = path.join(pastaFinal, file.originalname);
      fs.renameSync(file.path, novaPath);

      const descricao = req.body[`descricao_foto_${i + 1}`] || "";

      await pool.query(
        `INSERT INTO imagens (id_director, caminho, descricao) VALUES (?, ?, ?)`,
        [id_director, novaPath, descricao]
      );
    }

    res.status(200).json({ sucesso: true, mensagem: 'Imagens cadastradas com sucesso!' });

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar imagens.' });
  }
});





// Rota GET /api/listar/directores
router.get('/listar/directores', async (req, res) => {
  try {
    const [usuarios] = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');
    const [fotos] = await pool.query('SELECT * FROM imagens');

    // Agrupa as fotos por id_director
    const fotosPorDirector = {};
    fotos.forEach(f => {
      if (!fotosPorDirector[f.id_director]) fotosPorDirector[f.id_director] = [];
      fotosPorDirector[f.id_director].push(f.caminho);
    });

    // Une os dados
    const directoresComFotos = usuarios.map(dir => ({
      ...dir,
      fotos: fotosPorDirector[dir.id] || []
    }));

    res.json(directoresComFotos);

  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar directores." });
  }
});




// GET /api/directores/:id
// Buscar dados completos de 1 diretor
router.get('/directores/:id', async (req, res) => {
const { id } = req.params;

  try {
    // Dados principais do diretor
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ erro: "Diretor não encontrado" });

    const diretor = rows[0];

    // Buscar dados das tabelas associadas
    const [idiomas] = await pool.query("SELECT idioma FROM idiomas WHERE id_director = ?", [id]);
    const [experiencias] = await pool.query("SELECT descricao FROM experiencias WHERE id_director = ?", [id]);
    const [qualificacoes] = await pool.query("SELECT descricao FROM qualificacoes_academicas WHERE id_director = ?", [id]);
    const [fotos] = await pool.query("SELECT id, caminho , descricao FROM imagens WHERE id_director = ?", [id]);
    const [depoimentos] = await pool.query("SELECT nome, cargo, mensagem FROM depoimentos WHERE id_director = ?", [id]);
    const [premios] = await pool.query("SELECT titulo, descricao FROM premios WHERE id_director = ?", [id]);
    const [contactos] = await pool.query("SELECT telefone FROM contactos WHERE id_director = ?", [id]);

    // Inserir no objeto final
    diretor.idiomas = idiomas.map(i => i.idioma);
    diretor.experiencias = experiencias.map(e => e.descricao);
    diretor.qualificacoes_academica = Array.isArray(qualificacoes) ? qualificacoes.map(q => q.descricao) : [];

    diretor.fotos = fotos;
    diretor.depoimentos = depoimentos;
    diretor.premios = premios;
    diretor.contactos = contactos;

    res.json(diretor);
  } catch (erro) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});


// Rota de login

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM contas_usuarios WHERE nome = ? AND senha = ? LIMIT 1',
      [username, password]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: 'Usuário ou senha inválidos' });
    }

    const usuarioLogado = rows[0];

    // Deslogar todos os usuários
    await pool.query('UPDATE contas_usuarios SET logado = 0');

    // Marcar o usuário atual como logado
    await pool.query('UPDATE contas_usuarios SET logado = 1 WHERE id = ?', [usuarioLogado.id]);

    return res.json({
      success: true,
      message: 'Login efectuado com sucesso!',
      usuario: {
        id: usuarioLogado.id,
        nome: usuarioLogado.nome,
        admin: usuarioLogado.admin === 1,
        logado: true
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Erro interno no servidor' });
  }
});


// POST /api/logout — faz logout apenas do usuário informado
router.post('/logout', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: 'ID do usuário é obrigatório' });
  }

  try {
    const [result] = await pool.query('UPDATE contas_usuarios SET logado = 0 WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    return res.json({ success: true, message: 'Logout realizado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro interno ao fazer logout' });
  }
});


//  ROTA PARA LISTAR TODOS OS USUÁRIOS
router.get('/todos/directores', (req, res) => {
  pool.query('SELECT * FROM contas', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
    res.json(results);
  });
});



// ROTAS  PARA ACTUALIZAR DADOS DO DIRECTOR NO SISTEMA 



function formatarDataParaMySQL(dataISO) {
  if (!dataISO) return null;
  const data = new Date(dataISO);
  return data.toISOString().slice(0, 19).replace('T', ' '); // => '2025-07-21 23:00:00'
}

router.put('/actualizar/directores/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const {
    name, nacionalidade, nascimento, falecimento, email,
    cargo, ocupacao, link, biografia, data_publicacao
  } = req.body;

  const nascimentoFormatado = nascimento ? nascimento : null;
  const falecimentoFormatado = falecimento ? falecimento : null;
  const publicacaoFormatada = formatarDataParaMySQL(data_publicacao);

  try {
    await pool.query(`
      UPDATE usuarios
      SET nome = ?, nacionalidade = ?, nascimento = ?, falecimento = ?, email = ?,
          cargo = ?, ocupacao = ?, link = ?, biografia = ?, data_publicacao = ?
      WHERE id = ?
    `, [
      name, nacionalidade, nascimentoFormatado, falecimentoFormatado, email,
      cargo, ocupacao, link, biografia, publicacaoFormatada, id
    ]);

    res.json({ sucesso: true });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao atualizar diretor' });
  }
});

router.post('/actualizar/idiomas', async (req, res) => {
  const { id_director, idiomas } = req.body;

  try {
    await pool.query("DELETE FROM idiomas WHERE id_director = ?", [id_director]);

    for (const item of idiomas) {
      if (item.idioma && item.idioma.trim() !== '') {
        await pool.query("INSERT INTO idiomas (id_director, idioma) VALUES (?, ?)", [id_director, item.idioma]);
      }
    }

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno ao atualizar idiomas" });
  }
});


router.post('/actualizar/experiencias', async (req, res) => {
  const { id_director, experiencias } = req.body;

  try {
    await pool.query("DELETE FROM experiencias WHERE id_director = ?", [id_director]);

    for (const item of experiencias) {
      if (item.descricao && item.descricao.trim() !== '') {
        await pool.query("INSERT INTO experiencias (id_director, descricao) VALUES (?, ?)", [id_director, item.descricao]);
      }
    }

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno ao atualizar experiências" });
  }
});


router.post('/actualizar/qualificacoes', async (req, res) => {
  const { id_director, qualificacoes } = req.body;

  try {
    await pool.query("DELETE FROM qualificacoes_academicas WHERE id_director = ?", [id_director]);

    for (const q of qualificacoes) {
      if (q.descricao && q.descricao.trim() !== '') {
        await pool.query("INSERT INTO qualificacoes_academicas (id_director, descricao) VALUES (?, ?)", [id_director, q.descricao]);
      }
    }

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno ao atualizar qualificações" });
  }
});


router.post('/actualizar/contactos', async (req, res) => {
  const { id_director, contactos } = req.body;

  try {
    await pool.query("DELETE FROM contactos WHERE id_director = ?", [id_director]);

    for (const c of contactos) {
      if (c.telefone && c.telefone.trim() !== '') {
        await pool.query("INSERT INTO contactos (id_director, telefone) VALUES (?, ?)", [id_director, c.telefone]);
      }
    }

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno ao atualizar contactos" });
  }
});



// Rota para actualizar os premios do director
router.post('/actualizar/premios', async (req, res) => {
  const { id_director, premios } = req.body;

  try {
    await pool.query("DELETE FROM premios WHERE id_director = ?", [id_director]);

    for (const p of premios) {
      if (p.titulo || p.descricao) {
        await pool.query("INSERT INTO premios (id_director, titulo, descricao) VALUES (?, ?, ?)", [id_director, p.titulo, p.descricao]);
      }
    }

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno ao atualizar prêmios" });
  }
});


// rota para actualizar os depoimentos do director
router.post('/actualizar/depoimentos', async (req, res) => {
  const { id_director, depoimentos } = req.body;

  try {
    await pool.query("DELETE FROM depoimentos WHERE id_director = ?", [id_director]);

    for (const d of depoimentos) {
      if (d.nome && d.mensagem) {
        await pool.query("INSERT INTO depoimentos (id_director, nome, cargo, mensagem) VALUES (?, ?, ?, ?)", [id_director, d.nome, d.cargo, d.mensagem]);
      }
    }

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno ao atualizar depoimentos" });
  }
});


// PUT /api/actualizar/imagens
router.put('/actualizar/imagens', async (req, res) => {
  const { imagens } = req.body;

  if (!Array.isArray(imagens)) {
    return res.status(400).json({ erro: "Formato de dados inválido. Esperado: array de imagens." });
  }

  try {
    for (const img of imagens) {
      if (img.id && img.descricao !== undefined) {
        await pool.query("UPDATE imagens SET descricao = ? WHERE id = ?", [img.descricao, img.id]);
      }
    }

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno ao atualizar imagens" });
  }
});







router.put('/actualizar/novas-imagens', upload.array('imagens'), async (req, res) => {
  const { id_director } = req.body;
  const arquivos = req.files;
  const descricoes = req.body.descricoes || [];

  try {
    // 🔁 NÃO excluir imagens antigas aqui!

    // Insere as novas imagens
    for (let i = 0; i < arquivos.length; i++) {
      const file = arquivos[i];
      const descricao = Array.isArray(descricoes) ? descricoes[i] : descricoes;
      await pool.query(
        "INSERT INTO imagens (id_director, caminho, descricao) VALUES (?, ?, ?)",
        [id_director, file.path.replace(/\\/g, '/'), descricao || ""]
      );
    }

    res.json({ sucesso: true });
  } catch (error) {

    res.status(500).json({ erro: "Erro interno ao adicionar imagens" });
  }
});




//rota para deletar a imagem selecionada
router.delete('/deletar/imagem/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar caminho da imagem
    const [rows] = await pool.query("SELECT caminho FROM imagens WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Imagem não encontrada' });
    }

    const caminhoImagem = path.join(__dirname, '..', rows[0].caminho);

    // Remover arquivo físico se existir
    if (fs.existsSync(caminhoImagem)) {
      fs.unlinkSync(caminhoImagem);
    }

    // Remover registro do banco
    await pool.query("DELETE FROM imagens WHERE id = ?", [id]);

    res.json({ sucesso: true });
  } catch (error) {
    
    res.status(500).json({ erro: "Erro interno ao deletar imagem" });
  }
});




// DELETE /api/remover/imagens
router.delete('/remover/imagens', async (req, res) => {
  const { ids } = req.body; // array de ids de imagens

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ erro: "Nenhuma imagem selecionada para remoção." });
  }

  try {
    // Buscar os caminhos das imagens a serem deletadas
    const [imagens] = await pool.query(
      `SELECT caminho FROM imagens WHERE id IN (${ids.map(() => '?').join(',')})`,
      ids
    );

    // Deletar os arquivos do sistema
    for (const img of imagens) {
      const caminho = path.join(__dirname, '..', img.caminho);
      if (fs.existsSync(caminho)) fs.unlinkSync(caminho);
    }

    // Remover do banco de dados
    await pool.query(
      `DELETE FROM imagens WHERE id IN (${ids.map(() => '?').join(',')})`,
      ids
    );

    res.json({ sucesso: true });
  } catch (error) {

    res.status(500).json({ erro: "Erro interno ao remover imagens." });
  }
});







router.delete('/deletar/director/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Buscar caminhos das imagens para deletar do disco
    const [imagens] = await pool.query('SELECT caminho FROM imagens WHERE id_director = ?', [id]);
    for (const img of imagens) {
      const caminho = path.join(__dirname, '..', img.caminho);
      if (fs.existsSync(caminho)) {
        fs.unlinkSync(caminho); // Remove o arquivo do disco
      }
    }

    // 2. Deletar de todas as tabelas relacionadas
    await pool.query('DELETE FROM imagens WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM idiomas WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM experiencias WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM qualificacoes_academicas WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM contactos WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM premios WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM depoimentos WHERE id_director = ?', [id]);

    // 3. Finalmente, deletar o próprio usuário
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);

    res.json({ sucesso: true, mensagem: "Director e todos os dados relacionados foram deletados com sucesso." });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar director e dados relacionados." });
  }
});


// Servir arquivos estáticos da pasta uploads
router.use('/uploads', express.static(baseUploadDir));

export default router;
