const express=require('express');
const model=require("../models/books.model");
const router=express.Router();
const {
    getAllBooks,
    getBookById,
    getBooksByCategory,
    postBook,
    putBookUpdate,
    deleteBookById
}=require('../controllers/books.controller');


router.get("/getbooks",getAllBooks);


router.get("/getbookbyid/:id",getBookById);

router.get("/getbooksbycategory/:cat",getBooksByCategory);


router.post("/postbook",postBook);

router.put("/putupdate/:id",putBookUpdate);

router.delete("/delete/:id",deleteBookById);
module.exports=router;