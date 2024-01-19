import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    let { id,name, email } = JSON.parse(localStorage.getItem("esatateuser"));
    let [formData, setFormData] = useState({
        name: name,
        email: email,
        // password: ,
    });
    let [message, setMessage] = useState();
    let [loading, setLoading] = useState(false);

    function handleChange(e) {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // let getProfileData = async () => {
    //     let res = await axios.get(`http://localhost:3000/api/user/profile/${email}`);
    //     if (res) {
    //         console.log(res);
    //     }
    // }

    // getProfileData()

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        axios.post(`http://localhost:3000/api/user/updateuser/${id}`, formData)
            .then((response) => {
                if (response.data.result == "success") {
                    setMessage(response.data.message);
                } else {
                    setMessage(response.data.message);
                }
            })
            .catch((error) => {
                setMessage(error.response.data);
            });
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
                        <h3 className="fs-3 text-center fw-bold">Profile Details</h3>
                        <form onSubmit={handleSubmit}>
                            <input value={formData.name} onChange={handleChange} type="text" placeholder="User name.." name='name' />
                            <input value={formData.email} onChange={handleChange} type="email" placeholder="Email.." name='email' />
                            <input onChange={handleChange} type="password" placeholder="Password.." name='password' />
                            <p className='text-center text-warning mb-0'>{message}</p>
                            <p className="text-center mb-0">
                                <button type="submit" disabled={loading}>{loading ? "Loading" : "Update"}</button>
                            </p>
                            <p className="text-center  mb-0">
                                <Link className='btn w-100 p-1 btn-success' to="/listing">Create Listing</Link>
                            </p>
                        </form>
                        
                    </div>
                </div>
            </main>
        </>
    )
}

export default Profile;
