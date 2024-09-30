import {Router} from "express";




import {
    createUsuarios,
    getAllUsuarios,
    updateUsuarios,
    getUsuariosByParam,
    deleteUsuarios,
} from "../controllers/usuariosController.js"


const usuariosRotas = Router();




usuariosRotas.get('/', getAllUsuarios);
usuariosRotas.get('/:param', getUsuariosByParam)
usuariosRotas.post('/', createUsuarios)
usuariosRotas.put('/:localizacao_id', updateUsuarios)
usuariosRotas.delete('/:localizacao_id', deleteUsuarios)


export default usuariosRotas;


