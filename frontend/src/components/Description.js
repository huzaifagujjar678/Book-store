import React from 'react';
import { useLocation } from 'react-router-dom';
import './Desc.css'

export default function Description() {

    // use effect hook is use to access data from parent in link tag
    const location = useLocation();
    console.log(location.state);  // Check if the state is being passed correctly

    // if it receive data from the BookSection.js than this data will destructur here
    const { book, bookname, author, description, price, image } = location.state || {
        // if there no data received from the booksction than this will be used as deafult
        bookname: "Unknown",
        author: "Unknown",
        description: "No description available",
        price: "N/A",
        image: "https://tse3.mm.bing.net/th?id=OIP.zGwmhOTZXAWneFulgez-xAHaHa&pid=Api&P=0&h=180"
    }; // Get the book from state
    console.log(book)
    return (
        // main container
        <div className="container  mt-5 p-5 pb-0 mb-0 main-cont" >
            {/* first container for image */}
            <div className="d-flex flex-wrap m-auto">
                <div className="d-flex justify-content-center align-items-center m-auto img-cont">
                    <img src={image} alt={bookname} className='img' />
                </div>

               {/* second container for other details abot book */}
                <div className=' py-3 m-auto text-white customStyle'>
                    <h2 className='bookheading'>BookName : {bookname}</h2>
                    <p className='mt-4 mb-2 author'><strong>Author:</strong> {author}</p>
                    <p className='price'><strong>Price :</strong> Rs. {price}</p>
                    <p><strong className='desc-heading'>Description : </strong>{description}</p>
                </div>
            </div>
        </div>
    );
}
