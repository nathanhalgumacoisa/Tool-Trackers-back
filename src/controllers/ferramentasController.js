const pool = require('../config/dbConfig');

const express = require('express');
const app = express();


app.get('/ferramentas', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM ferramentas');
        res.json({
            total: resultado.rowCount,
            ferramentas: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter as ferramentas', error);
        res.status(500).send('Erro ao obter as ferramentas');
    }
});



app.post('/ferramentas', async (req, res) => {
    try {
      const { nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao } = req.body;
     
      await pool.query('INSERT INTO ferramentas (nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao]);
      res.status(201).send({ mensagem: 'ferramenta adicionada com sucesso!OK'});
    } catch (error) {
      console.error('Erro ao adicionar ferramenta:', error);
      res.status(500).send('Erro ao adicionar ferramenta');
    }
  });





  app.delete('/ferramentas/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const resultado = await pool.query('DELETE FROM ferramentas WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'ferramenta deletado com sucesso'})
    } catch (error) {
        console.error('Erro ao deletar ferramenta', error);
        res.status(500).send('Erro ao deletar o ferramenta');
    }
});