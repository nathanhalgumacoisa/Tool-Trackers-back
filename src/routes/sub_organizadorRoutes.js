const express = require('express');
const router = express.Router();
const sub_organizadorController = require('../controllers/sub_organizadorController');

router.get('/sub_organizador', sub_organizadorController.getSub_organizador);
router.post('/sub_organizador', sub_organizadorController.postSub_organizador);
router.delete('/sub_organizador/:sub_organizador_id', sub_organizadorController.deleteSub_organizador);
router.put('/sub_organizador/:sub_organizador_id', sub_organizadorController.putSub_organizador);
router.get('/sub_organizador/:sub_organizador_id', sub_organizadorController.getSub_organizadorId);

module.exports = router;