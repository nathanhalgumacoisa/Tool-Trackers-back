const express = require('express');
const router = express.Router();
const imagensController = require('../controllers/imagensController');

router.get('/imagens', imagensController.getAllImagens);
router.post('/imagens', imagensController.createImagens);
router.delete('/imagens/:imagem_id', imagensController.updateImagens);
router.put('/imagens/:imagem_id', imagensController.createImagens);



