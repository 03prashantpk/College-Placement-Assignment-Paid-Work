const model=require("../models/authors.model");
const{
    empty,
    validemail,
    validphn
}=require("../helpers/validation.helpers");

const getAllAuthors=async (req,res)=>{
    try{
        const authors=await model.find({});
        if(authors.length>0)
        res.json(authors);
        else
        res.send("No author data Available");
    }
    catch(error)
    {
        res.send("error");
    }
};

const getAuthorById=async (req,res)=>{
    try{
        const author=await model.find({id: req.params.id});
        if(author.length!=0)
        res.json(author);
        else
        res.send("No author Found");
    }
    catch(error)
    {
        res.send("error");
    }
};

const postAuthor=async (req,res)=>{
    const author=req.body;
    var errormessage=[];
    if(empty(author.name))
    errormessage.push("Name Is InValid");
    if(empty(author.id))
    errormessage.push("Invalid Id");
    if(empty(author.cont_no)||!validphn(author.cont_no))
    errormessage.push("Invalid Contact Info");
    if(!validemail(author.email))
    errormessage.push("Invalid Email");
    if(author.books_published.length<1)
    errormessage.push("No Books Published");
    if(author.pub_ass.length<1)
    errormessage.push("No Publisher Associated");
    if(!(["Male","Female","Others"].includes(author.gender)))
    errormessage.push("Invalid Gender");
    if(errormessage.length==0)
    {
        try
        {
        await model.create(author);
        res.send("Success");
        }
        catch(error)
        {
            res.send("error");
        }
    }
    else
    {
        res.send(errormessage);
    }
};

const putAuthorUpdate=async (req,res)=>{
    const changes=req.body;
    try
    {
        const Author=await model.find({id : req.params.id});
        if(Author.length==0)
        {
            res.send("Author Not Found");
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

const deleteAuthorById=async (req,res)=>{
    try{
        const author=await model.find({id : req.params.id});
        if(author.length==0)
        {
            res.send("Author Not Found");
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
    getAllAuthors,
    getAuthorById,
    postAuthor,
    putAuthorUpdate,
    deleteAuthorById
};