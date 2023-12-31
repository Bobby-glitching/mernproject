import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {
    const history=useNavigate();

    const [username,setUsername]=useState('')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("https://violetapi.onrender.com/usersignup",{
                username,name,email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/userhome",{state:{id:username}})
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="cont">
        <div className="signcontainer">

            <h1>Signup</h1>

            <form action="POST" className="register-form">
            <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Name"  />
            <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username"  />
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/userlogin">Login Page</Link>

        </div></div>
    )
}

export default Login