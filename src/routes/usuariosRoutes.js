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
usuariosRotas.put('/usuarios/:user_id/status', updateUserStatus);

export default usuariosRotas;

