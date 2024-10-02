
import {Router} from "express";
import usuariosRouter from "./usuariosRoutes.js";
import organizadorRouter from "./organizadorRoutes.js";
import sub_organizadorRouter from "./sub_organizadorRoutes.js";
import imagensRouter from "./imagensRoutes.js";
import localizacoesRouter from "./localizacoesRoutes.js";
import ferramentasRouter from "./ferramentasRoutes.js";
import emprestimosRouter from "./emprestimosRoutes.js";
import conferenciasRouter from "./conferenciasRoutes.js";
import observacoesRouter from "./observacoesRoutes.js";
import log_ferramentasRouter from "./log_ferramentasRoutes.js";






const rotas = Router();


rotas.get("/", (req, res) => {
    res.status(200).send({message: "Servidor rodando perfeitamente"});
});


rotas.use("/usuarios", usuariosRouter);
rotas.use("/organizador", organizadorRouter);
rotas.use("/sub_organizador", sub_organizadorRouter);
rotas.use("/imagens", imagensRouter);
rotas.use("/localizacoes", localizacoesRouter);
rotas.use("/ferramentas", ferramentasRouter);
rotas.use("/emprestimos", emprestimosRouter);
rotas.use("/conferencias", conferenciasRouter);
rotas.use("/observacoes", observacoesRouter);
rotas.use("/log_ferramentas", log_ferramentasRouter);


export {rotas} ;
