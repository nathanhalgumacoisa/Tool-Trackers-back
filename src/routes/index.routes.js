import {Router} from "express";
import organizadorRouter from "./organizadorRoutes.js";
import localizacoesRouter from "./localizacoesRoutes.js";
import usuariosRouter from "./usuariosRoutes.js";
import sub_organizadorRouter from "./sub_organizadorRoutes.js";

const rotas = Router();

rotas.get("/", (req, res) => {
    res.status(200).send({message: "Servidor rodando perfeitamente"});
});

rotas.use("/organizador", organizadorRouter);
rotas.use("/localizacoes", localizacoesRouter);
rotas.use("/usuarios", usuariosRouter);
rotas.use("/sub_organizador", sub_organizadorRouter);

export {rotas} ;