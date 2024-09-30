import pool from "../config/dbConfig.js"


export async function getAllImagens (req, res) {
    try {
        const result = await pool.query('SELECT * FROM imagens;');
        res.json({
            total: result.rowCount,
            imagens: result.rows
        });
    } catch (error) {
        console.error('Erro ao pegar imagem', error);
        res.json({ error: error.message });
    }
};




export async function getImagensByParam (req, res) {
    const { param } = req.params;
    try {
        let result;
        if (isNaN(param)) {
            result = await pool.query('SELECT * FROM imagens WHERE categoria LIKE $1;', [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM imagens WHERE categoria = $1;', [param]);
        }
       
        res.json({
            total: result.rowCount,
            imagens: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function createImagens (req, res)  {
    try {
        const { url_imagem, descricao, sub_organizador_id} = req.body;
        const result = await pool.query(
            'INSERT INTO imagens (url_imagem, descricao, sub_organizador_id) VALUES ($1, $2, $3) RETURNING *;',
            [url_imagem, descricao, sub_organizador_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};




export async function updateImagens (req, res) {
    const { imagem_id  } = req.params;
    const { url_imagem, descricao, sub_organizador_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE imagens SET url_imagem = $1, descricao = $2, sub_organizador_id = $3 WHERE imagem_id  = $4 RETURNING ;*',
            [url_imagem , descricao, sub_organizador_id, imagem_id ]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function deleteImagens (req, res) {
    const { imagem_id } = req.params;
    try {
        await pool.query('DELETE FROM imagens WHERE imagem_id = $1;', [imagem_id]);
        res.json({ message: 'imagem deletada com sucesso' });
    } catch (error) {
        console.error('Error ao apagar imagem', error);
        res.json({ error: error.message });
    }
};
