const pool = require('../config/dbConfig');

app.get('/sub_organizador', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM sub_organizador');
        res.json({
            total: resultado.rowCount,
            sub_organizador: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todos os sub organizadores', error);
        res.status(500).send('Erro ao obter os sub organizadores');
    }
});

app.get('/sub_organizador/:sub_organizador_id', async(req, res) => {
    try {
        const { sub_organizador_id } = req. params;
        const resultado = await pool.query('SELECT * FROM sub_organizador WHERE sub_organizador_id = $1', [sub_organizador_id])
        if(resultado.rowCount == 0){
            res.status(404).send({mensagem: 'Id não encontrado'});
        }
        res.json({
            sub_organizador: resultado.rows[0],
        })
    } catch (error) {
        console.error('Erro ao pegar sub organizador por ID ', error);
        res.status(500).send('Erro ao pegar sub organizador por ID');
    }
});