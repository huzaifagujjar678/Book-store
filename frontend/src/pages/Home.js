import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
export default function Home() {
  
  return (
    // main container
    <div className='Home-page  text-white container'>
      {/* sec 1 in which text and heading is displayed */}
      <div className='row container-fluid bg-dark'>
        <div className='col-md-12 col-lg-6 col-12 d-flex justify-content-center  flex-column bg-dark section sec1'>
          <h2 className='BookStore'>BOOK STORE </h2>
          <h3 className='forYou'>FOR YOU</h3>
          <p className='mb-0 silver'>check out the books from here</p>
          <Link className='viewBook my-3' to="/book" >View Books</Link>
        </div>
           {/* second sec in which image is displayed */}
        <div className='col-md-12 col-lg-6 col-12 d-flex justify-content-center flex-column bg-dark img-fluid section sec2 mt-5'>
          <img className='img-fluid mt-4 mb-2 mt-3  image' src="https://tse3.mm.bing.net/th?id=OIP.hUaCDuWAqM2zqcHr0RpNqgHaE8&pid=Api&P=0&h=180" alt="" />
        </div>
      </div>
    </div>
  )
}




