import {Router} from "express";


import {
    createSub_organizador,
    getAllSub_organizador,
    updateSub_organizador,
    getSub_organizadorByParam,
    deleteSub_organizador,
} from "../controllers/sub_organizadorController.js"

const Sub_organizadorRotas = Router();


Sub_organizadorRotas.get('/', getAllSub_organizador);
Sub_organizadorRotas.get('/:param', getSub_organizadorByParam)
Sub_organizadorRotas.post('/', createSub_organizador)
Sub_organizadorRotas.put('/:localizacao_id', updateSub_organizador)
Sub_organizadorRotas.delete('/:localizacao_id', deleteSub_organizador)

export default Sub_organizadorRotas;