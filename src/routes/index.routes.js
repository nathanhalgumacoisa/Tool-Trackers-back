import {Router} from "express";
import organizadorRouter from "./organizadorRoutes.js";

const rotas = Router();

rotas.get("/", (req, res) => {
    res.status(200).send({message: "Servidor rodando perfeitamente"});
});

rotas.use("/organizador", organizadorRouter);

export {rotas} ;