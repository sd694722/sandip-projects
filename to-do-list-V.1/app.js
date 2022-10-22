const express = require("express");
const bodyParser = require("body-parser");
const date= require(__dirname+"/date.js")

PORT = 3000;
const items = [];
const app = express();

//template
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

//routes
app.get("/about",(req,res)=>{
  res.render("about");
})
app.get("/", (req, res) => {
  const currentDay=date.getDate();
  res.render("list", { Today: currentDay, newListItems: items });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;
  items.push(item);
  res.redirect("/"); //reditecting to the home route
});

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
