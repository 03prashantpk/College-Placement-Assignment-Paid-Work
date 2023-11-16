const mongoose=require('mongoose');
const pubSchema=mongoose.Schema({
    id : Number,
    name : String,
    cont_no : String,
    email : String,
    books_published : Array,
    auth_ass :Array,
    yoe : Number,
    revenue : Number
},
{
    strict : false
});
const publisherModel=mongoose.model("Publishers",pubSchema);
module.exports=publisherModel;