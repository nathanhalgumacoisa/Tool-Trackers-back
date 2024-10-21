import pool from "../config/dbConfig.js"


export async function getAllLogi (req, res) {
    try {
        const result = await pool.query('SELECT * FROM usuarios;');
        res.json({
            total: result.rowCount,
            login: result.rows
        });
    } catch (error) {
        console.error('Erro ao logar', error);
        res.json({ error: error.message });
    }
};

export async function getLoginById (req, res) {
    const { id } = req.body;

    try {
        let result;
        if (isNaN(param)) {
            result = await pool.query('SELECT * FROM login WHERE usuario_id LIKE $1;', [`%${id}%`]);
        } else {
            result = await pool.query('SELECT * FROM login WHERE usuario_id = $1;', [id]);
        }
       
        res.json({
            total: result.rowCount,
            login: result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }

   
}



export async function verificate (req, res) {

    const { email, numero_nif_qrcode } = req.body;

    const user = await user.email.findOne({ email }).select('+numero_nif_qrcode');

    if (!user, user.email) {
        return res.status(400).send({ error: 'Usuario não existe' });
    }
    if(!await bcrypt.compare(numero_nif_qrcode, user.numero_nif_qrcode)){
        return res.status(400).send({ error: 'senha invalida' });
    }

    res.send({ user });


}




