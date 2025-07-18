// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import diretorRoutes from './routes/directores.js';

const PORT = process.env.PORT || 3001;

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use('/api/diretores', diretorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

