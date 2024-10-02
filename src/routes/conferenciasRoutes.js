import {Router} from "express";




import {
    createConferencias,
    getAllConferencias,
    updateConferencias,
    getConferenciasByParam,
    deleteConferencias,
} from "../controllers/conferenciasController.js"


const conferenciasRotas = Router();




conferenciasRotas.get('/', getAllConferencias);
conferenciasRotas.get('/:param', getConferenciasByParam)
conferenciasRotas.post('/', createConferencias)

conferenciasRotas.put('/:conferencia_id', updateConferencias)
conferenciasRotas.delete('/:conferencia_id', deleteConferencias)


export default conferenciasRotas;

