require("dotenv").config();
const express = require("express");
const passport = require("passport");
require("./config/passport");
const db = require("./models");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/auth"));
app.use("/banners", require("./routes/banner"));
app.use("/services", require("./routes/service"));
app.use("/", require("./routes/balance"));
app.use("/transaction", require("./routes/transaction"));

app.get("/", (req, res) => {
    res.send("Welcome to the Nutech API test!");
});

db.sequelize.sync().then(() => {
    app.listen(3002, () =>
        console.log("Server running on http://localhost:3002")
    );
});
