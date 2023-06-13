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
        .toArray()
        .then((results) => {
          res.render("index.ejs", { rapName: results });
        })
        .catch((error) => console.log(error));
    });

    app.post("/addName", (req, res) => {
      rappersCollection
        .insertOne({
          stageName: req.body.stageName,
          birthName: req.body.birthName,
        })
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.log(error));
    });

    //  app.put('/api/names'), (req, res) => {
    //    rappersCollection
    //       .findOneAndUpdate({

    //       })
    //  }
    app.delete("/deleteName", (req, res) => {
      rappersCollection
        .deleteOne({ stageName: req.body.stageName })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No names to delete.");
          }
          res.json("Deleted rapper name.");
        })
        .catch((error) => console.log(error));
    });

    //  app.get("/api/:name", (req, res) => {
    //    const rapperName = req.params.name.toLocaleLowerCase();
    //    if (rappers[rapperName]) {
    //      res.json(rappers[rapperName]);
    //    } else {
    //      res.json(rappers.unknown);
    //    }
    //  });
  })
  .catch((error) => console.error(error));

app.listen(process.env.PORT || PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on port ${3000}.`);
});
