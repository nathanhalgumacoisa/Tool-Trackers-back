import {Router} from "express";


import {
    createSub_organizador,
    getAllSub_organizador,
    updateSub_organizador,
    getSub_organizadorByParam,
    deleteSub_organizador,
} from "../controllers/sub_organizadorController.js"

const sub_organizadorRotas = Router();


sub_organizadorRotas.get('/', getAllSub_organizador);
sub_organizadorRotas.get('/:param', getSub_organizadorByParam)
sub_organizadorRotas.post('/', createSub_organizador)
sub_organizadorRotas.put('/:localizacao_id', updateSub_organizador)
sub_organizadorRotas.delete('/:localizacao_id', deleteSub_organizador)

export default sub_organizadorRotas;