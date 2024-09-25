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
            result = await pool.query('SELECT * FROM usuarios WHERE categoria LIKE $1;', [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM usuarios WHERE categoria = $1;', [param]);
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
        const { nome, numero_nif, numero_qrcode, tipo_usuario } = req.body;
        const result = await pool.query(
            'INSERT INTO usuarios (nome, numero_nif, numero_qrcode, tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING *;',
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
    const { nome, numero_nif, numero_qrcode, tipo_usuario } = req.body;
    try {
        const result = await pool.query(
            'UPDATE usuarios SET nome = $1, numero_nif = $2, numero_qrcode = $3, tipo_usuario = $4 WHERE user_id = $5 RETURNING ;*',
            [ nome, numero_nif, numero_qrcode, tipo_usuario, user_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};

export async function deleteUsuarios (req, res) {
    const { organizador_id } = req.params;
    try {
        await pool.query('DELETE FROM usuarios WHERE user_id = $1;', [user_id]);
        res.json({ message: 'usuario deletado com sucesso' });
    } catch (error) {
        console.error('Error ao apagar usuario', error);
        res.json({ error: error.message });
    }
};
