const express=require('express');
const router=express.Router();
const{
    getAllPublishers,
    getPublisherById,
    postPublisher,
    updatePublisher,
    deletePublisher
}=require("../controllers/publication.controller");

router.get("/getpublishers",getAllPublishers);

router.get("/getpublisher/:id",getPublisherById);

router.post("/postpublisher",postPublisher);

router.put("/updatepublisher/:id",updatePublisher);

router.delete("/deletepublisher/:id",deletePublisher);

module.exports=router;