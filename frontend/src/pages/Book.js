import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import BookSection from '../components/BookSection';
export default function Book() {
  const [data, setData] = useState()
  // it is call automatically afer a component rerender
  useEffect(() => {
    const fetch = async () => {
      // wait until data is fetchedfrom backend
      await axios.get('http://localhost:3001/api/v1/get')
        .then((res) => {
          // data we set from book is asign to dta varable in usestate
          setData(res.data.books);
        })
        .catch((err) => {
          // if thereamy error it run
          console.error("Error fetching books:", err);
        });
    };

    fetch();
  }, []); // Added empty dependency array to run only once

  return (
    // main container
    <div className='bg-dark' style={{ minHeight: "91.5vh" }}>
      <div className='d-flex justify-content-center align-items-center py-3'>
        {/* heading  */}
        <h3 className='text-white'>BOOK SECTION</h3>
      </div>
      {/* logic to display spinner if data is not fetched */}
      {data ?
        <div className='text-white'>
          {/* passing data to book section  */}
          <BookSection data={data} />
          <div className='d-flex justify-content-center align-items-center py-3'>
          </div>
        </div>
        :
        <div className='text-white d-flex justify-content-center align-items-center m-6'>
          {/* spinner i have copied from bootsrap */}
          <div className="spinner-border text-light" role="status">
            <span className="sr-only"></span>
          </div>
        </div>}
    </div>
  );
}
