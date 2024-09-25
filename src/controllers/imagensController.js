const pool = require('../config/dbConfig');


app.get('/imagens', async (req, res) => {
   try {
       const resultado = await pool.query('SELECT * FROM imagens');
       res.json({
        total: resultado.rowCount,
        imagens: resultado.rows,
       }); 
    } catch (error) {
        console.error('Erro ao obter todas as imagens', error);
        res.status(500).send('Erro ao obter as imagens')
    }
});

app.post('imagens', async(req, res) => {
    try {
        const {url_imagem, descricao, sub_organizador_id} = req.body;
        await pool.query('INSERT INTO imagens (url_imagem, descricao, sub_organizador_id) VALUES ($1, $2, $3)' , [url_imagem, descricao, sub_organizador_id]);
        res.status(201).send({mensagem: 'Imagem criada com sucesso'});
    } catch (error) {
        console.error('Erro ao criar imagem' , error); 
        res.status(500).send('Erro ao criar imagem'); 
    }
});

app.delete('imagens' , async(req, res) => {
    try {
        const { imagem_id } = req.params;
        const resultado = await pool.query('DELETE FROM imagens WHERE imagem_id = $1' , [imagem_id]);
        res.status(200).send({mensagem: 'imagem deletada com sucesso'})
    } catch (error) {
         console.error('Erro ao deletar imagem' , error);
         res.status(500).send('Erro ao deletar imagem');
    }
});

app.put('/imagens/:imagem_id' , async(req, res) => {
    try{
        const { imagem_id } = req.params;
        const { url_imagem, descricao, sub_organizador_id} = req.body;
        await pool.query('UPDATE imagens SET url_imagem = $1, descricao = $2, sub_organizador_id = $3, WHERE imagem_id  = $4', [url_imagem, descricao, sub_organizador_id])
        res.status(200).send({mensagem: 'imagem atualizada com sucesso'})
    } catch (error) {
        console.error('Erro ao atualizar imagem' , error);
        res.status(500).send('Erro ao atualizar imagem');
    }    
});

app.get('/imagens/:imagem_id', async(req, res) => {
    try {
        const { imagem_id } = req. params;
        const resultado = await pool.query('SELECT * FROM imagens WHERE imagem_id = $1', [imagem_id])
        if(resultado.rowCount == 0){
        res.status(404).send({mensagem: 'Id não encontrado'});
}  res.json({
    imagens: resultado.rows[0],
    }) 
} catch (error) {
    console.error('Erro ao pegar imagem por ID ', error);
    res.status(500).send('Erro ao pegar imagem por ID');
}
});