const pool = require('../config/dbConfig')

async function getAllOrganizadores(req, res) {
    try {
        const result = await pool.query('SELECT * FROM organizador;');
        res.json({
            total : result.rowCount,
            organizador : result.rows
        });
    } catch (error) {
        console.error('erro ao pegar organizador', error);
        res.json({ error: error.message });
    }
}

// async function getAllMoviesByProductor(req, res) {

//     try {
//         const { produtor_id } = req.params;
//         const { rows } = await pool.query(
//             `SELECT 
//                 produtores.produtor_id,
//                 produtores.nome AS nome_produtor,
//                 organizador.titulo,
//                 organizador.ano,
//                 organizador.sinopse
//              FROM 
//                 organizador
//              INNER JOIN 
//                 produtores ON organizador.produtor_id = produtores.produtor_id
//              WHERE 
//                 organizador.produtor_id = $1`,
//             [produtor_id]
//         );


//         res.status(200).send({
//             message: "organizador encontrados com sucesso!",
//             produtores: rows,
//         });
//     } catch (error) {
//         console.error("Erro ao buscar organizador", error);
//         res.status(500).send("Erro ao buscar organizador");
//     }

// }



async function getOrganizadorByParam(req, res) {
    const { param } = req.params;
    try {
        if (isNaN(param)) {
            const result = await pool.query('SELECT * FROM organizador WHERE categoria Like $1', [`%${param}%`]);
            res.json({
                total : result.rowCount,
                organizador : result.rows
            });
        } else if (isNaN(param)){
            const result = await pool.query('SELECT * FROM organizador WHERE categoria Like $1', [`%${param}%`]);
            res.json({
                total : result.rowCount,
                organizador : result.rows
            });
        } else {
            const result = await pool.query('SELECT * FROM organizador WHERE categoria  = $1', [param]);
            res.json({  
                total : result.rowCount,
                organizador : result.rows
            });
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

app.post('/organizador', async (req, res) => {
    try {
    const { nome_organizador, numero_organizador } = req.body;
{
        const result = await pool.query('INSERT INTO organizador (  nome_organizador, numero_organizador) VALUES ($1, $2) RETURNING *', [nome_organizador, numero_organizador]);
        res.json(result.rows[0]);

    } 
   } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
})



async function updateOrganizador(req, res) {
    const { organizador_id } = req.params;
    const { nome_organizador, numero_organizador } = req.body;
    try {
        const result = await pool.query('UPDATE organizador SET nome_organizador = $1, numero_organizador = $2  WHERE organizador_id = $3 RETURNING *', [ nome_organizador, numero_organizador, organizador_id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}



async function deleteOrganizador(req, res) {
    const { organizador_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM organizador WHERE organizador_id = $1', [organizador_id]);
        res.json({ message: 'filme deletado com sucesso' });
    } catch (error) {
        console.error('Error ao apagar filme', error);
        res.json({ error: error.message });
    }
}

module.exports = { getAllOrganizadores,  getOrganizadorByParam, createOrganizador, updateOrganizador, deleteOrganizador };