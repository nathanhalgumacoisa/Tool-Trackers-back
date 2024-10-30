import pool from "../config/dbConfig.js";

export async function getAllUsuarios(req, res) {
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
}

export async function getUsuariosByParam(req, res) {
    const { param } = req.params;
    try {
        let result;
        if (isNaN(param)) {
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
}

export async function createUsuarios(req, res) {
    try {
        const { nome, email, numero_nif, numero_qrcode, tipo_usuario } = req.body;
        const result = await pool.query(
            'INSERT INTO usuarios (nome, email, numero_nif, numero_qrcode, tipo_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
            [nome, email, numero_nif, numero_qrcode, tipo_usuario]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

export async function updateUsuarios(req, res) {
    const { user_id } = req.params;
    const { nome, email, numero_nif, numero_qrcode, tipo_usuario } = req.body;
    try {
        const result = await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2, numero_nif = $3, numero_qrcode = $4, tipo_usuario = $5 WHERE user_id = $6 RETURNING *;',
            [nome, email, numero_nif, numero_qrcode, tipo_usuario, user_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

export async function deleteUsuarios(req, res) {
    const { user_id } = req.params;
    try {
        await pool.query('DELETE FROM usuarios WHERE user_id = $1;', [user_id]);
        res.json({ message: 'usuario deletado com sucesso' });
    } catch (error) {
        console.error('Error ao apagar usuario', error);
        res.json({ error: error.message });
    }
}

// Novo método para atualizar o status do usuário
export async function updateUserStatus(req, res) {
    const { user_id } = req.params; 
    const { ativo } = req.body; 

    try {
        // Atualiza apenas o campo 'ativo', mantendo os outros campos inalterados
        const result = await pool.query(
            'UPDATE usuarios SET ativo = $1 WHERE user_id = $2 RETURNING *;',
            [ativo, user_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json(result.rows[0]); // Retorna o usuário atualizado
    } catch (error) {
        console.error('Erro ao atualizar status do usuário', error);
        res.status(500).json({ error: error.message });
    }
}