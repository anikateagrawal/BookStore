import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [book,setBook]=useState({
    title:"",
    desc:"",
    price:0,
    cover:"",
  })

  const navigate=useNavigate();
  const bookid=useParams();

  useEffect(()=>{
    const get=async()=>{
    try{
      const res=await axios.get("http://localhost:8000/book/"+bookid.id);
      setBook(res.data[0]);
    }
    catch(e){
      console.log(e);
    }
  }
  get();
},[])

  
  

  const handleInput=(e)=>{
    setBook((prev) => ({ ...prev ,[e.target.name]:e.target.value}));
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await axios.put("http://localhost:8000/book/"+bookid.id,book);
      navigate("/");
    }
    catch(err){
      console.log(err);
    }

  }

  return (
    <div>
      <div className="form">
        <h1>Update the Book</h1>
        <input type="text" placeholder='title'   onChange={handleInput} name='title' value={book.title}/>
        <input type="text" placeholder='desc' onChange={handleInput} name='desc' value={book.desc} />
        <input type="number" placeholder='price'  onChange={handleInput} name='price' value={book.price}/>
        <input type="text" placeholder='cover' onChange={handleInput} name='cover' value={book.cover}/>
        <button className='formButton' onClick={handleSubmit}>Update</button>
      </div>
    </div>
  )
}

export default Update