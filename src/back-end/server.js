// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import diretorRoutes from './routes/directores.js';

import dotenv from 'dotenv';
dotenv.config(); // 👈 Obrigatório aqui também!

const PORT = process.env.PORT || 3001;

const app = express();


app.use(cors({
  
  origin: 'http://tpaonline-001-site2.ntempurl.com',
  credentials: true
}));
app.use(bodyParser.json());


app.use('/uploads', express.static('uploads')); // para servir fotos
app.use('/api', diretorRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

