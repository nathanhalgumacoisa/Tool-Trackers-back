import {Router} from "express";




import {
    createFerramentas,
    getAllFerramentas,
    updateFerramentas,
    getFerramentasByParam,
    deleteFerramentas,
    getFerramentasByFilters,
} from "../controllers/ferramentasController.js"


const ferramentasRotas = Router();




ferramentasRotas.get('/', getAllFerramentas);
ferramentasRotas.get('/:param', getFerramentasByParam)
ferramentasRotas.post('/', createFerramentas)
ferramentasRotas.put('/:ferramenta_id', updateFerramentas)
ferramentasRotas.delete('/:ferramenta_id', deleteFerramentas)
ferramentasRotas.get('/:filters', getFerramentasByFilters)


export default ferramentasRotas;
