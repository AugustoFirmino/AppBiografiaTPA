// server.js



app.use(cors());
app.use(bodyParser.json());

app.use('/api/diretores', diretorRoutes);

import express from 'express';
import cors from 'cors';


import bodyParser from 'body-parser';
import diretorRoutes from './routes/directores.js';

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3001;



app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:'+PORT);
});
