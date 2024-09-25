const pool = require('../config/dbConfig')
const express = require('express');
const app = express();
app.use(express.json());

// Tipos permitidos
const tiposPermitidos = ['aluno', 'instrutor', 'administração', 'manutenção'];

// Buscar todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios;');
        res.json({
            total: result.rowCount,
            usuarios: result.rows
        });
    } catch (error) {
        console.error('Erro ao buscar usuários', error);
        res.status(500).json({ error: error.message });
    }
});

// Buscar usuário por parâmetro (nome ou ID)
app.get('/usuarios/:param', async (req, res) => {
    const { param } = req.params;
    try {
        if (isNaN(param)) {
            const result = await pool.query('SELECT * FROM usuarios WHERE nome ILIKE $1', [`%${param}%;`]);
            res.json({
                total: result.rowCount,
                usuarios: result.rows
            });
        } else {
            const result = await pool.query('SELECT * FROM usuarios WHERE usuario_id = $1;', [param]);
            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao executar a consulta', error);
        res.status(500).json({ error: error.message });
    }
});


// Criar um novo usuário
app.post('/usuarios', async (req, res) => {
    const { nome, numero_nif, numero_qrcode, tipo_usuario } = req.body;

// Validação do tipo_usuario
if (!tiposPermitidos.includes(tipo_usuario)) {
    return res.status(400).json({ error: 'Tipo inválido. Opções permitidas: aluno, instrutor, administração, manutenção.' });
}

    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nome, numero_nif, numero_qrcode, tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING *;',
            [nome, numero_nif, numero_qrcode, tipo_usuario]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao criar usuário', error);
        res.status(500).json({ error: error.message });
    }
});

// Atualizar um usuário existente
app.put('/usuarios/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    const { nome, numero_nif, numero_qrcode, tipo_usuario } = req.body;

// Validação do tipo_usuario se fornecido
if (tipo_usuario && !tiposPermitidos.includes(tipo_usuario)) {
    return res.status(400).json({ error: 'Tipo inválido. Opções permitidas: aluno, instrutor, administração, manutenção.' });
}

    try {
        const result = await pool.query(
            'UPDATE usuarios SET nome = $1, numero_nif = $2, numero_qrcode = $3, tipo_usuario = $4 WHERE usuario_id = $5 RETURNING *;',
            [nome, numero_nif, numero_qrcode, tipo_usuario, usuario_id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar usuário', error);
        res.status(500).json({ error: error.message });
    }
});

// Deletar um usuário
app.delete('/usuarios/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE usuario_id = $1;', [usuario_id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao apagar usuário', error);
        res.status(500).json({ error: error.message });
    }
});

// Exportar o aplicativo para uso em outro arquivo
module.exports = app;