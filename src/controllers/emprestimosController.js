import pool from "../config/dbConfig.js"


export async function getAllEmprestimos(req, res) {
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




export async function getEmprestimosByParam(req, res) {
    const { param } = req.params;
    try {
        let result;
        if (isNaN(param)) {

            result = await pool.query('SELECT * FROM emprestimos WHERE emprestimo_id LIKE $1;', [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM emprestimos WHERE emprestimo_id = $1;', [param]);

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


export async function createEmprestimos(req, res) {
    const { ferramenta_id, user_id, data_retorno, local_origem_id, local_destino_id } = req.body;
    const data_emprestimo = new Date();

    try {
        // Verifique se a ferramenta está disponível
        const toolCheck = await pool.query('SELECT * FROM ferramentas WHERE ferramenta_id = $1 AND status = $2;', [ferramenta_id, 'disponível']);
        if (toolCheck.rowCount === 0) {
            return res.status(400).json({ message: 'Ferramenta não disponível para empréstimo.' });
        }

        const result = await pool.query(
            'INSERT INTO emprestimos (ferramenta_id, user_id, data_emprestimo, data_retorno, local_origem_id, local_destino_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
            [ferramenta_id, user_id, data_emprestimo, data_retorno, local_origem_id, local_destino_id]
        );

        // Atualize o status da ferramenta para "não disponível"
        await pool.query('UPDATE ferramentas SET status = $1 WHERE ferramenta_id = $2;', ['não disponível', ferramenta_id]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}




export async function updateEmprestimos(req, res) {

    try {
        const { emprestimo_id } = req.params;
        const { ferramenta_id, user_id, data_retorno, local_origem_id, local_destino_id } = req.body;
        const data_emprestimo = new Date()
        const result = await pool.query(
            'UPDATE emprestimos SET ferramenta_id = $1, user_id = $2, data_emprestimo = $3, data_retorno = $4, local_origem_id = $5, local_destino_id = $6 WHERE emprestimo_id  = $7 RETURNING *;',
            [ferramenta_id, user_id, data_emprestimo, data_retorno, local_origem_id, local_destino_id, emprestimo_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};

export async function devolverEmprestimo(req, res) {
    const { emprestimo_id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE emprestimos SET data_devolucao = NOW() WHERE emprestimo_id = $1 RETURNING *;',
            [emprestimo_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }

        res.json(result.rows[0]); // Retorna o empréstimo atualizado
    } catch (error) {
        console.error('Erro ao devolver empréstimo', error);
        res.status(500).json({ error: error.message });
    }
}


export async function deleteEmprestimos(req, res) {
    const { emprestimo_id } = req.params;
    try {
        await pool.query('DELETE FROM emprestimos WHERE emprestimo_id = $1;', [emprestimo_id]);
        res.json({ message: 'emprestimo deletada com sucesso' });
    } catch (error) {
        console.error('Error ao apagar emprestimo', error);
        res.json({ error: error.message });
    }
};
