const pool = require('..config/dbConfig')
const { Pool } = require('pg')

async function getAllImages(req, res) {
   try { 
        const result = await pool.query('SELECT *, EXTRACT(YEAR FROM ano) AS ano FROM Images;');
        res.json({
            total : result.rowCount,
            images : result.rows
        });
    } catch (error) {
        console.error('erro ao pegar ')
    } 

}