import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserListings = () => {
  let [listings, setLitings] = useState([])
  const fetchData = async () => {
    try {
      console.log(JSON.parse(localStorage.getItem("esatateuser")).id);
      let formData = {
        "id": JSON.parse(localStorage.getItem("esatateuser")).id
      };
      let response = await axios.post('http://localhost:3000/api/user-listings', formData);
      console.log(response.data.data);
      setLitings(response.data.data)

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [])


  async function deleteListing(id, userRef, i) {
    let response = await axios.get(`http://localhost:3000/api/remove-listings/${id}/${userRef}`);
    if (response.data.result === "success") {
      document.querySelector(".row" + i).style.display = "none"
    }
  }


  return (
    <>
      <main className='main-content d-flex'>
        <div className="col-md-6 col-md-offset-1 m-auto">
          <div className="contact-form">
            <div className='d-flex justify-content-between'>
              <h3 className="fs-3 text-center fw-bold">Your Listings</h3>
              <p className="text-center  mb-0">
                <Link className='btn w-100 px-2 py-0 btn-success' to="/listing">Create New</Link>
              </p>
            </div>
            <table className="table table-dark">
              <tbody>
                {listings.length > 0 ? (
                  listings.map((e, i) => (
                    <tr key={i} className={`row${i}`}>
                      <td style={{ width: "100px" }}>
                        <img
                          style={{ width: "60px", height: "30px" }}
                          src={`http://localhost:3000/public/images/${e.images[0]}`}
                          alt=""
                        />
                      </td>
                      <td style={{ cursor: "pointer" }}>
                        <Link to={`/details/${e._id}`}>{e.title}</Link>
                      </td>
                      <td style={{ textAlign: "end" }}>
                        <Link to={`/listing/${e._id}`}>edit</Link>
                      </td>
                      <td style={{ textAlign: "end", width: "60px" }}>
                        <span
                          onClick={() => deleteListing(e._id, e.userRef, i)}
                          style={{ color: "red", cursor: "pointer" }}
                        >
                          delete
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      <Link className="w-100 px-2 pt-4 text-center m-auto d-block" to="/listing">
                        Create Your First Listing.
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </div>
        </div>
      </main>
    </>
  )
}

export default UserListings