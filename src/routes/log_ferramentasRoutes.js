import {Router} from "express";




import {
    createLog_ferramentas,
    getAllLog_ferramentas,
    updateLog_ferramentas,
    getLog_ferramentasByParam,
    deleteLog_ferramentas,
} from "../controllers/log_ferramentasController.js"


const log_ferramentasRotas = Router();




log_ferramentasRotas.get('/', getAllLog_ferramentas);
log_ferramentasRotas.get('/:param', getLog_ferramentasByParam)
log_ferramentasRotas.post('/', createLog_ferramentas)

log_ferramentasRotas.put('/:ferramenta_id', updateLog_ferramentas)
log_ferramentasRotas.delete('/:ferramenta_id', deleteLog_ferramentas)


export default log_ferramentasRotas;
