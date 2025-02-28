import React, { useEffect ,useState } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import './Desc.css'

export default function Description() {
    const {id} = useParams();
    const [data, setData] = useState()
    // it is call automatically afer a component rerender
    useEffect(() => {
      const fetch = async () => {
        // wait until data is fetchedfrom backend
        await axios.get(`http://localhost:3001/api/v1/get/${id}`)
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
    }, [id]); // Added empty dependency array to run only once
    console.log(data)
    return (
        data ? (
            <div className="container mt-5 p-5 pb-0 mb-0 main-cont">
                <div className="d-flex flex-wrap m-auto">
                    <div className="d-flex justify-content-center align-items-center m-auto img-cont">
                        {/* Added a check to make sure that 'data.image' exists */}
                        <img src={data.image || ''} alt={data.bookname || 'Book'} className="img" />
                    </div>
                    <div className="py-3 m-auto text-white customStyle" style={{maxWidth:'400px'}}>
                        {/* Updated the text interpolation for the book name */}
                        <h2 className="bookheading">BookName : {data.bookname}</h2>
                        <p className="mt-4 mb-2 author"><strong>Author : </strong> {data.author}</p>
                        {/* Ensured the price is correctly formatted */}
                        <p className="price"><strong>Price :</strong> Rs. {data.price}</p>
                        {/* Updated to display the description correctly */}
                        <p><strong className="desc-heading">Description : </strong>{data.description}</p>
                    </div>
                </div>
            </div>
        ) : (
            // Corrected the empty fragment to render nothing
            <></>
        )
    );
    
}

