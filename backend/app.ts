const express = require("express");
const cors = require("cors");
import dotenv from "dotenv";

const app = express();
dotenv.config(); // access .env variables via process.env.VARIABLE_NAME
app.use(cors()); // enable CORS
app.use(express.json()); // enable json body parsing

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

/**
 * Database schema
 * 
 * Vote:
 * - id: int (primary key)
 * 
 * VoteOption:
 * - id: int (primary key)
 * - vote_id: int (foreign key)
 * - name: string
 * 
 * VoteItem:
 * - id: int (primary key)
 * - option_id: int (foreign key)
 * 
 */

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
app.get("/vote", (req: any, res: any) => {
    pool.query("SELECT * FROM Vote", (err: any, data: any) => {
        if (err) {
            console.error(err);
            return;
        }

        // rows fetch
        res.send(data);
    });
});

// get vote option by id
app.get("/voteOption/:id", (req: any, res: any) => {
    let id = req.params.id;

    // get vote options
    pool.query(
        "SELECT * FROM VoteOption WHERE vote_id = ?",
        [id],
        (err: any, options: any) => {
            if (err) {
                console.error(err);
                return;
            }

            res.send({ vote_id: id, options: options });
        }
    );
});

// create vote
app.post("/vote", (req: any, res: any) => {
    pool.query("INSERT INTO Vote () VALUES ()", (err: any, data: any) => {
        if (err) {
            console.error(err);
            return;
        }

        // Get the last inserted id
        let id = data.insertId;

        // Insert vote options
        let options = ["Option 1", "Option 2", "Option 3"];
        let query = "INSERT INTO VoteOption (vote_id, name) VALUES ?";
        let values = options.map((option: string) => [id, option]);

        pool.query(query, [values], (err: any, data: any) => {
            if (err) {
                console.error(err);
                return;
            }

            res.send({vote_id: id});
        });

    });
});

// create vote option
app.post("/voteOption/:id", (req: any, res: any) => {
    let id = req.params.id;
    let options = req.body.options;

    // Insert vote options
    let query = "INSERT INTO VoteOption (vote_id, name) VALUES ?";
    let values = options.map((option: string) => [id, option]);
    
    pool.query(query, [values], (err: any, data: any) => {
        if (err) {
            console.error(err);
            return;
        }

        res.send({vote_id: id});
    });
});

// vote an food
app.post("/vote/:id/:option", (req: any, res: any) => {
    let id = req.params.id;
    let option = req.params.option;

    // Insert vote item
    let query = "INSERT INTO VoteItem (option_id) VALUES ?";
    let values = [[option]];

    pool.query(query, [values], (err: any, data: any) => {
        if (err) {
            console.error(err);
            return;
        }

        // Get the last inserted id
        let id = data.insertId;
        res.send({vote_id: id})

    });
});

app.listen(8000);

console.log("Listening at http://localhost:8000/");
