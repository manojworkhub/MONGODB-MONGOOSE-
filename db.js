const mongoose = require("mongoose");

async function getthedatabase() {
 let  database = await mongoose
    .connect("mongodb://127.0.0.1:27017/abc")
    .then(() => {
      console.log("data base connected");
    });
}

module.exports = {getthedatabase};
