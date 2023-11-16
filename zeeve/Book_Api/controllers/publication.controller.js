const model=require("../models/publishers.model");
const{
    empty,
    validemail,
    validphn
}=require("../helpers/validation.helpers");

const getAllPublishers=async (req,res)=>{
    try{
        const pub=await model.find({});
        if(pub.length>0)
        res.json(pub);
        else
        res.send("No PUBLISHER data Available");
    }
    catch(error)
    {
        res.send("error");
    }
};

const getPublisherById=async (req,res)=>{
    try{
        const publisher=await model.find({id: req.params.id});
        if(publisher.length!=0)
        res.json(publisher);
        else
        res.send("No publisher Found");
    }
    catch(error)
    {
        res.send("error");
    }
};

const postPublisher=async (req,res)=>{
    const publisher=req.body;
    var errormessage=[];
    if(empty(publisher.name))
    errormessage.push("Name Is InValid");
    if(empty(publisher.id))
    errormessage.push("Invalid Id");
    if(empty(publisher.cont_no)||!validphn(publisher.cont_no))
    errormessage.push("Invalid Contact Info");
    if(!validemail(publisher.email))
    errormessage.push("Invalid Email");
    if(publisher.books_published.length<1)
    errormessage.push("No Books Published");
    if(publisher.auth_ass.length<1)
    errormessage.push("No Author Associated");
    if(empty(publisher.yoe))
    errormessage.push("Year Of establishment Require");
    if(empty(publisher.revenue))
    errormessage.push("Revenue Require");
    if(errormessage.length==0)
    {
        try
        {
        await model.create(publisher);
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

const updatePublisher=async (req,res)=>{
    const changes=req.body;
    try
    {
        const Publisher=await model.find({id : req.params.id});
        if(Publisher.length==0)
        {
            res.send("Publisher Not Found");
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

const deletePublisher=async (req,res)=>{
    try{
        const Publisher=await model.find({id : req.params.id});
        if(Publisher.length==0)
        {
            res.send("Publisher Not Found");
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
    getAllPublishers,
    getPublisherById,
    postPublisher,
    updatePublisher,
    deletePublisher
};