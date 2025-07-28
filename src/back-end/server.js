// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import diretorRoutes from './routes/directores.js';

import dotenv from 'dotenv';
dotenv.config(); // 👈 Obrigatório aqui também!

const PORT = process.env.PORT || 3001;

const app = express();


const whitelist = [
  'http://localhost:5173',
  'http://tpaonline-001-site2.ntempurl.com',
  'https://appbiografiatpa.onrender.com'
];

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


app.use('/uploads', express.static('uploads')); // para servir fotos
app.use('/api', diretorRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

