import {Router} from "express";




import {
    createEmprestimos,
    getAllEmprestimos,
    updateEmprestimos,
    getEmprestimosByParam,
    deleteEmprestimos,
} from "../controllers/emprestimosController.js"


const emprestimoRotas = Router();




emprestimoRotas.get('/', getAllEmprestimos);
emprestimoRotas.get('/:param', getEmprestimosByParam)
emprestimoRotas.post('/', createEmprestimos)
emprestimoRotas.put('/:localizacao_id', updateEmprestimos)
emprestimoRotas.delete('/:localizacao_id', deleteEmprestimos)


export default emprestimoRotas;


