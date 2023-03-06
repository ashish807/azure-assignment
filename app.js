require("dotenv").config();
// Create Express App
const express = require("express");
const demo = require("./demoModel");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');

var connectDatabase = require("./databaseConnect");
const DATABASE_KEY = process.env.MONGO_AZURE;
connectDatabase(DATABASE_KEY);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//Handeling cors error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')  //wildcard
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Methods', 'POST', 'GET', 'PATCH', 'DELETE')
        return res.status(200).json({});
    }
    next();
})


app.get("/", (req, res) => {
  demo
    .find({})
    .exec()
    .then((doc) => {
      if (doc.length <= 0)
       res.status(200).json({ message: "No Data Found" });
      else 
        res.status(200).json({ ...doc });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error: " + err.message });
    });
});

app.post("/", (req, res) => {
  const name = req.body.name;
  const newDemo = new demo({
    Name: name,
  });
  newDemo
    .save()
    .then((result) => res.status(200).json({ message: "Name Added" }))
    .catch((err) => res.status(400).json({ message: "Error: " + err.message }));
});

module.exports = app;