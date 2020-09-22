import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.get('/api/login', {
            params: {
                email: email,
                password: password,
            }
        }).then(response => {
            sessionStorage.setItem("apiToken", response.data.apiToken);

            history.push("/");
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        value={email} 
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} 
                        required/>
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        name="password" 
                        className="form-control" 
                        value={password} 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} 
                        required/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;
