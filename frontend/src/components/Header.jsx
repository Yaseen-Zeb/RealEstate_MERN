import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';

const Header = (props) => {
	let { islogin,setIslogin } = props;
	let navigate = useNavigate(); 
	return (
		<>
			<div className="site-header">
				<div className="container">
					<a href="index.html" id="branding">
						<img src="images/logo.png" alt="" className="logo" />
						<div className="logo-text">
							<h1 className="site-title">Company Name</h1>
							<small className="site-description">Tagline goes here</small>
						</div>
					</a>

					<div className="main-navigation">
						<button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
						<ul className="menu">
							<li className="menu-item"><a href="index.html">Home</a></li>
							<li className="menu-item"><a href="news.html">News</a></li>
							<li className="menu-item"><a href="about.html">About</a></li>
							<li className="menu-item current-menu-item"><a href="contact.html">Contact</a></li>

							{
								islogin ?

									<div style={{ cursor: "pointer"}} className="dropdown open d-inline ">
										<span style={{
											padding: "40px 15px",
											textTransform: "uppercase",
										}} className="" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
											aria-expanded="false">
											Dropdown
										</span>
										<div style={{backgroundColor:"#585858"}} className="dropdown-menu" aria-labelledby="triggerId">
											<Link style={{color:"white",fontSize: "14px" }}  className="dropdown-item py-1 text-center px-0" to="/profile">My Profile</Link>
											<Link style={{color:"white",fontSize: "14px" }}  className="dropdown-item py-1 text-center px-0" to="./my-listings">My Listings</Link>
											<Link onClick={(e)=>{e.preventDefault(),localStorage.clear(),setIslogin(false),navigate("/login")}} style={{color:"white",fontSize: "14px" }}  className="dropdown-item py-1 text-center px-0">Logout</Link>
										</div>
									</div>
									:
									<li className="menu-item">
										<Link to="/login">SignIn</Link>
									</li>
							}
						</ul>
					</div>

					<div className="mobile-navigation"><ul className="menu">
						<li className="menu-item"><a href="index.html">Home</a></li>
						<li className="menu-item"><a href="news.html">News</a></li>
						<li className="menu-item"><a href="about.html">About</a></li>
						<li className="menu-item current-menu-item"><a href="contact.html">Contact</a></li>

					</ul></div>
				</div>
			</div>

		</>
	)
}

export default Header