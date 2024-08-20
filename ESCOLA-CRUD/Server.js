const express = require("express");
const bodyParser = require("body-parser");
const controleEstudante = require("./CONTROLES/controleEstudante");
const app = express();

app.use(bodyParser.json());
app.use(express.static("publico"));

app.get("/api/estudantes", controleEstudante.getAllEstudantes);
app.post("/api/estudantes", controleEstudante.createEstudantes);
app.put("/api/estudantes/:id", controleEstudante.updateEstudantes);
app.delete("/api/estudantes/:id", controleEstudante.deleteEstudantes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log("Servidor Funcionando na porta" + `${PORT}`);


});