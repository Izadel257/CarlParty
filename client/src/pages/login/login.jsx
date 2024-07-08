import "./login.css"
import React from "react"
import { useState } from "react"
import axios from 'axios'


function Login(){
    const [Data, setData] = useState({email: '',})
    const {email} = Data; 
    const onChange = e => setData ({...Data,[e.target.name]: e.target.value}); 
    const onSubmit = async e => {
        e.preventDefault(); 
        try {
            const res = await axios.post('http://localhost:3001/api/user/register', {email: email});
            // this is where I have to decide what to do next after registration
        } catch (error){
            console.error (error.response.data); 

        }
    }
    
    // Implement a function to send verification code using axios or fetch
    const sendVerificationCode = async () => {
        try {
        const res = await axios.post('http://localhost:3001/api/user/send-code', { email:email });
        console.log(res.data);
        setMessage(re.data.message)
        // Show success message to user
        } catch (error) {
        console.error(error.response.data);
        setMessage('Failed to send verification code... Check if email exists');
        }
    };

    const handleChange = (event) => {
            onChange
    }
    return(
        <div>
            <form div="loginInfo" onSubmit={onSubmit}>
                <p id="emailEnter">Enter Email</p>
                <input type="text" 
                id="email" name = "email" 
                value = {email} 
                onChange = {onChange}></input>
                <button id="cancel" >Cancel</button>
                <button id="goButton" type="submit" onClick={sendVerificationCode}>Go</button>
            </form>
        </div>
    )
}

export default Login