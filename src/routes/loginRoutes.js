import {Router} from "express";




import {
    verificate,
    getAllLogin,
   
} from "../controllers/loginController.js"


const loginRotas = Router();




loginRotas.get('/', getAllLogin);
loginRotas.post('/', verificate)




export default loginRotas;
