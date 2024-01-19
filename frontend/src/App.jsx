import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, json } from 'react-router-dom';
import Login from "./pages/Login"
import Home from './pages/Home';
import Register from './pages/Register';
import Footer from './components/Footer';
import Header from './components/Header';
import MiddleWare from './components/middleWare';
import Profile from './pages/Profile';
import Listing from './pages/Listing';
import UserListings from './pages/UserListings';
import ListingDetail from './pages/ListingDetail';
// http://www.dumingyu.info/modern_architecture01/HTML/contact.html

const App = () => {
 const [islogin,setIslogin] = useState(()=>{
  if (JSON.parse(localStorage.getItem("isloginesatateuser")) == null )return false
  else return true })
  return (
    <>
      <Router>
        <Header islogin = {islogin} setIslogin={setIslogin}/>
        <Routes>
          <Route  path='/login' element={<Login setIslogin={setIslogin} />} />
          <Route path='/register' element={<Register setIslogin={setIslogin} />} />
          <Route path='/' element={<Home />} />
          <Route path='details/:id' element={<ListingDetail />} />
          
          <Route element={<MiddleWare/>} >
          <Route path='/profile' element={<Profile />}  /> 
          <Route path='/listing' element={<Listing />}  /> 
          <Route path='/listing/:id' element={<Listing />} />
          <Route path='/my-listings' element={<UserListings />}  />
          </Route>
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App

