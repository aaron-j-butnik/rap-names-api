const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(cors());

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
