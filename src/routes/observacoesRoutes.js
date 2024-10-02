import {Router} from "express";


import {
    createObservacoes,
    getAllObservacoes,
    updateObservacoes,
    getObservacoesByParam,
    deleteObservacoes,
} from "../controllers/observacoesController.js"

const observacoesRotas = Router();
 

observacoesRotas.get('/', getAllObservacoes);
observacoesRotas.get('/:param', getObservacoesByParam)
observacoesRotas.post('/', createObservacoes)
observacoesRotas.put('/:observacao_id', updateObservacoes)
observacoesRotas.delete('/:observacao_id', deleteObservacoes)

export default observacoesRotas;