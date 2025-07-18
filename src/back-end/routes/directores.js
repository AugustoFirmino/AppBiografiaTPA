// routes/diretores.js
import express from 'express';

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';


import { connection } from '../db.js';



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

  connection.query(sql, [
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



//caminho da databse json para admin user
const USUARIOS_FILE = './usuarios.json';









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
  destination: function (req, file, cb) {
    cb(null, tempUploadDir); // armazena provisoriamente
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Rota para upload de imagem individual
router.post('/upload', upload.single('imagem'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ message: 'Upload realizado com sucesso', imageUrl });
});


//cadastrando o director
router.post('/api/directores', upload.any(), (req, res) => {
  try {
    const dadosPath = path.join(process.cwd(), 'dados.json');
    let dados = [];

    if (fs.existsSync(dadosPath)) {
      try {
        dados = JSON.parse(fs.readFileSync(dadosPath, 'utf-8'));
      } catch {
        dados = [];
      }
    }

    // Gere ID único
    let ultimoId = 0;
    if (dados.length > 0) {
      const ids = dados.map(d => parseInt(d.id)).filter(n => !isNaN(n));
      ultimoId = Math.max(...ids);
    }
    const id = ultimoId + 1;

    const nome = (req.body.name || 'sem_nome').replace(/\s+/g, '_');
    const pasta = `${nome}-${id}`;
    const destinoFinal = path.join(baseUploadDir, pasta);
    fs.mkdirSync(destinoFinal, { recursive: true });

    // Mover os arquivos do temp para a pasta definitiva
    const fotos = req.files.map(file => {
      const novoCaminho = path.join(destinoFinal, file.filename);
      fs.renameSync(file.path, novoCaminho);
      return path.join('uploads', pasta, file.filename);
    });

    
  // Parseia depoimentos
let depoimentos = [];
try {
  if (req.body.depoimentos) {
    depoimentos = JSON.parse(req.body.depoimentos);
  }
} catch (e) {
  console.warn('Erro ao parsear depoimentos:', e.message);
}

// Cria objeto de cadastro
const cadastro = {
  ...req.body,
  id,
  fotos,
  depoimentos, // agora é array de objetos, não string
  data_cadastro: new Date().toISOString()
};


    dados.push(cadastro);
    fs.writeFileSync(dadosPath, JSON.stringify(dados, null, 2));

    res.status(201).json({ message: 'Diretor cadastrado com sucesso', data: cadastro });

  } catch (err) {
    console.error('ERRO AO CADASTRAR:', err);
    res.status(500).json({ message: 'Erro interno ao cadastrar', error: err.message });
  }
});


// Rota para listar todos os directores
router.get('/api/listar/directores', (req, res) => {
  const dadosPath = path.join(process.cwd(), 'dados.json');
  if (!fs.existsSync(dadosPath)) {
    return res.json([]);
  }
  try {
    const dados = JSON.parse(fs.readFileSync(dadosPath, 'utf-8'));
    res.json(dados);
  } catch (e) {
    res.status(500).json({ message: 'Erro ao ler dados', error: e.message });
  }
});

// Listar imagens de um director
router.get('/api/directores/:id/imagens', (req, res) => {
  const id = req.params.id;
  const nome = req.query.nome?.replace(/\s+/g, '_');
  const dir = path.join(baseUploadDir, `${nome}-${id}`);

  if (!fs.existsSync(dir)) return res.json([]);

  const arquivos = fs.readdirSync(dir);
  const urls = arquivos.map(f => `/uploads/${nome}-${id}/${f}`);
  res.json(urls);
});

// Rota de login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios' });
  }

  // Verifica se usuário existe com essa senha
  const sqlSelect = `SELECT * FROM contas WHERE nome = ? AND psenha = ? LIMIT 1`;

  connection.query(sqlSelect, [username, password], (err, results) => {
    if (err) {
      console.error('Erro ao consultar usuários:', err);
      return res.status(500).json({ success: false, message: 'Erro ao acessar o banco de dados' });
    }

    if (results.length === 0) {
      return res.json({ success: false, message: 'Usuário ou senha inválidos' });
    }

    const usuarioLogado = results[0];

    // Zera logado em todos
    const sqlLogoutAll = `UPDATE usuarios SET logado = 0`;
    connection.query(sqlLogoutAll, (err) => {
      if (err) {
        console.error('Erro ao atualizar logado para todos:', err);
        return res.status(500).json({ success: false, message: 'Erro ao atualizar status de login' });
      }

      // Marca este como logado
      const sqlUpdateLogin = `UPDATE usuarios SET logado = 1 WHERE id = ?`;
      connection.query(sqlUpdateLogin, [usuarioLogado.id], (err) => {
        if (err) {
          console.error('Erro ao marcar usuário como logado:', err);
          return res.status(500).json({ success: false, message: 'Erro ao confirmar login' });
        }

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
      });
    });
  });
});


// ROTA DE LOGOUT — define logado: false para todos
router.post('/logout', (req, res) => {
  fs.readFile(USUARIOS_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Erro ao ler usuários' });

    let usuarios = JSON.parse(data);

    usuarios = usuarios.map(user => ({ ...user, logado: false }));

    fs.writeFile(USUARIOS_FILE, JSON.stringify(usuarios, null, 2), err => {
      if (err) return res.status(500).json({ message: 'Erro ao salvar logout' });
      res.json({ success: true, message: 'Logout realizado com sucesso' });
    });
  });
});


//  ROTA PARA LISTAR TODOS OS USUÁRIOS
router.get('/usuarios', (req, res) => {
  fs.readFile(USUARIOS_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Erro ao ler usuários' });

    try {
      const usuarios = JSON.parse(data);
      res.json(usuarios);
    } catch (e) {
      res.status(500).json({ message: 'Erro ao converter dados' });
    }
  });
});






// Servir arquivos estáticos da pasta uploads
router.use('/uploads', express.static(baseUploadDir));

export default router;
