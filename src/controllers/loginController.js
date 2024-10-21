import pool from "../config/dbConfig.js"


export async function getAllLogin (req, res) {
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



export async function verificate (req, res) {

    const { email, senha } = req.body;

    const user = await User.findOne({ email }).select('+senha');

    if (!user) {
        return res.status(400).send({ error: 'Usuario não encontrado' });
    }
    if(!await bcrypt.compare(senha, user.senha)){
        return res.status(400).send({ error: 'Senha invalida' });
    }

    res.send({ user });


}




