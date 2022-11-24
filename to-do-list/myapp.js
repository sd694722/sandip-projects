const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes=require("./routes/all-routes")

const app = express();

const PORT = 3000;
// ----------------------------------------------------------------------------
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose--------------------------------------------------------------------
mongoose.connect(
    "mongodb+srv://student:student1234@cluster0.r7snjg4.mongodb.net/todolistDB",
    {
        useNewUrlParser: true
    });
//DB Schema--------------------------------------------------------------------
const itemsSchema = {
    name: String
};

const Item = mongoose.model("item", itemsSchema);

// Route Section---------------------------------------------------------------
app.get("/", (req, res) => {
    Item.find({}, (err, foundItems) => {

            res.render("index", { newListItems: foundItems });

    });
});

app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });

    item.save();
    res.redirect("/");
});

//for deleteing the checked item in the to do list-----------------------
app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, (err) => {
        if (!err) console.log("Successfully deleted the Checked Item.");

        res.redirect("/");
    });
});

//about route---------------------------------------------------------------
app.get("/about",(req,res)=>{
    res.render("about");
});
app.get("*",(req,res)=>{
    res.redirect("/");
});

// Listen--------------------------------------------------------------------
app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));