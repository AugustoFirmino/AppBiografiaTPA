import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3001;
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

    const cadastro = {
      ...req.body,
      id,
      fotos,
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

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(baseUploadDir));

app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:'+PORT);
});
