const express = require('express');
const router = express.Router();
const localizacoesController = require('../controllers/localizacoesController');



router.get('/localizacoes', localizacoesController.getAllLocalizacoes);
