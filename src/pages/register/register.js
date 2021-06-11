import './register.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState(false);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        seterror(false);
        try{
            const res = await axios.post("auth/register", {
                username,
                password,
                email
            });
            console.log(res.data)
            if (res.data){
                window.location.replace("/login");
            }
        } catch {
            seterror(true)
        }    
    }
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input className="registerInput" type="text" placeholder="Enter your username..." onInput={(e)=>setusername(e.target.value)}/>
                <label>Email</label>
                <input className="registerInput" type="email" placeholder="Enter your email..." onInput={(e)=>setemail(e.target.value)}/>
                <label>Password</label>
                <input className="registerInput" type="password" placeholder="Enter your password..." onInput={(e)=>setpassword(e.target.value)}/>
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link to="/login" className="link">LOGIN</Link>
            </button>
            {error&&(<span className="error">Something went wrong, Please try again...</span>)}
            
        </div>
    )
}
