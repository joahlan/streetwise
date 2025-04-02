const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();

app.use(express.json())

const db = new sqlite3.Database("Tabela de usuarios.sqlite3");

app.use(express.static(path.join(__dirname, "public")))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})


//Criar_tabela()
function Criar_tabela() {
    var sql = "CREATE TABLE USUARIOS(ID INTEGER PRIMARY KEY AUTOINCREMENT, USUARIO VARCHAR, EMAIL VARCHAR, SENHA VARCHAR, CPF VARCHAR, TELEFONE VARCHAR, CEP VARCHAR)";

    db.run(sql, err => {
        if (err) console.log("deu erro");
        else console.log("deu certo");
    })
};


app.post("/validar_cadastro", (req, res) => {

    console.log(req.body);

    var sql = "INSERT INTO USUARIOS(USUARIO, EMAIL, SENHA, CPF, TELEFONE, CEP) VALUES(?, ?, ?, ?, ?, ?)";

    db.run(sql, [req.body.usuario, req.body.email, req.body.senha, req.body.cpf, req.body.telefone, req.body.cep], (err) => {
        if (err) res.send(err);
        else res.send("Cadastro Realizado");
    });

});

app.post("/validar_login", (req, res) => {

    db.all("SELECT COUNT(*) AS total FROM USUARIOS WHERE USUARIO = ? AND SENHA = ?", [req.body.usuario, req.body.senha], (err, rows) => {

        if(err){
            console.log("Usuario não existe") 
        }

        if(rows.length > 0 && rows[0].total == 1){

            console.log("Usuario encontrado")
            return res.send("/index.html")
            }

        else{

            console.log("Não existe esse usuario")
            return res.send("/cadas.html")
        }
    });

});


app.listen(3000, console.log("rodando..."))