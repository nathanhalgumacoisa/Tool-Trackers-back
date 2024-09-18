const express = require('express');

const app = express();
const port = process.env.PORT || 3003; 
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor funfando na porta ${port}🛠🔧`);
});