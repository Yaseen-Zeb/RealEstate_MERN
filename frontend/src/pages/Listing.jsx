import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Image from '../components/Image';

const Listing = () => {
    let [imgerr, setImgerr] = useState("");
    let [imageFiles, setImageFiles] = useState({});
    let [addedImages, setAddedImages] = useState([0]);
    let [updateImages, setUpdateImages] = useState([]);
    let [formeErr, setFormErr] = useState("");
    let [btnText, setBtnText] = useState("Create");
    let [heading, setHeading] = useState("Create");
    let [loading, setLoading] = useState(false);
    let [formData, setFormData] = useState({
        "title": "",
        "description": "",
        "address": "",
        "bedrooms": 1,
        "bathrooms": 1,
        "type": "Rent",
        "price": 0,
        "parking": false,
        "offer": true
    });
    let navigate = useNavigate()

    function handleChange(e) {
        let { name, checked, value } = e.target
        if (name == "parking" || name == "offer") {
            setFormData({ ...formData, [name]: checked })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }
    async function handleSubmit(ele) {
        ele.preventDefault();
        let input = "";
        formData.images = imageFiles;
        formData.userRef = JSON.parse(localStorage.getItem("esatateuser")).id
        setLoading(true);
        const handleData = new FormData();
        handleData.append('title', formData.title);
        handleData.append('description', formData.description);
        handleData.append('address', formData.address);
        handleData.append('bedrooms', formData.bedrooms);
        handleData.append('bathrooms', formData.bathrooms);
        handleData.append('type', formData.type);
        handleData.append('price', formData.price);
        handleData.append('parking', formData.parking);
        handleData.append('offer', formData.offer);
        handleData.append('userRef', formData.userRef);
        for (let i = 0; i < Object.keys(imageFiles).length; i++) {
            handleData.append('images', imageFiles[Object.keys(imageFiles)[i]])
        }
        let response;
        if (id !== null || id !== "") {
            handleData.append('updateImages', updateImages);
            handleData.append('savedImages', savedImages);

            addedImages = addedImages.filter(item => item !== undefined);
            handleData.append('totalImages', addedImages);
            response = await axios.post(`http://localhost:3000/api/list/update/${id}`, handleData)
        } else {
            response = await axios.post(`http://localhost:3000/api/list/create`, handleData)
        }

        if (response) {
            if (response.data.result == "success") {
                setLoading(false);
                setFormErr(response.data.message);
                setTimeout(() => {
                    setFormErr("");
                    navigate("/my-listings")
                }, 4000);
            } else {
                setLoading(false);
                if (response.data.message) {
                    setFormErr(response.data.message);
                } else {
                    setFormErr(response.data.errors[0].msg);
                }
                setTimeout(() => {
                    setFormErr("");
                }, 4000);
            }
        }
    }
    const { id } = useParams();
    let [savedImages, setSavedImages] = useState([]);
    const fetchData = async () => {
        try {
            let response = await axios.get(`http://localhost:3000/api/listing/${id}`);
            if (response.data.result === "404") {
                navigate("/my-listings")
            } if (response.data.result === "success") {
                setSavedImages([...response.data.data.images])
                setAddedImages([])
                for (let i = 0; i < response.data.data.images.length; i++) {
                    setAddedImages((pre) => [...pre, i])
                }
                setFormData(response.data.data)
                setBtnText("Update")
                setHeading("Update")
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (id != null) {
            fetchData();
        }
    }, [])
    return (
        <>
            <main className='main-content m-auto col-6' >
                <div className="contact-form">
                    <h3 className="fs-3 text-center fw-bold">{heading} Listing</h3>
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="w-100 col-md-offset-1 m-auto">
                            <div className="form-group">
                                <label className="d-block form-check-label" >
                                    Title
                                </label>
                                <input onChange={handleChange} className='mt-1' type="text" placeholder="Title" name='title' value={formData.title} />
                            </div>
                            <div className="form-group">
                                <label className="d-block form-check-label" >
                                    Address
                                </label>
                                <input onChange={handleChange} className='mt-1' type="text" placeholder="Address" name='address' value={formData.address} />
                            </div>
                            <div className="form-group">
                                <label className="d-block form-check-label" >
                                    Description
                                </label>
                                <textarea onChange={handleChange} className='mt-1' name="description" rows="4" placeholder='Description' value={formData.description}></textarea>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="form-group col-3">
                                    <label className="d-block form-check-label w-100" >
                                        Type
                                    </label>
                                    <select onChange={handleChange} className='mt-1 w-100' name="type">
                                        <option value="Rent" style={{ color: "black" }}>Rent</option>
                                        <option value="Sell" style={{ color: "black" }}>Sell</option>
                                    </select>
                                </div>
                                <div className="form-group col-3" >
                                    <label className="d-block form-check-label " >
                                        Bed Rooms
                                    </label>
                                    <input onChange={handleChange} name='bedrooms' type="number" value={formData.bedrooms} />
                                </div>
                                <div className="form-group col-3">
                                    <label className="d-block form-check-label" >
                                        Bath Rooms
                                    </label>
                                    <input onChange={handleChange} name='bathrooms' type="number" value={formData.bathrooms} />
                                </div>

                            </div>
                            <div className="d-flex  justify-content-between align-items-center">
                                <div className="form-group col-3">
                                    <label className="d-block form-check-label " >
                                        Price/Month
                                    </label>
                                    <input onChange={handleChange} name='price' type="number" value={formData.price} />
                                </div>

                                <div className='d-flex col-3 justify-content-between' >
                                    <div className="form-check">
                                        <input style={{ width: "13px" }} className="form-check-input" type="checkbox" onChange={handleChange} name='parking' />
                                        <label className="d-block form-check-label" >
                                            Parking
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input style={{ width: "13px" }} className="form-check-input" type="checkbox" checked={formData.offer} onChange={handleChange} name='offer' />
                                        <label className="d-block form-check-label" >
                                            Offer
                                        </label>
                                    </div>
                                </div>
                                <button type='button' onClick={() => { setAddedImages([...addedImages, addedImages.length]) }}>Add image</button>
                            </div>

                            <div className="images-div d-flex justify-content-between flex-wrap">
                                





                                {
                                    id != ""
                                        ?
                                        addedImages.map((e, i) => {
                                            return <Image id={e} key={i} setImageFiles={setImageFiles} setImgerr={setImgerr} setAddedImages={setAddedImages} addedImages={addedImages} imageFiles={imageFiles} Image={savedImages[i]} isUpdate={id} setUpdateImages={setUpdateImages} updateImages={updateImages} />
                                        })
                                        :
                                        addedImages.map((e, i) => {
                                            return <Image id={e} key={i} setImageFiles={setImageFiles} setImgerr={setImgerr} setAddedImages={setAddedImages} addedImages={addedImages} imageFiles={imageFiles} />
                                        })
                                }
                            </div>
                        </div>
                        <div className='text-center text-warning'>{imgerr != "" ? imgerr : ""}</div>
                        <span className='text-warning my-1  w-100 text-center d-block'>{
                            formeErr !== "" ? formeErr : ""
                        }</span>
                        <span className='w-100 text-center d-block'>
                            <button className='w-50' type="submit" >{loading == true ? "Loading" : btnText}</button>
                        </span>


                    </form>
                    <p className="text-center  mb-0 w-50 m-auto">
                        <Link className='btn w-100 p-1 btn-success' to="/my-listings">My Listings</Link>
                    </p>
                </div>
            </main >
        </>
    )
}

export default Listing
