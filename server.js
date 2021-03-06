const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const uuid = require("uuid");
const port = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes/", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", (err, data) => {
    var json = JSON.parse(data);
    return res.json(json);
  });
});

app.get("*", function (req, res) {
  res.sendFile(__dirname, "./public/index.html");
});

app.post("/api/notes/", function (req, res) {
  newNote = req.body;
  newNote.id = uuid.v4()
  fs.readFile(__dirname + "/db/db.json", (err, data) => {
    var json = JSON.parse(data);
    json.push(newNote);

    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(json));

    res.json(true)
  });
});

app.delete("/api/notes/:id", function (req, res) {
  let response = req.params;
  let id = response.id;
  console.log(`Note id: ${id} marked for deletion`);

  fs.readFile(__dirname + "/db/db.json", (err, data) => {
    var json = JSON.parse(data);

    const filteredJson = json.filter((element) => element.id !== id);
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(filteredJson));

    res.json(true)
  });
});




app.listen(process.env.PORT || 3005, () => {
  console.log(`Listening on port 3005`);
});