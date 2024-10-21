import {Router} from "express";




import {
    verificate,
    getAllLogin,
    updateLogin,
   
} from "../controllers/loginController.js"


const loginRotas = Router();




loginRotas.get('/', getAllLogin);
loginRotas.post('/', verificate)
loginRotas.put('/:login', updateLogin)



export default loginRotas;
