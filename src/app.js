require("dotenv").config({ path: "src/.env" });
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const connectDB = require("./db/connect");
const User = require("./models/users");
const async = require("hbs/lib/async");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.set("view engine", "hbs");
    app.set("views", views_path);
    app.use(express.static(static_path));
    hbs.registerPartials(partials_path);

    app.get("/", (req, res) => {
      res.render("index.hbs");
    });
    app.get("/login", (req, res) => {
      res.render("login.hbs");
    });
    app.get("/signup", (req, res) => {
      res.render("signup.hbs");
    });

    //create new user in db
    app.post("/signup", async (req, res) => {
      try {
        const password = req.body.pass;
        const cpassword = req.body.re_pass;
        if (password === cpassword) {
          const user = new User({
            name: req.body.name,
            email: req.body.email,
            pass: req.body.pass,
            re_pass: req.body.re_pass,
          });
          const registerd = await user.save();
          res.status(201).render("index");
        } else {
          res.send("passwords not matching");
        }
      } catch (error) {
        res.status(400).send(error);
      }
    });

    //login user
    app.post("/login", async (req, res) => {
      try {
        const email = req.body.your_email;
        const password = req.body.your_pass;
        const useremail = await User.findOne({ email });
        if (useremail.pass === password) {
          res.status(201).render("index");
        } else {
          res.send("pass not matching");
        }
      } catch (error) {
        res.status(400).send("invalid email");
      }
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("error =>", error);
  }
};
start();
