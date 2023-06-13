const express = require("express");
const cors = require("cors");
const PORT = 3000;
const MongoClient = require("mongodb").MongoClient;
const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const connectionString = `mongodb+srv://aaronjbutnik:lindall9158@cluster0.6ycyxsr.mongodb.net/?retryWrites=true&w=majority`;

MongoClient.connect(connectionString)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("rap-names");
    const rappersCollection = db.collection("rappers");

    app.get("/", (req, res) => {
      rappersCollection
        .find()
        .sort({ likes: -1 })
        .toArray()
        .then((results) => {
          res.render("index.ejs", { rapName: results });
        })
        .catch((error) => console.error(error));
    });

    app.post("/addName", (req, res) => {
      rappersCollection
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
      rappersCollection
        .updateOne(
          {
            stageName: req.body.stageNameS,
            birthName: req.body.birthNameS,
            likes: req.body.likesS,
          },
          { $set: { likes: request.body.likesS + 1 } }
        )
        .then((result) => {
          console.log("Added One Like");
          response.json("Like Added");
        })
        .catch((error) => console.error(error));
    });

    app.delete("/trashCanDelete", (req, res) => {
      rappersCollection
        .deleteOne({
          stageName: req.body.stageNameDelete,
        })
        .then((result) => {
          res.json("Rapper Deleted.");
        })
        .catch((error) => console.error(error));
    });

    app.delete("/deleteName", (req, res) => {
      rappersCollection
        .deleteOne({ stageName: req.body.stageName })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No names to delete.");
          }
          res.json("Deleted rapper name.");
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));

app.listen(process.env.PORT || PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on port ${3000}.`);
});
