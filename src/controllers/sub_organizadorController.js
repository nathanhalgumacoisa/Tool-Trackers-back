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

app.post('/sub_organizador',async (req, res) => {
    try {
        const {organizador_id, nome_suborganizador, numero_suborganizador} = req.body;
        await pool.query('INSERT INTO sub_organizador (organizador_id, nome_suborganizador, numero_suborganizador) VALUES ($1, $2, $3)', [organizador_id, nome_suborganizador, numero_suborganizador]);
        res.status(201).send({mensagem: 'sub organizador criado com sucesso'});
    } catch (error) {
        console.error('Erro ao criar sub organizador', error);
        res.status(500).send('Erro ao criar sub organizador');
    }
});

app.put('/sub_organizador/:sub_organizador_id', async (req, res) => {
    try {
        const { sub_organizador_id } = req.params;
        const {organizador_id, nome_suborganizador, numero_suborganizador} = req.body;
        await pool.query('UPDATE sub_organizador SET organizador_id = $1, nome_suborganizador = $2, numero_suborganizador = $3 WHERE sub_organizador_id = $5', [sub_organizador_id, organizador_id, nome_suborganizador, numero_suborganizador]);
        res.status(200).send({mensagem: 'sub organizador atualizado com sucesso'})
    } catch (error) {
        console.error('Erro ao atualizar', error);
        res.status(500).send('Erro ao atualizar');
    }
});

app.delete('/sub_organizador/:sub_organizador_id', async (req, res) => {
    try {
        const { sub_organizador_id } = req.params;
        const resultado = await pool.query('DELETE FROM sub_organizador WHERE sub_organizador_id = $1', [sub_organizador_id]);
        if(resultado.rowCount > 0){
        res.status(200).send({mensagem: 'sub organizador deletado com sucesso'})
        }
    } catch (error) {
        console.error('Erro ao apagar sub organizador', error);
        res.status(500).send('Erro ao apagar o sub organizador');
    }
});