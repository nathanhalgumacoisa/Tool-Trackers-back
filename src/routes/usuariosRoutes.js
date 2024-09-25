const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/usuarios', usuariosController.getAllUsuarios);
router.get('/usuarios/:param', usuariosController.getUsuariosByParam)
router.post('/usuarios', usuariosController.createUsuarios)
router.put('/usuarios/:id', usuariosController.updateUsuarios)
router.delete('/usuarios/:id', usuariosController.deleteUsuarios)

module.exports = router;