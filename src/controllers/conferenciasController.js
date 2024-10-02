import pool from "../config/dbConfig.js"


export async function getAllConferencias (req, res) {
    try {
        const result = await pool.query('SELECT * FROM conferencias;');
        res.json({
            total: result.rowCount,
            conferencias: result.rows
        });
    } catch (error) {
        console.error('Erro ao pegar conferencias', error);
        res.json({ error: error.message });
    }
};




export async function getConferenciasByParam (req, res) {
    const { param } = req.params;
    try {
        let result;
        if (isNaN(param)) {
            result = await pool.query('SELECT * FROM conferencias WHERE conferencia_id LIKE $1;', [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM conferencias WHERE conferencia_id = $1;', [param]);
        }
       
        res.json({
            total: result.rowCount,
            conferencias: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function createConferencias (req, res)  {
    try {
        const { user_id, localizacao_id, data_conferencia} = req.body;
        const result = await pool.query(
            'INSERT INTO conferencias (user_id, localizacao_id, data_conferencia) VALUES ($1, $2, $3) RETURNING *;',
            [user_id, localizacao_id, data_conferencia]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};




export async function updateConferencias (req, res) {
    const { conferencia_id  } = req.params;
    const { user_id, localizacao_id, data_conferencia } = req.body;
    try {
        const result = await pool.query(
            'UPDATE conferencias SET user_id = $1, localizacao_id = $2, data_conferencia = $3 WHERE conferencia_id = $4 RETURNING *;',
            [user_id, localizacao_id, data_conferencia, conferencia_id ]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function deleteConferencias (req, res) {
    const { conferencia_id } = req.params;
    try {
        await pool.query('DELETE FROM conferencias WHERE conferencia_id = $1;', [conferencia_id]);
        res.json({ message: 'conferencia deletada com sucesso' });
    } catch (error) {
        console.error('Error ao apagar conferencia', error);
        res.json({ error: error.message });
    }
};
