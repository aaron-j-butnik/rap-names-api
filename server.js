const express = require("express");
const cors = require("cors");
const PORT = 3000;
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connectionString = `mongodb+srv://aaronjbutnik:lindall9158@cluster0.6ycyxsr.mongodb.net/?retryWrites=true&w=majority`;

const rappers = {
  "21 savage": {
    birthName: "Shéyaa Bin Abraham-Joseph",
    age: 29,
    birthLocation: "London, England",
  },
  "little dicky": {
    birthName: "David Andrew Burd",
    age: 35,
    birthLocation: "Cheltenham Township, Pennsylvania",
  },
  unknown: {
    birthName: "unknown",
    age: 0,
    birthLocation: "unknown",
  },
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
  res.json(rappers);
});

app.get("/api/:name", (req, res) => {
  const rapperName = req.params.name.toLocaleLowerCase();
  if (rappers[rapperName]) {
    res.json(rappers[rapperName]);
  } else {
    res.json(rappers.unknown);
  }
});

app.listen(process.env.PORT || PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on port ${3000}.`);
});
