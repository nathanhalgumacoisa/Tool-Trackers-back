import pool from "../config/dbConfig.js"


export async function getAllObservacoes (req, res) {
    try {
        const result = await pool.query('SELECT * FROM observacoes;');
        res.json({
            total: result.rowCount,
            observacoes: result.rows
        });
    } catch (error) {
        console.error('Erro ao pegar observacoes', error);
        res.json({ error: error.message });
    }
};




export async function getObservacoesByParam (req, res) {
    const { param } = req.params;
    try {
        let result;
        if (isNaN(param)) {
            result = await pool.query('SELECT * FROM observacoes WHERE observacao_id LIKE $1;', [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM observacoes WHERE observacao_id = $1;', [param]);
        }
       
        res.json({
            total: result.rowCount,
            observacoes: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function createObservacoes (req, res)  {
    try {
        const { conferencia_id, descricao, data_observacao} = req.body;
        const result = await pool.query(
            'INSERT INTO observacoes ( conferencia_id, descricao, data_observacao) VALUES ($1, $2, $3) RETURNING *;',
            [ conferencia_id, descricao, data_observacao]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};




export async function updateObservacoes (req, res) {
    const { observacao_id  } = req.params;
    const { conferencia_id, descricao, data_observacao } = req.body;
    try {
        const result = await pool.query(
            'UPDATE observacoes SET conferencia_id = $1, descricao = $2, data_observacao = $3 WHERE observacao_id = $4 RETURNING *;',
            [ conferencia_id, descricao, data_observacao, observacao_id ]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function deleteObservacoes (req, res) {
    const { observacao_id } = req.params;
    try {
        await pool.query('DELETE FROM observacoes WHERE observacao_id = $1;', [observacao_id]);
        res.json({ message: 'observacoes deletada com sucesso' });
    } catch (error) {
        console.error('Error ao apagar observacoes', error);
        res.json({ error: error.message });
    }
};

