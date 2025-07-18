// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import diretorRoutes from './routes/directores.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/diretores', diretorRoutes);

app.listen(3001, () => {
  console.log('Servidor em http://localhost:3001');
});


