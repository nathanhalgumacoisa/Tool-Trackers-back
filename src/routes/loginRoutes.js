

import {Router} from "express";

import {
    getItems,
} from "../controllers/loginController.js"


const loginRotas = Router();

loginRotas.get('/', getItems);

export default loginRotas;