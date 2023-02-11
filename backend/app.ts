const express = require("express");
const cors = require("cors");
import dotenv from "dotenv";

const app = express();
dotenv.config(); // access .env variables via process.env.VARIABLE_NAME
app.use(cors()); // enable CORS

// mysql setup
const mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

app.get("/", (req: any, res: any) => {
    pool.query("SELECT 1 + 1 AS solution", (err: any, data: any) => {
        if (err) {
            console.error(err);
            return;
        }

        // rows fetch
        let solution = data[0].solution;
        res.send("Welcome to the EatWhat API! 1 + 1 = " + solution + ".");
    });
});

// get all vote
app.get("/vote", (req: any, res: any) => {});

// get vote by id
app.get("/vote/:id", (req: any, res: any) => {
    let id = req.params.id;
});

// create vote
app.post("/vote", (req: any, res: any) => {});

// vote an food
app.post("/vote/:id/:items", (req: any, res: any) => {
    let id = req.params.id;
    let items = req.params.items;
});

app.listen(8000);

console.log("Listening at http://localhost:8000/");
