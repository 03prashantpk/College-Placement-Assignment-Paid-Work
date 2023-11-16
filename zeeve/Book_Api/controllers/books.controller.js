const model=require("../models/books.model");

const{
    empty
}=require("../helpers/validation.helpers");

const getAllBooks=async (req,res)=>{
    try{
        const books=await model.find({});
        if(books.length>0)
        res.json(books);
        else
        res.send("No Books Available");
    }
    catch(error)
    {
        res.send("error");
    }
};

const getBookById=async (req,res)=>{
    try{
        const book=await model.find({id: req.params.id});
        if(book.length!=0)
        res.json(book);
        else
        res.send("No Book Found");
    }
    catch(error)
    {
        res.send("error");
    }
};

const getBooksByCategory=async (req,res)=>{
    try{
        /*
        const books=await model.find({
            category: {
                "$in" : [req.params.cat]
            }
        },'-_id -__v');
        */

        const books=await model.find({
            category: req.params.cat
        },'-_id -__v');
        if(books.length==0)
        res.send("No Books Found");
        else
        res.send(books)
    }
    catch(error)
    {
        res.send("error");
    }
};

const postBook=async (req,res)=>{
    const book=req.body;
    console.log(book, req.body);
    var errormessage=[];
    if(empty(book.id))
    errormessage.push("Not A Valid Id");
    if(empty(book.name))
    errormessage.push("Not A Valid name");
    if(empty(book.price))
    errormessage.push("Price is rquired");
    if(book.authors.length<1)
    errormessage.push("Invalid Author list");
    if(book.category.length<1)
    errormessage.push("Invalid category list");
    if((empty(book.publication.id)^empty(book.publication.date)))
    errormessage.push("invalid publication information");
    if(errormessage.length==0)
    {
        try{
            await model.create(book);
            res.send("Success");
        }
        catch(error)
        {
            res.send("Error");
        }
    }
    else
    res.send(errormessage);
};

const putBookUpdate=async (req,res)=>{
    const changes=req.body;
    try
    {
        const book=await model.find({id : req.params.id});
        if(book.length==0)
        {
            res.send("Book Not Found");
        }
        else
        {
            await model.updateMany({id : req.params.id},changes);
            res.send("updated");
        }
        
    }
    catch(error)
    {
        res.send("Error");
    }
};

const deleteBookById=async (req,res)=>{
    try{
        const book=await model.find({id : req.params.id});
        if(book.length==0)
        {
            res.send("Book Not Found");
        }
        else
        {
            await model.deleteOne({id: req.params.id});
            res.send("success");
        }
        
    }
    catch(error)
    {
        res.send("error");
    }   
};
module.exports={
    getAllBooks,
    getBookById,
    getBooksByCategory,
    postBook,
    putBookUpdate,
    deleteBookById
};