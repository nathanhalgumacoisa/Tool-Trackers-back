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
ferramentasRotas.put('/:ferramenta_id', updateFerramentas)
ferramentasRotas.delete('/:ferramenta_id', deleteFerramentas)


export default ferramentasRotas;
