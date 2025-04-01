const express = require ("express");
const sqlite3 = require ("sqlite3").verbose();
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
        if(err) console.log("deu erro");
        else console.log("deu certo");
    })
};


app.post("/validar_cadastro", (req, res) => {

    console.log(req.body);

    var sql = "INSERT INTO USUARIOS(USUARIO, EMAIL, SENHA, CPF, TELEFONE, CEP) VALUES(?, ?, ?, ?, ?, ?)";
    
    db.run(sql, [req.body.usuario, req.body.email, req.body.senha, req.body.cpf, req.body.telefone, req.body.cep], (err) => {
        if(err) res.send(err);
        else res.send("Cadastro Realizado");
    });

});

app.post("/validar_login", (req, res) => {

    db.all("SELECT*FROM USUARIOS", (err, rows) => {
        
        for(var x = 0 ; x <= rows.length; x++){
            if(usuario == rows.usuario[x && senha == rows.senha[x]])
                console.log("Usuario já existe");
            else console.log("Usuario incorreto")
        }

    })

    res.send("ok")

});


app.listen(3000, console.log("rodando..."))