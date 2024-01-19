import React, { useState } from 'react'

const Image = (props) => {

    let { id, setImageFiles, setImgerr, setAddedImages, addedImages, imageFiles, Image, isUpdate, setUpdateImages, updateImages } = props
    let [arr, setArr] = useState([]);

    let handleImages = (e) => {
        let image = e.target.files[0];
        let clickedElement = e.target.getAttribute("img")
        if (image !== undefined) {
            if (image.type.split("/")[0] !== "image") {
                setImgerr("Please select only images");
            } else {
                if (isUpdate != null) {
                    if (!updateImages.includes(id)) {
                        setUpdateImages((prev) => [...prev, id])
                    }
                }
                setImageFiles(prevImageFiles => ({
                    ...prevImageFiles,
                    [clickedElement]: image
                }));
                document.querySelector("." + clickedElement).src = URL.createObjectURL(image)
            }
        } else {
            delete imageFiles[clickedElement]
            document.querySelector("." + clickedElement).src = ""
        }
        setTimeout(() => {
            setImgerr("");
        }, 5000);
    }
    let removeImg = (i) => {
        delete imageFiles[i]
        delete addedImages[id]
        setAddedImages([...addedImages])
        addedImages = addedImages.filter(item => item !== undefined && Number.isInteger(item));
        console.log(addedImages);
        document.querySelector(".imgd" + id).style.display = "none"
    }

    return (
        <>
            <div className={`form-group mb-3 imgd${id}`} style={{ width: "26%" }}>
                <label className="d-block form-check-label" >
                    Image
                </label>
                <div className='d-flex'>
                    <input required={(isUpdate == "" || isUpdate==null)? true :false} style={{ width: "79%" }} onChange={handleImages} type="file" name='images' img={`img${id}`} className={`form-control-file col-10 mb-1`} />
                    <span className='col-2' style={{ width: "30%", height: "46px" }}>
                        <img className={`w-100 h-100 img${id}`} src={Image ? `http://localhost:3000/public/images/${Image}` : ""} alt="img" />
                    </span>
                </div>
                {id !== 0 ? <button onClick={() => removeImg(`img${id}`)} type='button' className='m-0 py-0 w-100'
                >remove</button> : ""}
            </div>
        </>
    )
}

export default Image