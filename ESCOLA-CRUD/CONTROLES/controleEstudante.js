const mysql = require("mysql2");

const db = mysql.createConnection({
host: "mysql.railway.internal",
user: "root",
password: "utTguYwrLrUCLwhscFoJQTsXgrDFilwK",
database: "railway"
});

db.connect(err => {
if(err) throw err;
console.log("conectado ao MySQL");
});

exports.getAllEstudantes = (req, res) => {
db.query("SELECT * FROM estudantes", (err, results) => {
if(err) throw err;
res.json(results);
});
};

exports.createEstudantes = (req, res) => {
const {nome, idade, primeiraNota, segundaNota, nomeProf, numeroSala } = req.body;
const query = "INSERTO INTO estudantes (nome, idade, primeiraNota, segundaNota, nomeProf, numeroSala"
db.query(query, [nome, idade, primeiraNota, segundaNota, nomeProf, numeroSala], (err, result) => {
if(err) throw err;
res.status(201).json({ id: result.insertId});

});


};

exports.updateEstudantes = (req, res) => {
const { id } = req.params;
const {nome, idade, primeiraNota, segundaNota, nomeProf, numeroSala } = req.body;
const query = "UPDATE estudantes SET name = ?, idade = ?, primeiraNota =?, segundaNota = ?, nomeProf = ?, numeroSala = ?";
db.query(query, [nome, idade, primeiraNota, segundaNota, nomeProf, numeroSala, id], (err) => {
if (err) throw err;
res.sendStatus(204);


});


};
exports.deleteStudent = (req, res) => {
const { id }
 = req.params;
 const query = "DELETE FROM estudantes WHERE id = ?";
 db.query(query, [id], (err) => {
if (err) throw err;
res.sendStatus(204);


 });

};

