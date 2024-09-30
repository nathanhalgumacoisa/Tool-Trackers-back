import {Router} from "express";




import {
    createImagens,
    getAllImagens,
    updateImagens,
    getImagensByParam,
    deleteImagens,
} from "../controllers/imagensController.js"


const imagensRotas = Router();




imagensRotas.get('/', getAllImagens);
imagensRotas.get('/:param', getImagensByParam)
imagensRotas.post('/', createImagens)
imagensRotas.put('/:localizacao_id', updateImagens)
imagensRotas.delete('/:localizacao_id', deleteImagens)


export default imagensRotas;
