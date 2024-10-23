import {Router} from "express";




import {
    getLoginByMatricula,
    getAllLogin,
   
} from "../controllers/loginController.js"


const loginRotas = Router();




loginRotas.get('/', getAllLogin);
loginRotas.post('/matricula', getLoginByMatricula)




export default loginRotas;
