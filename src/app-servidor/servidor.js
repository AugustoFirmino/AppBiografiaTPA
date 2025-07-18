import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3001;

//caminho da databse json para admin user
const USUARIOS_FILE = './usuarios.json';








const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("🔑 Chave OpenAI carregada:", process.env.OPENAI_API_KEY);
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
app.post('/upload', upload.single('imagem'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ message: 'Upload realizado com sucesso', imageUrl });
});


//cadastrando o director
app.post('/api/directores', upload.any(), (req, res) => {
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
app.get('/api/listar/directores', (req, res) => {
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
app.get('/api/directores/:id/imagens', (req, res) => {
  const id = req.params.id;
  const nome = req.query.nome?.replace(/\s+/g, '_');
  const dir = path.join(baseUploadDir, `${nome}-${id}`);

  if (!fs.existsSync(dir)) return res.json([]);

  const arquivos = fs.readdirSync(dir);
  const urls = arquivos.map(f => `/uploads/${nome}-${id}/${f}`);
  res.json(urls);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(USUARIOS_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ success: false, message: 'Erro ao ler usuários' });

    let usuarios = JSON.parse(data);
    const index = usuarios.findIndex(user => user.username === username && user.password === password);

    if (index !== -1) {
      // Atualiza estado de logado do usuário autenticado
      usuarios = usuarios.map((user, i) => ({
        ...user,
        logado: i === index // só o usuário logado recebe true
      }));

      fs.writeFile(USUARIOS_FILE, JSON.stringify(usuarios, null, 2), err => {
        if (err) return res.status(500).json({ success: false, message: 'Erro ao atualizar status de login' });

        return res.json({ success: true, message: 'Login efectuado com sucesso!' });
      });

    } else {
      return res.json({ success: false, message: 'Usuário ou senha inválidos' });
    }
  });
});


// ROTA DE LOGOUT — define logado: false para todos
app.post('/logout', (req, res) => {
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
app.get('/usuarios', (req, res) => {
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




app.post('/api/gerar-biografia', async (req, res) => {
  const dados = req.body;

  try {
    const prompt = `
Gere uma biografia em terceira pessoa, clara e formal, com base nas seguintes informações:

Nome: ${dados.name}
Nascimento: ${dados.nascimento}
Nacionalidade: ${dados.nacionalidade}
Ocupação: ${dados.ocupacao}
Cargo: ${dados.cargo}
Qualificações: ${dados.qualificacoes_academica?.join(', ')}
Experiências: ${dados.experiencias?.join(', ')}
Prémios: ${dados.premios?.join(', ')}
Idiomas: ${dados.idiomas?.join(', ')}

A biografia deve ter tom profissional e ser coesa.`;

    const completion = await openai.chat.completions.create({
     model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const texto = completion.choices[0].message.content;
    res.json({ biografia: texto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Falha ao gerar biografia com IA." });
  }
});

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(baseUploadDir));

app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:'+PORT);
});
