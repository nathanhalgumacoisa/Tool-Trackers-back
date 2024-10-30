import {Router} from "express";
import {
    createUsuarios,
    getAllUsuarios,
    updateUsuarios,
    getUsuariosByParam,
    deleteUsuarios,
    updateUserStatus
} from "../controllers/usuariosController.js"


const usuariosRotas = Router();

usuariosRotas.get('/', getAllUsuarios);
usuariosRotas.get('/:param', getUsuariosByParam)
usuariosRotas.post('/', createUsuarios)
usuariosRotas.put('/:user_id', updateUsuarios)
usuariosRotas.delete('/:user_id', deleteUsuarios)
usuariosRotas.put('/user/:user_id', updateUserStatus);

export default usuariosRotas;

