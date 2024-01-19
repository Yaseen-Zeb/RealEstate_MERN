import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="site-footer">
				<div className="container">
					<div className="pull-left">

						<address>
							<strong>Company Name</strong>
							<p>532 Avenue Street, Omaha</p>
						</address>

						<a href="#" className="phone">+ 1 800 931 033</a>
					</div> 
					<div className="pull-right">

						<div className="social-links">

							<a href="#"><i className="fa fa-facebook"></i></a>
							<a href="#"><i className="fa fa-google-plus"></i></a>
							<a href="#"><i className="fa fa-twitter"></i></a>
							<a href="#"><i className="fa fa-pinterest"></i></a>

						</div>

					</div>

					<div className="colophon">Copyright 2014 Company name. Designed by <a href="http://www.vandelaydesign.com/" title="Designed by VandelayDesign.com" target="_blank">VandelayDesign.com</a>. All rights reserved.</div>

				</div>
			</footer>
    </>
  )
}

export default Footer