const pool = require('../routes/localizacoesRoutes');


app.get('/localizacoes', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM localizacoes');
        res.json({
            total: resultado.rowCount,
            localizacoes: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todas as localizacoes', error);
        res.status(500).send('Erro ao obter as localizacoes');
    }
});