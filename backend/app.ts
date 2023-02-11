const express = require("express");
const cors = require("cors");
import dotenv from 'dotenv';

const app = express();
dotenv.config(); // access .env variables via process.env.VARIABLE_NAME
app.use(cors()); // enable CORS

app.get("/", (req: any, res: any) => {
    res.send("Welcome to the EatWhat API!");
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