const express = require ("express");
const sqlite3 = require ("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database("Desenvolvimento.sqlite");

const app = express();

app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/incio.html"));
})



app.get("/criartabela", (req, res) => {

    var sql = "CREATE TABLE CADASTROS (ID INTEGER PRIMARY KEY AUTOINCREMENT, NOME VARCHAR, USUARIO VARCHAR, EMAIL VARCHAR, SENHA VARCHAR, CPF VARCHAR, TELEFONE VARCHAR, CEP VARCHAR);";

    db.run(sql, (err) => {
        if(err) res.send("err");
        else res.send("Tabela criada com sucesso!");
    });
});



app.post("/cadas", (req, res) => {

    console.log(req.body);

    var nome = req.body.nome;
    var usuario = req.body.usuario;
    var email = req.body.email;
    var senha = req.body.senha;
    var cpf = req.body.cpf;
    var telefone = req.body.telefone;
    var cep = req.body.cep;

    var sql = "INSERT INTO CADASTROS (NOME, USUARIO, EMAIL, SENHA, CPF, TELEFONE, CEP), VALUES( ?, ?, ?, ?, ?, ?, ? );";
    
    db.run(sql, [nome, usuario, email, senha, cpf, telefone, cep], (err) => {
        if(err) res.send(err);
        else res.send("cadastro realizado!");
    });
});

app.listen(3000, console.log("rodando..."))