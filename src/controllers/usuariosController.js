import pool from "../config/dbConfig.js"

export async function getAllUsuarios (req, res) {
    try {
        const result = await pool.query('SELECT * FROM usuarios;');
        res.json({
            total: result.rowCount,
            usuarios: result.rows
        });
    } catch (error) {
        console.error('Erro ao pegar usuarios', error);
        res.json({ error: error.message });
    }
};


export async function getUsuariosByParam (req, res) {
    const { param } = req.params;
    try {
        let result;
        if (isNaN(param)) {
 N-teste2
            result = await pool.query('SELECT * FROM usuarios WHERE usuario_id LIKE $1;', [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM usuarios WHERE usuario_id = $1;', [param]);
        }
        
        res.json({
            total: result.rowCount,
            usuarios: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};

export async function createUsuarios (req, res)  {
    try {
        const { nome, email, numero_nif, numero_qrcode, tipo_usuario } = req.body;
        const result = await pool.query(
            'INSERT INTO usuarios (nome, email, numero_nif, numero_qrcode, tipo_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
            [nome, numero_nif, numero_qrcode, tipo_usuario]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function updateUsuarios (req, res) {
    const { user_id } = req.params;
    const { nome, email, numero_nif, numero_qrcode, tipo_usuario } = req.body;
    try {
        const result = await pool.query(
            'UPDATE usuarios SET nome = $1, SET email = $2, numero_nif = $3, numero_qrcode = $4, tipo_usuario = $5 WHERE user_id = $6 RETURNING *;',
            [ nome, email, numero_nif, numero_qrcode, tipo_usuario, user_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};

export async function deleteUsuarios (req, res) {
    const { user_id } = req.params;
    try {
        await pool.query('DELETE FROM usuarios WHERE user_id = $1;', [user_id]);
        res.json({ message: 'usuario deletado com sucesso' });
    } catch (error) {
        console.error('Error ao apagar usuario', error);
        res.json({ error: error.message });
    }
};
