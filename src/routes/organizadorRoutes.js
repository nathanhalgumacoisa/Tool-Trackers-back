const express = require('express');
const router = express.Router();
const organizadorController = require('../controllers/organizadorController');

router.get('/organizador', organizadorController.getAllOrganizadores);
router.get('/organizador/:param', organizadorController.getOrganizadorByParam)
router.post('/organizador', organizadorController.createOrganizador)
router.put('/organizador/:organizador_id', organizadorController.updateOrganizador)
router.delete('/organizador/:organizador_id', organizadorController.deleteOrganizador)

module.exports = router;