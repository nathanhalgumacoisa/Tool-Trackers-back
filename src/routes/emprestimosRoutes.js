import {Router} from "express";

import {
    createEmprestimos,
    getAllEmprestimos,
    updateEmprestimos,
    getEmprestimosByParam,
    deleteEmprestimos,
    devolverEmprestimo
} from "../controllers/emprestimosController.js"

const emprestimoRotas = Router();

emprestimoRotas.get('/', getAllEmprestimos);
emprestimoRotas.get('/:param', getEmprestimosByParam)
emprestimoRotas.post('/', createEmprestimos)
emprestimoRotas.put('/:emprestimo_id', updateEmprestimos)
emprestimoRotas.delete('/:emprestimo_id', deleteEmprestimos)
emprestimoRotas.put('/emprestimos/:emprestimo_id/devolver', devolverEmprestimo)

export default emprestimoRotas;

