import pool from "../config/dbConfig.js"


export async function getAllEmprestimos (req, res) {
    try {
        const result = await pool.query('SELECT * FROM emprestimos;');
        res.json({
            total: result.rowCount,
            emprestimos: result.rows
        });
    } catch (error) {
        console.error('Erro ao pegar emprestimos', error);
        res.json({ error: error.message });
    }
};




export async function getEmprestimosByParam (req, res) {
    const { param } = req.params;
    try {
        let result;
        if (isNaN(param)) {
            result = await pool.query('SELECT * FROM emprestimos WHERE emprestimos_id LIKE $1;', [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM emprestimos WHERE emprestimos = $1;', [param]);
        }
       
        res.json({
            total: result.rowCount,
            emprestimos: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function createEmprestimos (req, res)  {
    try {
        const { ferramenta_id, user_id, data_retorno, local_origem_id, local_destino_id} = req.body;
        const data_emprestimo = new Date()
        const result = await pool.query(
            'INSERT INTO emprestimos (ferramenta_id, user_id, data_emprestimo, data_retorno, local_origem_id, local_destino_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
            [ferramenta_id, user_id, data_emprestimo, data_retorno, local_origem_id, local_destino_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};




export async function updateEmprestimos (req, res) {
    
    try {
        const { emprestimo_id  } = req.params;
    const { ferramenta_id, user_id, data_retorno, local_origem_id, local_destino_id } = req.body;
    const data_emprestimo = new Date()
        const result = await pool.query(
            'UPDATE emprestimos SET ferramenta_id = $1, user_id = $2, data_emprestimo = $3, data_retorno = $4, local_origem_id = $5, local_destino_id = $6 WHERE emprestimo_id  = $7 RETURNING *;',
            [ferramenta_id, user_id, data_emprestimo, data_retorno, local_origem_id, local_destino_id, emprestimo_id ]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function deleteEmprestimos (req, res) {
    const { emprestimo_id } = req.params;
    try {
        await pool.query('DELETE FROM emprestimos WHERE emprestimo_id = $1;', [emprestimo_id]);
        res.json({ message: 'emprestimo deletada com sucesso' });
    } catch (error) {
        console.error('Error ao apagar emprestimo', error);
        res.json({ error: error.message });
    }
};
