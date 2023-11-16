const mongoose=require('mongoose');
const bookSchema=mongoose.Schema(
    {
        id: Number,
        name : String,
        authors : Array,
        publication : JSON,
        language : String,
        pages : Number,
        price : Number,
        category : Array,
        rating : Number
    },
    {
        strict : false
    }
);
const bookModel=mongoose.model("Books",bookSchema);
module.exports=bookModel;