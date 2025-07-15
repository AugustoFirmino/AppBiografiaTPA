

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const app = express();
app.use(cors());
app.use(express.json());

// Configuração do multer para uploads
// Caminho absoluto para a pasta uploads dentro de src/app-servidor (compatível ES module)
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Rota para upload de imagens
app.post('/upload', upload.single('imagem'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }
  // Caminho relativo para uso no front-end
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ message: 'Upload realizado com sucesso', imageUrl });
});



// Rota para cadastro de directores (dados + fotos)
app.post('/api/directores', upload.any(), (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILES:', req.files);
    const dadosPath = path.join(process.cwd(), 'dados.json');
    let dados = [];
    if (fs.existsSync(dadosPath)) {
      try {
        dados = JSON.parse(fs.readFileSync(dadosPath, 'utf-8'));
      } catch (e) { dados = []; }
    }
    // Monta objeto do cadastro
    const fotos = req.files ? req.files.filter(f => f.fieldname === 'fotos').map(f => f.filename) : [];
    const cadastro = {
      ...req.body,
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



// Rota para listar todos os directores cadastrados
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
// 
// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(uploadDir));

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:' + 3001);
});
