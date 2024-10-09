import {Router} from "express";


import {
    createLocalizacoes,
    getAllLocalizacoes,
    updateLocalizacoes,
    getLocalizacoesByParam,
    deleteLocalizacoes,
} from "../controllers/localizacoesController.js"

const localizacoesRotas = Router();


localizacoesRotas.get('/', getAllLocalizacoes);
localizacoesRotas.get('/lista/:param', getLocalizacoesByParam)
localizacoesRotas.post('/', createLocalizacoes)
localizacoesRotas.put('/:localizacao_id', updateLocalizacoes)
localizacoesRotas.delete('/:localizacao_id', deleteLocalizacoes)

export default localizacoesRotas;