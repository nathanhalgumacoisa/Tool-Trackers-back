//const pool = require('../config/dbConfig')
import pool from "../config/dbConfig.js"

export async function getAllOrganizadores (req, res) {
    try {
        const result = await pool.query('SELECT * FROM organizador;');
        res.json({
            total: result.rowCount,
            organizador: result.rows
        });
    } catch (error) {
        console.error('Erro ao pegar organizador', error);
        res.json({ error: error.message });
    }
};


export async function getOrganizadorByParam (req, res) {
    const { param } = req.params;
    try {
        let result;
        if (isNaN(param)) {
            result = await pool.query('SELECT * FROM organizador WHERE organizador_id LIKE $1;', [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM organizador WHERE organizador_id = $1;', [param]);
        }
        
        res.json({
            total: result.rowCount,
            organizador: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};

export async function createOrganizador (req, res)  {
    try {
        const { nome_organizador, numero_organizador } = req.body;
        const result = await pool.query(
            'INSERT INTO organizador (nome_organizador, numero_organizador) VALUES ($1, $2) RETURNING *;',
            [nome_organizador, numero_organizador]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function updateOrganizador (req, res) {
    const { organizador_id } = req.params;
    const { nome_organizador, numero_organizador } = req.body;
    try {
        const result = await pool.query(
            'UPDATE organizador SET nome_organizador = $1, numero_organizador = $2 WHERE organizador_id = $3 RETURNING *;',
            [nome_organizador, numero_organizador, organizador_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};

export async function deleteOrganizador (req, res) {
    const { organizador_id } = req.params;
    try {
        await pool.query('DELETE FROM organizador WHERE organizador_id = $1;', [organizador_id]);
        res.json({ message: 'Organizador deletado com sucesso' });
    } catch (error) {
        console.error('Error ao apagar organizador', error);
        res.json({ error: error.message });
    }
};

