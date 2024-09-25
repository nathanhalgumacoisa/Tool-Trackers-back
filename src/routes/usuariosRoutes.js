import { Router } from "express";

import {
  getAllUsuarios,
  getUsuariosByParam,
  createUsuarios,
  updateUsuarios,
  deleteUsuarios,
} from "../controllers/usuariosController";

const usersRouter = Router();

// Tipos permitidos
const tiposPermitidos = ['aluno', 'instrutor', 'administração', 'manutenção'];

// Middleware para validação do tipo de usuário
const validateUserType = (req, res, next) => {
  const { tipo_usuario } = req.body;
  if (tipo_usuario && !tiposPermitidos.includes(tipo_usuario)) {
    return res.status(400).json({
      error: 'Tipo inválido. Opções permitidas: aluno, instrutor, administração, manutenção.',
    });
  }
  next();
};

// Rotas
usersRouter.get("/", getAllUsuarios);
usersRouter.get("/:param", getUsuariosByParam);
usersRouter.post("/", validateUserType, createUsuarios);
usersRouter.put("/:id", validateUserType, updateUsuarios);
usersRouter.delete("/:id", deleteUsuarios);

export default usersRouter;