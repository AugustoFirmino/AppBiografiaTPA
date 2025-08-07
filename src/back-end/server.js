// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import diretorRoutes from './routes/directores.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config(); // 👈 Obrigatório aqui também!

const PORT = process.env.PORT || 3001;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const whitelist = [
  'http://localhost:5173',
  'http://tpaonline-001-site2.ntempurl.com',
  'https://appbiografiatpa.onrender.com'
];


// Caminho absoluto até a raiz do projeto (ex: /app)
const raizProjeto = path.join(__dirname, '..', '..','..', 'public', 'uploads');


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(bodyParser.json());



app.use('/api', diretorRoutes);

// ✅ Tornar /uploads acessível publicamente
app.use('/uploads', express.static(path.join(raizProjeto)));

app.get(/^\/(?!api|uploads).*/, (req, res) => {
  res.sendFile(path.join(raizProjeto, 'public', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

