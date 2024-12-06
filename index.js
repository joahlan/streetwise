const express = require ("express");
const sqlite3 = require ("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database("Desenvolvimento.sqlite");

const app = express();

app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})


app.listen(3000, console.log("rodando..."))