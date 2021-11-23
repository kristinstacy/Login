//include stuff
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.use(express.static("public"));    //set public folder to static
app.set('view engine', 'ejs');        //set view engine to ejs
app.use(bodyParser.urlencoded(        //set up body parser
  {
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema =
{
  email: String,
  password: String
};

const User = new mongoose.model("User", userSchema);

//set up ability to view pages
app.get("/", function(req, res)
{
  res.render("home");
});

app.get("/login", function(req, res)
{
  res.render("login");
});

app.get("/register", function(req, res)
{
  res.render("register");
});

app.post("/register", function(req, res)
{
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err)
  {
   if(err)
   {
     console.log(err);
   }
   else {
     res.render("quotes");  //only allows access if user has an account
   }
  });
});


//start server
app.listen(8080, function()
{
  console.log("Server started on port 8080");
});
