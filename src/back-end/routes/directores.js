// routes/diretores.js
import express from 'express';
import { connection } from '../db.js';

const router = express.Router();

router.post('/', (req, res) => {
  const {
    name, link, idade, nacionalidade, ocupacao, nascimento, falecimento,
    cargo, biografia, qualificacoes_academica, experiencias, titulo,
    descricao, idiomas, email, contactos, redes_sociais, data_publicacao, depoimentos
  } = req.body;

  const sql = `
    INSERT INTO diretores (
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

export default router;
