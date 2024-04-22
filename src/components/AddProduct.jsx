import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const AddProduct = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const addProduct = async ()=>{
        if(!name || !price || !category || !company){
            setError(true)
            return false
        }
        const userData = localStorage.getItem("user")
        const data = await fetch("https://e-comm-dashboard-server.onrender.com/add-product",{
            method: "POST",
            body: JSON.stringify({name, price, category, company, userId: JSON.parse(userData)._id}),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        const response = await data.json();
        if(response){
            console.log(response)
            navigate('/')
        }
    }
  return (
    <div className='product'>
        <h1>Add Product</h1>
        <input onChange={(e)=>{setName(e.target.value)}} className='inputBox' type="text" id='productName' value={name}  placeholder='Enter Product Name' />
        {error && !name && <span className='invalid-input'>Enter a valid product name</span>}

        <input onChange={(e)=>{setPrice(e.target.value)}} className='inputBox' type="text" id='productPrice' value={price}  placeholder='Enter Product Price' />
        {error && !price && <span className='invalid-input'>Enter a valid product price</span>}

        <input onChange={(e)=>{setCategory(e.target.value)}} className='inputBox' type="text" id='productCategory' value={category}  placeholder='Enter Product Category' />
        {error && !category && <span className='invalid-input'>Enter a valid product category</span>}

        <input onChange={(e)=>{setCompany(e.target.value)}} className='inputBox' type="text" id='productCompany' value={company}  placeholder='Enter Product Company' />
        {error && !company && <span className='invalid-input'>Enter a valid product company</span>}

        <button onClick={addProduct} className='appButton' type="button">Add Product</button>
    </div>
  )
}

export default AddProduct