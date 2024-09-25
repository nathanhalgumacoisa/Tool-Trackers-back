const pool = require('../config/dbConfig')

async function getAllUsuarios(req, res) {
    try {
        const result = await pool.query('SELECT * FROM usuarios;');
        res.json({
            total: result.rowCount,
            usuarios: result.rows
        });

    } catch (error) {
        console.error('erro ao buscar usuarios', error);
        res.json({ error: error.message });
    }
}

async function getUsuariosByParam(req, res) {
    const { param } = req.params;
    try {
        if (isNaN(param)) {
            const result = await pool.query('SELECT * FROM usuarios WHERE nome Like $1', [`%${param}%`]);
            res.json({
                total: result.rowCount,
                usuarios: result.rows
            });
        } else {
            const result = await pool.query('SELECT * FROM usuarios WHERE usuario_id = $1', [param]);
            res.json({
                total: result.rowCount,
                usuarios: result.rows
            });
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}


async function createUsuarios(req, res) {
    const { nome, numero_nif, numero_qrcode, tipo } = req.body;

    try {
        const result = await pool.query('INSERT INTO usuarios ( nome, numero_nif, numero_qrcode, tipo) VALUES ($1, $2, $3, $4) RETURNING *', [nome, numero_nif, numero_qrcode, tipo]);
        res.json(result.rows[0]);

    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}


async function updateUsuarios(req, res) {
    const { usuario_id } = req.params;
    console.log(usuario_id);
    const { nome, numero_nif, numero_qrcode, tipo } = req.body;
    try {
        const result = await pool.query('UPDATE usuarios SET nome = $1, numero_nif = $2, numero_qrcode = $3, tipo = $4  WHERE usuario_id = $5 RETURNING *', [nome, numero_nif, numero_qrcode, tipo, usuario_id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro em atualizar usuario', error);
        res.json({ error: error.message });
    }
}



async function deleteUsuarios(req, res) {
    const { usuario_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE usuario_id = $1', [usuario_id]);
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('Error ao apagar usuário', error);
        res.json({ error: error.message });
    }
}

module.exports = { getAllUsuarios, createUsuarios, updateUsuarios, deleteUsuarios, getUsuariosByParam };