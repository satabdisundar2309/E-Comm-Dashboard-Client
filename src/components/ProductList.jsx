import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {

    const [products, setProducts] = useState([])

    const getProducts = async ()=>{
        let data = await fetch("https://e-comm-dashboard-server.onrender.com/products", {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        let response = await data.json();
        setProducts(response)
    }

    useEffect(()=>{
        getProducts()
    }, [])

    const deleteProduct = async (id)=>{
        let data = await fetch(`https://e-comm-dashboard-server.onrender.com/delete-product/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization" : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        const response = await data.json();
        if(response){
            console.log(response)
            // alert("Product is deleted")
            
            getProducts();
        }
    }

    const searchHandler = async (e)=>{
        let key = e.target.value;
        if(key.trim()){
            let data = await fetch(`https://e-comm-dashboard-server.onrender.com/search/${key}`,{
                headers: {
                    "Authorization" : `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            let response = await data.json();
            if(response){
            setProducts(response)
            }
        }
        else{
            getProducts();
        }
    }

  return (
    <div className='product-list'>
        <h1>Product list</h1>
        <input onChange={searchHandler} className='search-product-box' type="text" placeholder='Search Product' />
        <div className="products-container">
            {
                products.length > 0 ?
                products.map((product)=>{
                    return <div key={product._id} className="card">
                        <p><strong>Name:</strong> {product.name}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Company:</strong> {product.company}</p>
                        <div className="actions">
                        <button onClick={()=>{deleteProduct(product._id)}} type="button">❌</button>
                            <Link className='updateLink' to={`/update/${product._id}`}>Update</Link>
                        </div>
                    </div>
                }) : 
                <h1>No Results Found</h1>
            }
        </div>
    </div>
  )
}

export default ProductList