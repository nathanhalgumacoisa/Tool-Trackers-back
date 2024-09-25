const pool = require('../config/dbConfig');

const express = require('express');
const app = express();


app.get('/localizacoes', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM localizacoes');
        res.json({
            total: resultado.rowCount,
            localizacoes: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter as localizacoes', error);
        res.status(500).send('Erro ao obter as localizacoes');
    }
});




app.post('/localizacoes', async (req, res) => {
    try {
      const { ambiente, organizador_id } = req.body;
     
      await pool.query('INSERT INTO localizacoes ( ambiente, organizador_id ) VALUES ($1, $2)', [ambiente, organizador_id]);
      res.status(201).send({ mensagem: 'localização adicionada com sucesso!OK'});
    } catch (error) {
      console.error('Erro ao adicionar localização:', error);
      res.status(500).send('Erro ao adicionar localização');
    }
  });




  app.delete('/localizacoes/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const resultado = await pool.query('DELETE FROM localizacoes WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'localização deletada com sucesso'})
    } catch (error) {
        console.error('Erro ao deletar localização', error);
        res.status(500).send('Erro ao deletar o localização');
    }
});