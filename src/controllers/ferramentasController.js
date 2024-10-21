import pool from "../config/dbConfig.js"


export async function getAllFerramentas (req, res) {
    const {
        nome,
        conjunto,
        numero,
        patrimonio,
        modelo,
        disponivel,
        conferido,
        emprestado,
        manutencao,
        localizacao_id,
        data
    } = req.body;

    console.log("hahaha")
    console.log(data)

    console.log(nome,
        conjunto,
        numero,
        patrimonio,
        modelo,
        disponivel,
        conferido,
        emprestado,
        manutencao,
        localizacao_id)

    if (!nome && !conjunto && !numero && !patrimonio && !modelo && !disponivel && !conferido && !emprestado && !manutencao && !localizacao_id) {
        try {
            const result = await pool.query('SELECT * FROM ferramentas;');
            res.json({
                total: result.rowCount,
                ferramentas: result.rows
            });
        } catch (error) {
            console.error('Erro ao pegar ferramenta', error);
            res.json({ error: error.message });
        }
    } else {
        try {
            const filters = [];
            const values = [];
            let query = 'SELECT * FROM ferramentas WHERE 1=1'; // Começa com uma condição verdadeira
    
            console.log(nome,
                conjunto,
                numero,
                patrimonio,
                modelo,
                disponivel,
                conferido,
                emprestado,
                manutencao,
                localizacao_id)
    
            // Adiciona filtros dinamicamente
            if (nome) {
                filters.push(`nome ILIKE $${filters.length + 1}`);
                values.push(`%${nome}%`);
            }
            if (conjunto) {
                filters.push(`conjunto = $${filters.length + 1}`);
                values.push(conjunto);
            }
            if (numero) {
                filters.push(`numero = $${filters.length + 1}`);
                values.push(numero);
            }
            if (patrimonio) {
                filters.push(`patrimonio = $${filters.length + 1}`);
                values.push(patrimonio);
            }
            if (modelo) {
                filters.push(`modelo = $${filters.length + 1}`);
                values.push(modelo);
            }
            if (disponivel !== undefined) {
                filters.push(`disponivel = $${filters.length + 1}`);
                values.push(disponivel === 'true');
            }
            if (conferido !== undefined) {
                filters.push(`conferido = $${filters.length + 1}`);
                values.push(conferido === 'true');
            }
            if (emprestado !== undefined) {
                filters.push(`emprestado = $${filters.length + 1}`);
                values.push(emprestado === 'true');
            }
            if (manutencao !== undefined) {
                filters.push(`manutencao = $${filters.length + 1}`);
                values.push(manutencao === 'true');
            }
            if (localizacao_id) {
                filters.push(`localizacao_id = $${filters.length + 1}`);
                values.push(localizacao_id);
            }
    
            // Adiciona os filtros à consulta, se existirem
            if (filters.length > 0) {
                query += ' AND ' + filters.join(' AND ');
            }
    
            const result = await pool.query(query, values);
    
            res.json({
                total: result.rowCount,
                ferramentas: result.rows
            });
        } catch (error) {
            console.error('Error executing query', error);
            res.json({ error: error.message });
        }
    }
};




export async function getFerramentasByParam (req, res) {
    const { param } = req.params;
    
    console.log(param)

    try {
        let result;
        if (isNaN(param)) {
            result = await pool.query('SELECT * FROM ferramentas WHERE ferramenta_id LIKE $1;', [`%${param}%`]);
        } else {
            result = await pool.query('SELECT * FROM ferramentas WHERE ferramenta_id = $1;', [param]);
        }
       
        res.json({
            total: result.rowCount,
            ferramentas: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function createFerramentas (req, res)  {
    console.log("TEEEEESTE");
    
    try {
        const { nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacaoId} = req.body;
        console.log(nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacaoId);
        
        const result = await pool.query(
            'INSERT INTO ferramentas (nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;',
            [nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, "true", "false", "false", "false", localizacaoId]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};




export async function updateFerramentas (req, res) {
    const { ferramenta_id   } = req.params;
    const { nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE ferramentas SET nome = $1, imagem_url = $2, conjunto = $3, numero = $4, patrimonio = $5, modelo = $6, descricao = $7, disponivel = $8, conferido = $9, emprestado = $10, manutencao = $11, localizacao_id = $12 WHERE ferramenta_id  = $13 RETURNING *;',
            [nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, conferido, emprestado, manutencao, localizacao_id, ferramenta_id ]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};


export async function deleteFerramentas (req, res) {
    const { ferramenta_id } = req.params;
    try {
        await pool.query('DELETE FROM ferramentas WHERE ferramenta_id = $1;', [ferramenta_id]);
        res.json({ message: 'ferramenta deletada com sucesso' });
    } catch (error) {
        console.error('Error ao apagar imagem', error);
        res.json({ error: error.message });
    }
};


export async function getFerramentasByFilters(req, res) {
    const {
        nome,
        conjunto,
        numero,
        patrimonio,
        modelo,
        disponivel,
        conferido,
        emprestado,
        manutencao,
        localizacao_id
    } = req.query;

    try {
        const filters = [];
        const values = [];
        let query = 'SELECT * FROM ferramentas WHERE 1=1'; // Começa com uma condição verdadeira

        console.log(nome,
            conjunto,
            numero,
            patrimonio,
            modelo,
            disponivel,
            conferido,
            emprestado,
            manutencao,
            localizacao_id)

        // Adiciona filtros dinamicamente
        if (nome) {
            filters.push(`nome ILIKE $${filters.length + 1}`);
            values.push(`%${nome}%`);
        }
        
        if (primeiraLetra) {
            filters.push(`nome ILIKE $${filters.length + 1}`);
            values.push(`${primeiraLetra}%`); // Adiciona o wildcard após a primeira letra
        }

        if (conjunto) {
            filters.push(`conjunto = $${filters.length + 1}`);
            values.push(conjunto);
        }
        if (numero) {
            filters.push(`numero = $${filters.length + 1}`);
            values.push(numero);
        }
        if (patrimonio) {
            filters.push(`patrimonio = $${filters.length + 1}`);
            values.push(patrimonio);
        }
        if (modelo) {
            filters.push(`modelo = $${filters.length + 1}`);
            values.push(modelo);
        }
        if (disponivel !== undefined) {
            filters.push(`disponivel = $${filters.length + 1}`);
            values.push(disponivel === 'true');
        }
        if (conferido !== undefined) {
            filters.push(`conferido = $${filters.length + 1}`);
            values.push(conferido === 'true');
        }
        if (emprestado !== undefined) {
            filters.push(`emprestado = $${filters.length + 1}`);
            values.push(emprestado === 'true');
        }
        if (manutencao !== undefined) {
            filters.push(`manutencao = $${filters.length + 1}`);
            values.push(manutencao === 'true');
        }
        if (localizacao_id) {
            filters.push(`localizacao_id = $${filters.length + 1}`);
            values.push(localizacao_id);
        }

        // Adiciona os filtros à consulta, se existirem
        if (filters.length > 0) {
            query += ' AND ' + filters.join(' AND ');
        }

        const result = await pool.query(query, values);

        res.json({
            total: result.rowCount,
            ferramentas: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
};









import express from 'express';
const app = express();

// Rota para buscar ferramentas
app.get('/ferramentas', getFerramentasByFilters);
