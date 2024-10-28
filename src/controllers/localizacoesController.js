import pool from "../config/dbConfig.js";

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

// export async function getAllLocalizacoesWithDetails(req, res) {
//     try {
//         const result = await pool.query(`
//                         SELECT 
//                 l.localizacao_id,
//                 l.ambiente,
//                 l.organizador_id,
//                 l.slug,
//                 o.organizador_id,
//                 o.nome_organizador,
//                 o.numero_organizador,
//                 so.sub_organizador_id,
//                 so.nome_suborganizador,
//                 so.numero_suborganizador,
//                 so.foto_url
//             FROM 
//                 localizacoes l
//             INNER JOIN 
//                 organizador o ON l.organizador_id = o.organizador_id
//             INNER JOIN 
//                 sub_organizador so ON o.organizador_id = so.organizador_id;`)
//         res.json({
//             total: result.rowCount,
//             localizacoes: result.rows
//         });
//     } catch (error) {
//         console.error('Erro ao pegar localizacoes com detalhes', error);
//         res.json({ error: error.message });
//     }
// };

export async function getLocalizacoesByParam(req, res) {
    const { param } = req.params;
    console.log(param);

    try {
        let result;
        if (isNaN(param)) {
            result = await pool.query(`SELECT 
//                 l.localizacao_id,
//                 l.ambiente,
//                 l.organizador_id,
//                 l.slug,
//                 o.organizador_id,
//                 o.nome_organizador,
//                 o.numero_organizador,
//                 so.sub_organizador_id,
//                 so.nome_suborganizador,
//                 so.numero_suborganizador,
//                 so.foto_url
//             FROM 
//                 localizacoes l
//             INNER JOIN 
//                 organizador o ON l.organizador_id = o.organizador_id
//             INNER JOIN 
//                 sub_organizador so ON o.organizador_id = so.organizador_id;`, [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM localizacoes WHERE slug = $1;', [param]);
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
    const { ambiente, organizador_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE localizacoes SET ambiente = $1, organizador_id = $2 WHERE localizacao_id = $3 RETURNING *;',
            [ambiente, organizador_id, localizacao_id]
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