const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  const { username, email, password, age } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
      res.send(createdUser);
    });
  });
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
