import pool from "../config/dbConfig.js"



export async function getAllLogin (req, res) {
    try {
        const matricula = await pool.query('SELECT * FROM usuarios;');
        res.json({
            total: matricula.rowCount,
            usuarios: matricula.rows
        });
    } catch (error) {
        console.error('Erro ao logar', error);
        res.json({ error: error.message });
    }
};

export async function getLoginByMatricula (req, res) {
    const { email } = req.body;

    try {
        let users;
        if (isNaN(email)) {
            users = await pool.query('SELECT * FROM usuarios WHERE email LIKE $1;', [`%${email}%`]);
        } else {
            users = await pool.query('SELECT * FROM usuarios WHERE email = $1;', [email]);
        }
       
        res.json({
            total: users.rowCount,
            usuarios: users.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    } 

   
}



// export async function verificate (req, res) {

//     const { nome, numero_nif, numero_qrcode } = req.body;

//     const user = await user.nome.findOne({ nome }).select('+numero_qrcode');

//     if (!user, user.nome) {
//         return res.status(400).send({ error: 'Usuario não existe' });
//     }
//     if(!await bcrypt.compare( user.numero_nif)){
//         return res.status(400).send({ error: 'nif invalida' });
//     }
//     if(!await bcrypt.compare( user.numero_qrcode)){
//         return res.status(400).send({ error: 'qrcode invalida' });
//     }

//     res.send({ user });


// }



