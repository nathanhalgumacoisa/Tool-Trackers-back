import pool from "../config/dbConfig.js"


export async function getAllFerramentas (req, res) {
    try {
        const result = await pool.query('SELECT * FROM ferramentas;');
        res.json({
            total: result.rowCount,
            ferramentas: result.rows
        });
    } catch (error) {
        console.error('Erro ao pegar ferramenta', error);
        res.json({ error: error.message });
    }
};




export async function getFerramentasByParam (req, res) {
    const { param } = req.params;
    try {
        let result;
        if (isNaN(param)) {
            result = await pool.query('SELECT * FROM ferramentas WHERE ferramenta_id LIKE $1;', [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM ferramentas WHERE ferramenta_id = $1;', [param]);
        }
       
        res.json({
            total: result.rowCount,
            ferramentas: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function createFerramentas (req, res)  {
    try {
        const { nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id} = req.body;
        const result = await pool.query(
            'INSERT INTO ferramentas (nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;',
            [nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};




export async function updateFerramentas (req, res) {
    const { ferramenta_id   } = req.params;
    const { nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE ferramentas SET nome = $1, imagem_url = $2, conjunto = $3, numero = $4, patrimonio = $5, modelo = $6, descricao = $7, disponivel = $8, conferido = $9, emprestado = $10, manutencao = $11, localizacao_id = $12 WHERE ferramenta_id  = $13 RETURNING ;*',
            [nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id, ferramenta_id ]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function deleteFerramentas (req, res) {
    const { ferramenta_id } = req.params;
    try {
        await pool.query('DELETE FROM ferramentas WHERE ferramenta_id = $1;', [ferramenta_id]);
        res.json({ message: 'ferramenta deletada com sucesso' });
    } catch (error) {
        console.error('Error ao apagar imagem', error);
        res.json({ error: error.message });
    }
};
