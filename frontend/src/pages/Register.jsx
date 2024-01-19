import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = (props) => {
    let { setIslogin } = props;
    let [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    let [message, setMessage] = useState();
    let [loading, setLoading] = useState(false);

    function handleChange(e) {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    let navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        axios.post('http://localhost:3000/api/user/register', formData)
            .then((response) => {
                if (response.data.result == "success") {
                    setMessage(response.data.message);
                    let { name, _id, email } = response.data.data
                    localStorage.setItem("esatateuser", JSON.stringify({ "id": _id, name, email }))
                    localStorage.setItem("isloginesatateuser", JSON.stringify("true"))
                    setIslogin(true)
                    console.log(response.data);
                    navigate("/")
                } else {
                    if (response.data.message) {
                        setMessage(response.data.message);
                    }else{
                        setMessage(response.data.errors[0].msg);
                    }
                }
            })
            .catch((error) => {
                // if (error.data.message) {
                //     setMessage(error.data.message);
                // }else{
                //     setMessage(error.data.errors[0].msg);
                // }
                console.log(error);
            });
        setTimeout(() => {
            setLoading(false);
            setMessage("");
        }, 3000);
    }
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("isloginesatateuser")) === "true" || JSON.parse(localStorage.getItem("isloginesatateuser")) !== null) {
            navigate("/")
        }
    })

    return (
        <>
            <main className='main-content d-flex'>
                <div className="col-md-3 col-md-offset-1 m-auto">
                    <div className="contact-form">
                        <h3 className="fs-3 text-center fw-bold">Register Form</h3>
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} type="text" placeholder="User name.." name='name' />
                            <input onChange={handleChange} type="email" placeholder="Email.." name='email' />
                            <input onChange={handleChange} type="password" placeholder="Password.." name='password' />
                            <p className='text-center text-warning mb-0'>{message}</p>
                            <p className="text-center mb-0">
                                <button type="submit" disabled={loading}>{loading ? "Loading" : "Register"}</button>
                            </p>
                        </form>
                        <p className='text-center'>Already rember? <Link to={"/login"}>login</Link></p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Register
