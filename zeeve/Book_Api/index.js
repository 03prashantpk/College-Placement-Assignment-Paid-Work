const express=require('express');
const db=require("./database/db");
const app=express();
const port='8081';
const bookRouter=require("./routes/books.router");
const authRouter=require("./routes/author.router");
const pubRouter=require("./routes/publication.router");
app.use(express.json());
app.use("/books",bookRouter);
app.use("/authors",authRouter);
app.use("/publications",pubRouter);
app.listen(port,()=>{
    console.log("Listening");
});