const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database(':memory:'); // Use um banco de dados em memória para desenvolvimento

// Criar a tabela de pacientes
db.serialize(() => {
    db.run(`CREATE TABLE pacientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        peso REAL NOT NULL,
        altura REAL NOT NULL,
        imc REAL NOT NULL
    )`);
});

// Rota para adicionar um novo paciente
app.post('/pacientes', (req, res) => {
    const { nome, peso, altura, imc } = req.body;
    const stmt = db.prepare(`INSERT INTO pacientes (nome, peso, altura, imc) VALUES (?, ?, ?, ?)`);
    stmt.run(nome, peso, altura, imc, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, nome, peso, altura, imc });
    });
    stmt.finalize();
});

// Rota para obter todos os pacientes
app.get('/pacientes', (req, res) => {
    db.all(`SELECT * FROM pacientes`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
