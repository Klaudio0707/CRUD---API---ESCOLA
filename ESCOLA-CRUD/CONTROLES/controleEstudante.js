const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "mysql.railway.internal",
  user: "root",
  password: "utTguYwrLrUCLwhscFoJQTsXgrDFilwK",
  database: "railway"
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao MySQL");
});

// Rota para obter todos os estudantes
exports.getAllEstudantes = (req, res) => {
  db.query("SELECT * FROM estudantes", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Rota para criar um novo estudante
exports.createEstudantes = (req, res) => {
  const { nome, idade, primeiraNota, segundaNota, nomeProf, numeroSala } = req.body;
  const query = "INSERT INTO estudantes (nome, idade, primeiraNota, segundaNota, nomeProf, numeroSala) VALUES (?, ?, ?, ?, ?, ?)";
  
  db.query(query, [nome, idade, primeiraNota, segundaNota, nomeProf, numeroSala], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId });
  });
};

// Rota para atualizar um estudante existente
exports.updateEstudantes = (req, res) => {
  const { id } = req.params;
  const { nome, idade, primeiraNota, segundaNota, nomeProf, numeroSala } = req.body;
  const query = "UPDATE estudantes SET nome = ?, idade = ?, primeiraNota = ?, segundaNota = ?, nomeProf = ?, numeroSala = ? WHERE id = ?";
  
  db.query(query, [nome, idade, primeiraNota, segundaNota, nomeProf, numeroSala, id], (err) => {
    if (err) throw err;
    res.sendStatus(204);
  });
};

// Rota para deletar um estudante
exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM estudantes WHERE id = ?";
  
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.sendStatus(204);
  });
};
