import pool from "../config/dbConfig.js"


export async function getAllLog_ferramentas (req, res) {
    try {
        const result = await pool.query('SELECT * FROM log_ferramentas;');
        res.json({
            total: result.rowCount,
            log_ferramentas: result.rows
        });
    } catch (error) {
        console.error('Erro ao pegar log_ferramentas', error);
        res.json({ error: error.message });
    }
};




export async function getLog_ferramentasByParam (req, res) {
    const { param } = req.params;
    try {
        let result;
        if (isNaN(param)) {

            result = await pool.query('SELECT * FROM log_ferramentas WHERE log_ferramentas LIKE $1;', [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM log_ferramentas WHERE log_ferramentas = $1;', [param]);

        }
       
        res.json({
            total: result.rowCount,
            log_ferramentas: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function createLog_ferramentas (req, res)  {
    try {
        const { ferramenta_id, nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id, data_atualizacao} = req.body;
        const result = await pool.query(
            'INSERT INTO log_ferramentas (ferramenta_id, nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id,  data_atualizacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;',
            [ferramenta_id, nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id,  data_atualizacao]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};




export async function updateLog_ferramentas (req, res) {
    const { log_ferramentas   } = req.params;
    console.log(log_ferramentas);
    
    const { ferramenta_id, nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id, data_atualizacao } = req.body;
    try {
        const result = await pool.query(
            'UPDATE log_ferramentas SET ferramenta_id = $1, nome = $2, imagem_url = $3, conjunto = $4, numero = $5, patrimonio = $6, modelo = $7, descricao = $8, disponivel = $9, conferido = $10, emprestado = $11, manutencao = $12, localizacao_id = $13,  data_atualizacao = $14 WHERE log_ferramentas = $15 RETURNING *;',
            [ferramenta_id, nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id, data_atualizacao, log_ferramentas ]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function deleteLog_ferramentas (req, res) {
    const { ferramenta_id } = req.params;
    try {
        await pool.query('DELETE FROM log_ferramentas WHERE ferramenta_id = $1;', [ferramenta_id]);
        res.json({ message: 'ferramenta deletada com sucesso' });
    } catch (error) {
        console.error('Error ao apagar log_ferramentas', error);
        res.json({ error: error.message });
    }
};
