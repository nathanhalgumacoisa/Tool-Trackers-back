const express = require('express');
const router = express.Router();
const ferramentasController = require('../controllers/ferramentasController');



router.get('/ferramentas', ferramentasController.getAllFerramentas);
