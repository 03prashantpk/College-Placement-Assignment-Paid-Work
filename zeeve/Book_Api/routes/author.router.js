const express=require('express');
const router=express.Router();
const {
    getAllAuthors,
    getAuthorById,
    postAuthor,
    putAuthorUpdate,
    deleteAuthorById
}=require("../controllers/authors.controller");

router.get("/getauthors",getAllAuthors);

router.get("/getauthor/:id",getAuthorById);

router.post("/postauthor",postAuthor);

router.put("/authorupdate/:id",putAuthorUpdate);

router.delete("/deleteauthor/:id",deleteAuthorById);

module.exports=router;