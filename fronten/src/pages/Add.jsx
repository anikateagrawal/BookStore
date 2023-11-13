import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [book,setBook]=useState({
    title:"",
    desc:"",
    price:null,
    cover:"",
  })

  const navigate=useNavigate();

  const handleInput=(e)=>{
    setBook((prev) => ({ ...prev ,[e.target.name]:e.target.value}));
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:8000/books",book);
      navigate("/");
    }
    catch(err){
      console.log(err);
    }

  }

  return (
    <div>
      <div className="form">
        <h1>Add New Book</h1>
        <input type="text" placeholder='title'   onChange={handleInput} name='title' />
        <input type="text" placeholder='desc' onChange={handleInput} name='desc' />
        <input type="number" placeholder='price'  onChange={handleInput} name='price'/>
        <input type="text" placeholder='cover' onChange={handleInput} name='cover'/>
        <button onClick={handleSubmit} className="formButton">Add</button>
      </div>
    </div>
  )
}

export default Add