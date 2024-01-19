import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = (props) => {
    let { setIslogin } = props;

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("isloginesatateuser")) === "true" || JSON.parse(localStorage.getItem("isloginesatateuser")) !== null) {
            navigate("/")
        }
    }, [])
    let [formData, setFormData] = useState({
        name: '', email: '', password: ''
    });
    let [message, setMessage] = useState();
    let [loading, setLoading] = useState(false);

    function handleChange(e) {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    let navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let response = await axios.post('http://localhost:3000/api/user/login', formData)
        if (response.data.result == "success") {
            setMessage(response.data.message);
            let { name, _id, email } = response.data.data
            localStorage.setItem("esatateuser", JSON.stringify({"id": _id, name,  email }))
            localStorage.setItem("isloginesatateuser", JSON.stringify("true"))
            console.log(response);
            navigate("/")
            setIslogin(true)
        } else {
            if (response.data.message) {
                setMessage(response.data.message);
            }else{
                setMessage(response.data.errors[0].msg);
            }
        }
        setTimeout(() => {
            setLoading(false);
            setMessage("");
        }, 3000);
    }

    return (
        <>
            <main className='main-content d-flex'>
                <div className="col-md-3 col-md-offset-1 m-auto">
                    <div className="contact-form">
                        <h3 className="fs-3 text-center fw-bold">Login Form</h3>
                        <form onSubmit={handleSubmit}>
                            <input required onChange={handleChange} type="email" placeholder="Email.." name='email' />
                            <input required onChange={handleChange} type="password" placeholder="Password.." name='password' />
                            <p className='text-center text-warning mb-0'>{message}</p>
                            <p className="text-center mb-0">
                                <button type="submit" disabled={loading}>{loading ? "Loading" : "Login"}</button>
                            </p>
                        </form>
                        <p className='text-center'>Not a rember? <Link to={"/register"}>register</Link></p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login;
