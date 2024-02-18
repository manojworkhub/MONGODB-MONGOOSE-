const mongoose = require ("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    location:String
});

const collection =mongoose.model('datalists',userSchema);

module.exports = collection;