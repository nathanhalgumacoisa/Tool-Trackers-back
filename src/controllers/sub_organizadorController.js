const pool = require('../config/dbConfig');

async function getAllSub_organizador(req, res) {
    try {
        const result = await pool. query('SELECT * FROM sub_organizador');
        res.json({
            total : result.rowCount,
            sub_organizador : result.rows
        });
    } catch (error) {
        console.error('erro ao obter todos os sub organizadores', error);
        res.json({error: error.message});
    }
}