import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
const UpdateProduct = () => {

    const navigate = useNavigate()

    const {id} = useParams();

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")

    const updateProduct = async ()=>{
        const data = await fetch(`https://e-comm-dashboard-server.onrender.com/update-product/${id}`,{
            method: "PUT",
            body: JSON.stringify({name, price, category, company}),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const response = await data.json();
        console.log("Updated: ", response)
        navigate("/")
    }

    const getSingleProductData = async ()=>{
        const data = await fetch(`https://e-comm-dashboard-server.onrender.com/getSingleProduct/${id}`, {
            headers: {
                "Authorization" : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const response = await data.json();
        setName(response.name)
        setPrice(response.price)
        setCategory(response.category)
        setCompany(response.company)
    }
    useEffect(()=>{
        getSingleProductData();
    }, [])

  return (
    <div>
        <div className='product'>
        <h1>Update Product</h1>
        <input onChange={(e)=>{setName(e.target.value)}} className='inputBox' type="text" id='productName' value={name}  placeholder='Edit Product Name' />

        <input onChange={(e)=>{setPrice(e.target.value)}} className='inputBox' type="text" id='productPrice' value={price}  placeholder='Edit Product Price' />

        <input onChange={(e)=>{setCategory(e.target.value)}} className='inputBox' type="text" id='productCategory' value={category}  placeholder='Edit Product Category' />

        <input onChange={(e)=>{setCompany(e.target.value)}} className='inputBox' type="text" id='productCompany' value={company}  placeholder='Edit Product Company' />

        <button onClick={updateProduct} className='appButton' type="button">Add Product</button>
    </div>
    </div>
  )
}

export default UpdateProduct