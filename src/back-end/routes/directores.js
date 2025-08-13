// routes/diretores.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { pool } from '../db.js';



dotenv.config();

const router = express.Router();

// Configuração de armazenamento em memória
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Resolver __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto até a raiz do projeto
const raizProjeto = path.join(__dirname, '..', '..','..', 'public', 'uploads')// sobe 3 níveis

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











router.post('/cadastrar/directores', async (req, res) => {
  try {
    const {
      name, link, nacionalidade, ocupacao, nascimento, falecimento,
      cargo, biografia, email
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO usuarios (
        nome, link, nacionalidade, ocupacao, nascimento, falecimento,
        cargo, biografia, email, data_publicacao, data_actualizacao
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        link,
        nacionalidade,
        ocupacao,
        nascimento || null,
        falecimento || null,
        cargo,
        biografia,
        email,
        new Date(), // data_publicacao
        new Date()  // data_actualizacao
      ]
    );

    const diretorId = result.insertId;
    res.status(200).json({ sucesso: true, id: diretorId, mensagem: 'Diretor cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
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


// POST para salvar imagens diretamente no banco em Base64
router.post('/cadastrar/imagens', upload.array('imagens'), async (req, res) => {
  try {
    const { id_director } = req.body;
    const arquivos = req.files;

    if (!id_director || !arquivos || arquivos.length === 0) {
      return res.status(400).json({ erro: "ID do diretor ou imagens não fornecidos." });
    }

    for (let i = 0; i < arquivos.length; i++) {
      const file = arquivos[i];
      const descricao = req.body[`descricao_foto_${i + 1}`] || "";

      // Converter buffer para base64
      const imagemBase64 = file.buffer.toString('base64');

      // Salvar diretamente na tabela com a base64
      await pool.query(
        `INSERT INTO imagens (id_director, imagem_base64, descricao) VALUES (?, ?, ?)`,
        [id_director, imagemBase64, descricao]
      );
    }

    res.status(200).json({ sucesso: true, mensagem: 'Imagens salvas na base de dados com sucesso!' });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao salvar as imagens na base de dados.' });
  }
});



// Ex: GET /api/imagens
router.get('/imagens', async (req, res) => {
  try {
    const [imagens] = await pool.query(`
      SELECT id, id_director, imagem_base64, descricao 
      FROM imagens
      ORDER BY id DESC
      LIMIT 20
    `);

    res.json(imagens);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar imagens' });
  }
});



// Rota GET /api/listar/directores
router.get('/listar/imagens', async (req, res) => {
  try {
    // Busca todos os usuários (diretores)
    const [usuarios] = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');

    // Para cada usuário, busca as imagens relacionadas a ele
    const directoresComImagens = await Promise.all(
      usuarios.map(async (diretor) => {
        const [imagens] = await pool.query(
          'SELECT imagem_base64, descricao FROM imagens WHERE id_director = ?',
          [diretor.id]
        );

        const fotos = imagens.map(img => ({
          base64: `data:image/jpeg;base64,${img.imagem_base64}`,
          descricao: img.descricao
        }));

        return {
          ...diretor,
          fotos
        };
      })
    );

    res.json(directoresComImagens);

  } catch (err) {
    console.error('Erro ao buscar directores:', err);
    res.status(500).json({ erro: "Erro ao buscar directores." });
  }
});


router.get('/imagens/:id', async (req, res) => {
  try {
    const [resultado] = await pool.query(
      `SELECT imagem_base64, descricao FROM imagens WHERE id = ?`,
      [req.params.id]
    );

    if (resultado.length === 0) {
      return res.status(404).json({ erro: 'Imagem não encontrada.' });
    }

    const { imagem_base64, descricao } = resultado[0];

    // Você pode devolver como um data URL (para exibir no <img src="...">)
    res.json({
      descricao,
      base64: imagem_base64,
      dataUrl: `data:image/jpeg;base64,${imagem_base64}`
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar imagem.' });
  }
});


// Rota GET /api/listar/directores
// Rota GET /api/listar/directores
router.get('/listar/directores', async (req, res) => {
  try {
    const [usuarios] = await pool.query('SELECT id, nome, cargo, biografia FROM usuarios ORDER BY id DESC');
    const [fotos] = await pool.query('SELECT id, id_director, imagem_base64 FROM imagens');

    const directoresComFotos = usuarios.map(dir => {
      const fotosDoDiretor = fotos
        .filter(f => f.id_director === dir.id)
        .map(f => `data:image/jpeg;base64,${f.imagem_base64}`); // monta o caminho base64 completo

      return {
        id: dir.id,
        nome: dir.nome,
        cargo: dir.cargo,
        biografia: dir.biografia,
        fotos: fotosDoDiretor
      };
    });
   
    res.json(directoresComFotos);

  } catch (err) {
    console.error('Erro ao buscar directores:', err);
    res.status(500).json({ erro: "Erro ao buscar directores." });
  }
});




// GET /api/directores/:id
// Buscar dados completos de 1 diretor
router.get('/directores/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar dados principais
    const [rows] = await pool.query("SELECT * FROM usuarios where id=?", [id]);
    if (rows.length === 0) return res.status(404).json({ erro: "Diretor não encontrado" });

    const diretor = rows[0];

    // Buscar dados relacionados
    const [idiomas] = await pool.query("SELECT idioma FROM idiomas WHERE id_director = ?", [id]);
    const [experiencias] = await pool.query("SELECT descricao FROM experiencias WHERE id_director = ?", [id]);
    const [qualificacoes] = await pool.query("SELECT descricao FROM qualificacoes_academicas WHERE id_director = ?", [id]);
    const [fotos] = await pool.query("SELECT id, imagem_base64, descricao FROM imagens WHERE id_director = ?", [id]);
    const [depoimentos] = await pool.query("SELECT nome, cargo, mensagem FROM depoimentos WHERE id_director = ?", [id]);
    const [premios] = await pool.query("SELECT titulo, descricao FROM premios WHERE id_director = ?", [id]);
    const [contactos] = await pool.query("SELECT telefone FROM contactos WHERE id_director = ?", [id]);

    // Montar objeto final
    diretor.idiomas = (idiomas || []).map(i => i.idioma);
    diretor.experiencias = (experiencias || []).map(e => e.descricao);
    diretor.qualificacoes_academica = (qualificacoes || []).map(q => q.descricao);
    diretor.fotos = fotos || [];
    diretor.depoimentos = depoimentos || [];
    diretor.premios = premios || [];
    diretor.contactos = contactos || [];

    res.json(diretor);

  } catch (erro) {
    console.error("Erro ao buscar diretor:", erro);
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







// Supondo que 'upload' já foi definido com: const upload = multer({ storage });

// 🔄 Atualiza imagens no banco — substituindo ou inserindo se não existir
router.put('/actualizar/novas-imagens', upload.array('imagens'), async (req, res) => {
  try {
    const { id_director } = req.body;
    const arquivos = req.files;

    if (!id_director || !arquivos || arquivos.length === 0) {
      return res.status(400).json({ erro: "ID do diretor ou imagens não fornecidos." });
    }

    for (let i = 0; i < arquivos.length; i++) {
      const file = arquivos[i];
      const descricao = req.body[`descricao_foto_${i + 1}`] || "";

      // Converter buffer para base64
      const imagemBase64 = file.buffer.toString('base64');

      // Verifica se já existe imagem com essa descrição para o diretor
      const [rows] = await pool.query(
        "SELECT id FROM imagens WHERE id_director = ? AND descricao = ?",
        [id_director, descricao]
      );

      if (rows.length > 0) {
        // Atualiza imagem e descrição
        await pool.query(
          `UPDATE imagens SET imagem_base64 = ?, descricao = ? WHERE id_director = ? AND id = ?`,
          [imagemBase64, descricao, id_director, rows[0].id]
        );
      } else {
        // Insere nova
        await pool.query(
          `INSERT INTO imagens (id_director, imagem_base64, descricao) VALUES (?, ?, ?)`,
          [id_director, imagemBase64, descricao]
        );
      }
    }

    res.status(200).json({ sucesso: true, mensagem: 'Imagens atualizadas com sucesso!' });

  } catch (erro) {
    console.error("❌ Erro ao atualizar imagens:", erro);
    res.status(500).json({ erro: 'Erro ao atualizar as imagens na base de dados.' });
  }
});

//rota para deletar a imagem selecionada
// ✅ ROTA PARA DELETAR IMAGEM POR ID
router.delete('/deletar/imagem/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Buscar o caminho da imagem no banco
    const [rows] = await pool.query("SELECT caminho FROM imagens WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Imagem não encontrada no banco de dados.' });
    }

    const caminhoRelativo = rows[0].caminho; // Ex: /uploads/37/imagem.jpg
    const caminhoAbsoluto = path.join(__dirname, '..','..' ,caminhoRelativo);

    // 2. Deletar arquivo físico se existir
    if (fs.existsSync(caminhoAbsoluto)) {
      fs.unlinkSync(caminhoAbsoluto);
      console.log('🗑️ Imagem removida da pasta uploads:', caminhoAbsoluto);
    } else {
      console.warn('⚠️ Arquivo não encontrado na pasta:', caminhoAbsoluto);
    }

    // 3. Remover registro do banco
    await pool.query("DELETE FROM imagens WHERE id = ?", [id]);

    res.json({ sucesso: true, mensagem: 'Imagem deletada com sucesso.' });

  } catch (err) {
    console.error('❌ Erro ao deletar imagem:', err);
    res.status(500).json({ erro: 'Erro interno ao deletar imagem.' });
  }
});


// ✅ DELETE /api/remover/imagens
router.delete('/remover/imagens', async (req, res) => {
  const { ids } = req.body; // espera: { ids: [12, 13, 14] }

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ erro: "Nenhuma imagem selecionada para remoção." });
  }

  try {
    // 1. Buscar caminhos das imagens no banco
    const [imagens] = await pool.query(
      `SELECT caminho FROM imagens WHERE id IN (${ids.map(() => '?').join(',')})`,
      ids
    );

    // 2. Remover arquivos do sistema
    for (const img of imagens) {
      const caminhoFisico = path.join(__dirname, '..', img.caminho);
      if (fs.existsSync(caminhoFisico)) {
        fs.unlinkSync(caminhoFisico);
        console.log('🗑️ Imagem deletada:', caminhoFisico);
      } else {
        console.warn('⚠️ Imagem não encontrada:', caminhoFisico);
      }
    }

    // 3. Remover do banco de dados
    await pool.query(
      `DELETE FROM imagens WHERE id IN (${ids.map(() => '?').join(',')})`,
      ids
    );

    res.json({ sucesso: true, mensagem: 'Imagens removidas com sucesso.' });

  } catch (error) {
    console.error('❌ Erro ao remover imagens:', error);
    res.status(500).json({ erro: "Erro interno ao remover imagens." });
  }
});




router.delete('/deletar/director/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Deletar dados relacionados
    await pool.query('DELETE FROM imagens WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM idiomas WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM experiencias WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM qualificacoes_academicas WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM contactos WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM premios WHERE id_director = ?', [id]);
    await pool.query('DELETE FROM depoimentos WHERE id_director = ?', [id]);

    // Deletar o usuário principal
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);

    res.json({ sucesso: true, mensagem: "Director e dados relacionados deletados com sucesso." });

  } catch (erro) {
    console.error("Erro ao deletar diretor:", erro); // Mostra o erro real no terminal
    res.status(500).json({ erro: "Erro ao deletar diretor e dados relacionados." });
  }
});





export default router;
