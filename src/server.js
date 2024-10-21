import express from "express";
import { rotas } from "./routes/index.routes.js"
import cors from 'cors'

const port = process.env.PORT || 3003; 

const app = express();
app.use(cors());
app.use(express.json());
app.use(rotas);



app.listen(port, () => {
  console.log(`Servidor funfando na porta ${port}🛠🔧`);
});