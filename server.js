const express = require("express");
const cors = require("cors");
const PORT = 3000;
const MongoClient = require("mongodb").MongoClient;
const app = express();
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "rap-names";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("rappers")
    .find()
    .sort({ likes: -1 })
    .toArray()
    .then((results) => {
      res.render("index.ejs", { rapName: results });
    })
    .catch((error) => console.error(error));
});

app.post("/addName", (req, res) => {
  db.collection("rappers")
    .insertOne({
      stageName: req.body.stageName,
      birthName: req.body.birthName,
      likes: 0,
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.put("/addLike", (req, res) => {
  db.collection("rappers")
    .updateOne(
      {
        stageName: req.body.stageNameS,
        birthName: req.body.birthNameS,
        likes: req.body.likesS,
      },
      { $set: { likes: req.body.likesS + 1 } }
    )
    .then((result) => {
      res.json("Like Added");
    })
    .catch((error) => console.error(error));
});

app.delete("/trashCanDelete", (req, res) => {
  db.collection("rappers")
    .deleteOne({
      stageName: req.body.stageNameDelete,
    })
    .then((result) => {
      res.json("Rapper Deleted.");
    })
    .catch((error) => console.error(error));
});

app.delete("/deleteName", (req, res) => {
  db.collection("rappers")
    .deleteOne({ stageName: req.body.stageName })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.json("No names to delete.");
      }
      res.json("Deleted rapper name.");
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on port ${3000}.`);
});
