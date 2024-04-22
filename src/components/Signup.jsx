import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const navigate = useNavigate()
    
    // agar user singned up hai aur local storage mein hai to signup firse nhi kar sakta by url also
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if (auth){
            navigate('/')
        }
    }, [])

    const collectData = async ()=>{
      if(!name || !email || !password){
        setError(true)
        return false
    }

        const data = await fetch("https://e-comm-dashboard-server.onrender.com/register", {
          method: 'POST',
          body:JSON.stringify({name, email, password}),
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        
        const result = await data.json();
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.response))
        localStorage.setItem('token', JSON.stringify(result.auth))
        navigate('/')
    }

  return (
    <div className='register'>
        <h1>Register</h1>
        <input className='inputBox' value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter name" name='' id="name" />
        {error && !name && <span className='invalid-input'>Enter your name</span>}

        <input className='inputBox' value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Enter email" name='' id="email" />
        {error && !email && <span className='invalid-input'>Enter your email</span>}

        <input className='inputBox' value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Enter password" name='' id="password" />
        {error && !password && <span className='invalid-input'>Enter your password</span>}

        <button className='appButton' onClick={collectData} type="button">Sign up</button>
        
    </div>
  )
}

export default Signup