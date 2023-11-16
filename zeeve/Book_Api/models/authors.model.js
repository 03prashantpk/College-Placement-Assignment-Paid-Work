const mongoose=require('mongoose');
const authSchema=mongoose.Schema({
    id : Number,
    name :String,
    cont_no: String,
    email : String,
    books_published : Array,
    pub_ass : Array,
    gender : String,
    country : String,
    no_of_books_sold : Number
},{
    strict : false
});
const authModel=mongoose.model("Authors",authSchema);
module.exports=authModel;