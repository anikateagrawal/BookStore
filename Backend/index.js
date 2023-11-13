const express=require("express");
const mysql=require("mysql");
const cors=require("cors");

const app=express()


const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"book",
    port:3308
})

app.use(cors());

app.get("/",(req,res)=>{
    res.json("hello");
})


app.get("/books",(req,res)=>{
    const q="Select * from books";
    db.query(q,(err,data)=>{
        if(err)return res.json(err);
        return res.json(data);
    })
})

app.use(express.json())

app.post("/books",(req,res)=>{
    const q="Insert into books(`title`,`desc`,`cover`,`price`) values(?)";
    const values=[req.body.title,req.body.desc,req.body.cover,req.body.price];

    console.log(req);
    db.query(q,[values],(err,data)=>{
        if(err)return res.json(err);
        return res.json("Book added successfully");
    })
})

app.delete("/book/:id",(req,res)=>{
    const {id}=req.params;
    const q="Delete from books where id=?"
    db.query(q,[id],(err,data)=>{
        if(err)return res.json(err);
        return res.json("successfully deleted");
    })
})

app.put("/book/:id",(req,res)=>{
    const {id}=req.params;
    const q="Update books set `title`=?, `desc`=?, `cover`=?, `price`=? where id=?";
    const values=[
        req.body.title,req.body.desc,req.body.cover,req.body.price
    ]
    db.query(q,[...values,id],(err,data)=>{
        if(err)return res.json(err);
        return res.json("successfully updated");
    })
})

app.get("/book/:id",(req,res)=>{
    const {id}=req.params;
    const q="select * from books where id =?";
    db.query(q,[id],(err,data)=>{
        if(err)return res.json(err);
        return res.json(data);
    })
})

app.listen(8000,()=>{
    console.log("connected");
})