import express from "express";
import cors from 'cors'
import rotas from "./routes/index.routes.js"

const port = process.env.PORT || 3003; 

const app = express();
app.use(cors())
app.use(express.json());
app.use(rotas);

app.listen(port, () => {
  console.log(`Servidor funfando na porta ${port}🛠🔧`);
});