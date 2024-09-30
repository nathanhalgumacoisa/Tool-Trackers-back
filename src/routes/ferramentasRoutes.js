import {Router} from "express";




import {
    createFerramentas,
    getAllFerramentas,
    updateFerramentas,
    getFerramentasByParam,
    deleteFerramentas,
} from "../controllers/ferramentasController.js"


const ferramentasRotas = Router();




ferramentasRotas.get('/', getAllFerramentas);
ferramentasRotas.get('/:param', getFerramentasByParam)
ferramentasRotas.post('/', createFerramentas)
ferramentasRotas.put('/:localizacao_id', updateFerramentas)
ferramentasRotas.delete('/:localizacao_id', deleteFerramentas)


export default ferramentasRotas;
