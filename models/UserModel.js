const {  mongoose } = require("mongoose");



let UserSchema=new mongoose.Schema({

name:{type:String },
email:{type:String , require:true , unique:true},
password :{type:String , require:true}

});
let UserModel= mongoose.model("USER", UserSchema, "users");


module.exports={
    UserModel
}