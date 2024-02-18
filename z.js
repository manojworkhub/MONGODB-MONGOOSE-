var ex = require("express");
const bodyparser = require("body-parser");
const exhbs = require("hbs");
const dbo = require("./db");
const collection = require("./module/userMODUL");
dbo.getthedatabase();

//
// let database = mongoose.connect("mongodb://127.0.0.1:27017/abc").then(() => {
//   console.log("data base connected");
// });
// const userSchema = mongoose.Schema({
//   Name: String,
//   phone: Number,
//   email: String,
//   location: String,
// });
// const collection = mongoose.model("datalist", userSchema);

var app = ex();

app.set("view engine", "hbs");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// app.use(ex.static())
// var data = [{name:"salman",},{name:"manoj"}]

app.get("/", async (req, res) => {
  const data = await collection.find();
  
  let edit_id, edit_collection;

  if (req.query.edit_id) {
    edit_id = req.query.edit_id;
   edit_collection = await collection.findOne({ _id: edit_id });
   console.log(edit_collection)

  }

  if (req.query.delete_id) {
   await collection.deleteOne({ _id: req.query.delete_id });
   
   return res.redirect("/");
  }

   res.render("main", { data, edit_id, edit_collection });
});

app.post("/showpage", async (req, res) => {
  let data = collection({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    location: req.body.location,
  });
  data.save();

  return res.redirect("/");
});
app.post("/editpage/:edit_id", async (req, res) => {
  let edit_collection = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    location: req.body.location,
  };
  let edit_id = req.params.edit_id;
  await collection.findOneAndUpdate({ _id: edit_id }, { $set: edit_collection });

  return res.redirect("/");
});

app.listen(5000);
console.log("running");
