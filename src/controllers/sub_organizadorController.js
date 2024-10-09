import pool from "../config/dbConfig.js"

export async function getAllSub_organizador (req, res) {
    try {
        const result = await pool.query('SELECT * FROM sub_organizador;');
        res.json({
            total: result.rowCount,
            sub_organizador: result.rows
        });
    } catch (error) {
        console.error('Erro ao pegar sub_organizador', error);
        res.json({ error: error.message });
    }
};


export async function getSub_organizadorByParam(req, res) {
    const { param } = req.params;
    try {
        let result;
        if (isNaN(param)) {
            result = await pool.query(`
                SELECT so.*, i.*
                FROM sub_organizador so
                INNER JOIN imagens i ON so.sub_organizador_id = i.sub_organizador_id
                WHERE so.sub_organizador_id LIKE $1;
            `, [`%${param}%`]);
        } else {
            result = await pool.query(`
                SELECT so.*, i.*
                FROM sub_organizador so
                INNER JOIN imagens i ON so.sub_organizador_id = i.sub_organizador_id
                WHERE so.sub_organizador_id = $1;
            `, [param]);
        }

        res.json({
            total: result.rowCount,
            sub_organizador: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};

export async function createSub_organizador (req, res)  {
    try {
        const { organizador_id, nome_suborganizador, numero_suborganizador } = req.body;
        const result = await pool.query(
            'INSERT INTO sub_organizador (organizador_id, nome_suborganizador, numero_suborganizador) VALUES ($1, $2, $3) RETURNING *;',
            [organizador_id, nome_suborganizador, numero_suborganizador]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function updateSub_organizador (req, res) {
    const { sub_organizador_id } = req.params;
    const { organizador_id, nome_suborganizador, numero_suborganizador } = req.body;
    try {
        const result = await pool.query(
            'UPDATE sub_organizador SET organizador_id = $1, nome_suborganizador = $2, numero_suborganizador = $3 WHERE sub_organizador_id = $4 RETURNING *;',
            [ organizador_id, nome_suborganizador, numero_suborganizador, sub_organizador_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};

export async function deleteSub_organizador (req, res) {
    const { sub_organizador_id } = req.params;
    try {
        await pool.query('DELETE FROM sub_organizador WHERE sub_organizador_id = $1;', [sub_organizador_id]);
        res.json({ message: 'sub_organizador deletado com sucesso' });
    } catch (error) {
        console.error('Error ao apagar sub_organizador', error);
        res.json({ error: error.message });
    }
};
