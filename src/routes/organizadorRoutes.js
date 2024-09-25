import {Router} from "express";


import {
    createOrganizador,
    getAllOrganizadores,
    updateOrganizador,
    getOrganizadorByParam,
    deleteOrganizador,
} from "../controllers/organizadorController.js"

const organizadorRotas = Router();


organizadorRotas.get('/', getAllOrganizadores);
organizadorRotas.get('/:param', getOrganizadorByParam)
organizadorRotas.post('/', createOrganizador)
organizadorRotas.put('/:organizador_id', updateOrganizador)
organizadorRotas.delete('/:organizador_id', deleteOrganizador)

export default organizadorRotas;