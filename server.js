const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8010;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

require("/routes/apiroutes")(app);
require("/routes/htmlroutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
