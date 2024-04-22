import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

const Login = ()=>{
    const navigate = useNavigate()

    // agar user logged in hai aur local storage mein hai to signup firse nhi kar sakta by url also
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if (auth){
            navigate('/')
        }
    }, [])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleLogin = async ()=>{
            if(!email || !password){
              setError(true)
              return false
          }
        let data = await fetch("https://e-comm-dashboard-server.onrender.com/login", {
            method: "POST",
            body: JSON.stringify({email,password}),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        let response = await data.json();
        console.log(response)
        if(response.auth){
            localStorage.setItem("user",JSON.stringify(response.user))
            localStorage.setItem("token",JSON.stringify(response.auth))
            navigate('/');
        }
        else{
            alert("Invalid User Details...")
        }
    }

   return (
     <div className='login'>
        <h1>Login</h1>
        <input onChange={(e)=>{setEmail(e.target.value)}} className='inputBox' type="text" id="email" value={email} placeholder='Enter email' />
        {error && !email && <span className='invalid-input'>Enter your email</span>}

        <input onChange={(e)=>{setPassword(e.target.value)}} className='inputBox' type="password" id="password" value={password} placeholder='Enter password' />
        {error && !email && <span className='invalid-input'>Enter your password</span>}

        <button onClick={handleLogin} className='appButton' type="button">Login</button>
    </div>
   )
}

export default Login;