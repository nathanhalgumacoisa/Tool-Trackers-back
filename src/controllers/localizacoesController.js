//const pool = require('../config/dbConfig')
import pool from "../config/dbConfig.js"

export async function getAllLocalizacoes(req, res) {    
    try {
        const result = await pool.query('SELECT * FROM localizacoes;');
        res.json({
            total: result.rowCount,
            localizacoes: result.rows
        });
    } catch (error) {
        console.error('Erro ao pegar localizacoes', error);
        res.json({ error: error.message });
    }
};


export async function getLocalizacoesByParam(req, res) {
    const { param } = req.params;
    console.log(param);

    const teste = "{" + param + "}";
    
   try {
    let result;
    if (isNaN(param)) {
        // Consulta com LIKE para buscar localizações e seus organizadores
        result = await pool.query(`
                SELECT 
                   l.ambiente AS nome_ambiente,
                   o.nome_organizador,
                   o.numero_organizador,
                   so.nome_suborganizador,
                   so.numero_suborganizador,
                   i.url_imagem,
                   i.descricao
                FROM 
                  localizacoes l
                INNER JOIN
                    organizador o ON l.organizador_id = o.organizador_id
                INNER JOIN
                    sub_organizador so ON o.organizador_id = so.organizador_id
                INNER JOIN
                    imagens i ON so.sub_organizador_id = i.sub_organizador_id;
            `);
    } else {
        // Consulta exata pelo slug
        result = await pool.query(`
                SELECT 
                   l.ambiente AS nome_ambiente,
                   o.nome_organizador,
                   o.numero_organizador,
                   so.nome_suborganizador,
                   so.numero_suborganizador,
                   i.url_imagem,
                   i.descricao
                FROM 
                  localizacoes l
                INNER JOIN
                    organizador o ON l.organizador_id = o.organizador_id
                INNER JOIN
                    sub_organizador so ON o.organizador_id = so.organizador_id
                INNER JOIN
                    imagens i ON so.sub_organizador_id = i.sub_organizador_id
               WHERE
                    l.ambiente ILIKE $1;       
            `, [param]);
    }

    res.json({
        total: result.rowCount,
        localizacoes: result.rows
    });
} catch (error) {
    console.error('Error executing query', error);
    res.json({ error: error.message });
}
};

export async function createLocalizacoes(req, res) {
    try {
        const { ambiente, organizador_id, slug } = req.body;
        const result = await pool.query(
            'INSERT INTO localizacoes (ambiente, organizador_id, slug) VALUES ($1, $2, $3) RETURNING *;',
            [ambiente, organizador_id, slug]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function updateLocalizacoes(req, res) {
    const { localizacao_id } = req.params;
    const { ambiente, organizador_id, slug } = req.body;
    try {
        const result = await pool.query(
            'UPDATE localizacoes SET ambiente = $1, organizador_id = $2, slug = $3 WHERE localizacao_id = $4 RETURNING *;',
            [ambiente, organizador_id,slug, localizacao_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};

export async function deleteLocalizacoes(req, res) {
    const { localizacao_id } = req.params;
    try {
        await pool.query('DELETE FROM localizacoes WHERE localizacao_id = $1;', [localizacao_id]);
        res.json({ message: 'localização deletada com sucesso' });
    } catch (error) {
        console.error('Error ao apagar localização', error);
        res.json({ error: error.message });
    }
};

