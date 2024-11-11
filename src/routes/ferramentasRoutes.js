import {Router} from "express";

import {
    createFerramentas,
    getAllFerramentas,
    updateFerramentas,
    getFerramentasByParam,
    deleteFerramentas,
    getFerramentasByFilters,
    updateDisponivelStatus
} from "../controllers/ferramentasController.js"

const ferramentasRotas = Router();

ferramentasRotas.get('/', getAllFerramentas);
ferramentasRotas.get('/:param', getFerramentasByParam)
ferramentasRotas.post('/', createFerramentas)
ferramentasRotas.put('/disponivel/:ferramenta_id', updateDisponivelStatus);
ferramentasRotas.put('/:ferramenta_id', updateFerramentas)
ferramentasRotas.delete('/:ferramenta_id', deleteFerramentas)
ferramentasRotas.get('/filtrar', getFerramentasByFilters)



export default ferramentasRotas;
