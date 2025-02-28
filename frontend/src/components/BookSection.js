import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// this is the most complex part of the whole code
export default function BookSection({ data }) {
    // we get data as props from Book.js and here set it in book variable
    const [books, setBooks] = useState(data);
    // it is use to selected by it is iniatly null
    const [selectedBook, setSelectedBook] = useState(null);

    // it is us to handle form data which is initaillay null and change butt using use effect hook it is pased to from most concept 
    const [formData, setFormData] = useState({
        bookname: '',
        description: '',
        author: '',
        image: '',
        price: '',
    });

    // it is used for from display initaily false and true in update funtion and fasle in canel on calling cancel or saved changes functiuon
    const [isEditing, setIsEditing] = useState(false);

    // it is used for save attribute runing after false it is inialty null and become true for a second if we click on save change and handle in update function
    const [Done, setDone] = useState(false)

    // is is call every time page reender evry time new book add it set it into books
    useEffect(() => {
        setBooks(data);
    }, [data]);


    // when we click on update book button of any book it is selected and its data is passed to the form
    useEffect(() => { 
        if (selectedBook) {
            setFormData({
                bookname: selectedBook.bookname,
                description: selectedBook.description,
                author: selectedBook.author,
                image: selectedBook.image,
                price: selectedBook.price,
            });
        }
    }, [selectedBook]);

    // on change handle function is called and it recieve handle input event 
    const handleInputChange = (e) => {
        // destructure id and value 
        const { id, value } = e.target;
        setFormData({
            // concat it with form data according to its id
            ...formData,
            [id]: value,
        });
    };

    // by clicking delete button it pass it by id
    const del = (id) => {
        const fetch = async () => {
            try {
                // request to server 
                await axios.delete(`http://localhost:3001/api/v1/delete/${id}`)
                    .then((res) => {
                        // filter the selected book from the all book 
                        setBooks(books.filter(book => book._id !== id));
                        // alert msg
                        alert('book deleted', res);
                    })
                    .catch((err) => {
                        // if error deleting book 
                        console.error("Error deleting books:", err);
                    });
            } catch (error) {
                // coding error
                console.error("Unexpected error:", error);
            }
        };

        fetch();
    };

    // if we click on update button it recive book id
    const update = (id) => {
        const fetch = async () => {
            try {
                // fetch book from server by it id 
                await axios.put(`http://localhost:3001/api/v1/update/${id}`)
                    .then((res) => {
                        // here we select by by its id and mke the state true
                        setSelectedBook(books.find(book => book._id === id));
                        // making from visible
                        setIsEditing(true);
                    })
                    // errror in serever
                    .catch((err) => {
                        console.error("Error updating books:", err);
                    });
            } catch (error) {
                // error in code
                console.error("Unexpected error:", error);
            }
        };

        fetch();
    };

// it is called if we click on saved button
    const saveChanges = () => {
        // not nessary but chat gpt added it
        if (!selectedBook) return;
    //   initailed object and putting the form data in object
        const updatedBook = {
            ...selectedBook,
            bookname: formData.bookname,
            description: formData.description,
            author: formData.author,
            image: formData.image,
            price: formData.price,
        };

        const fetch = async () => {
            try {
                // here we requesting to the server and the data of selected book by specific id in putt in the server
                await axios.put(`http://localhost:3001/api/v1/update/${selectedBook._id}`, updatedBook)
                    .then((res) => {
                        // here we find book by id and update data of that book
                        setBooks(books.map(book => book._id === selectedBook._id ? updatedBook : book));
                        // here the book we update is selected book 
                        setSelectedBook(updatedBook);
                        // disappering form after change 
                        setIsEditing(false);

                        // diplaying save msg for a second
                        setTimeout(() => {
                            setDone(true);  // Show "Saved" message
                            setTimeout(() => setDone(false), 500); // Hide "Saved" after 0/.5 second
                        }, 500);
                    })
                    .catch((err) => {
                        // if errror it would diplay
                        console.error("Error updating book:", err);
                    });
            } catch (error) {
                // if erro in code
                console.error("Unexpected error:", error);
            }
        };

        fetch();
    };

    // only to disapper from
    const cancelEdit = () => {
        setIsEditing(false);
    };

    return (
        <div>
            <div className='text-white d-flex justify-content-around align-items-center flex-wrap'>
                {
                    // here is the logic for displaying books and it is handle here
                    // if books are fetched than it work
                    // it itrates book with map method
                    books && books.map((itm, idx) => {
                        return (
                            // this animation and styling i copied from chat gpt
                            // main container
                            <div key={idx} className="my-2 mx-4" style={{
                                width: "220px", height: "440px", borderRadius: '15px',
                                boxShadow: 'rgb(237 237 237 / 94%) 0px 10px 20px',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            // ainimation copied from chat gpt
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {/* container for image display */}
                                <div style={{ height: '270px', width: '200px', overflow: 'hidden', borderRadius: '15px', margin: 'auto' }} >
                                    <div className='mt-2' style={{ display: 'block' }} >
                                        <img style={{
                                            width: "100%", height: '100%', objectFit: 'cover',
                                            transition: 'transform 0.3s ease'
                                        }}
                                            src={itm.image} alt="error"
                                            className='img-fluid' />
                                    </div>
                                </div>
                                 
                                <h6 className="mt-2 mb-0 mx-2" style={{
                                    fontSize: '20px', fontWeight: 'bold', color: 'white',
                                    textTransform: 'capitalize', overflow: 'hidden', textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap', maxWidth: '90%'
                                }}>
                                    {/* display itm logic */}
                                    {itm.bookname.length > 20 ? itm.bookname.slice(0, 20,) + '...' : itm.bookname}
                                </h6>

                                <p className="my-0 mb-0 mx-2 pt-0" style={{
                                    fontSize: '22px', fontWeight: '700', color: 'yellow',
                                    textAlign: 'left', lineHeight: '1.5'
                                }}>Rs. {itm.price}</p>

                                {/* div for discription and here we link it with the Description page */}
                                <div style={{ height: '59px', textDecoration: 'none' }}>
                                 <Link to={{
                                    // giving path
                                        pathname: '/description/'+itm._id,
                                    }} style={{textDecoration:'none'}}>
                                        <p className="my-0 mx-2 py-0" style={{
                                            fontSize: '12px', fontWeight: '700', color: 'white',
                                            textAlign: 'left', lineHeight: '1.5', textOverflow: 'hidden',
                                        }}>
                                            {/* logic for more thn 70 character */}
                                            {itm.description.length > 70 ? itm.description.slice(0, 70) + '...' : itm.description}
                                        </p>
                                    </Link>
                                </div>

                                {/* this is the div for button */}
                                <div className='d-flex justify-content-between align-items-center mx-2 mt-2'>
                                    <div className="btn btn-primary" style={{
                                        fontWeight: '600', padding: '5px 10px', fontSize: '12px',
                                        borderRadius: '5px', transition: 'background-color 0.3s ease'
                                    }} onClick={() => update(itm._id)} >
                                        UPDATE
                                    </div>

                                    <div className="btn btn-danger" style={{
                                        fontWeight: '600', padding: '5px 10px', fontSize: '12px',
                                        borderRadius: '5px', transition: 'background-color 0.3s ease'
                                    }} onClick={() => del(itm._id)} >
                                        DELETE
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            
            {/* this is from which is independent of other its positon is fixed andit opasity is low to apear as transparent */}
            {/* at first it is not visible becuse isEditing state is null initaly and nut if we click on update button the stae become true and it appear and if we clcik on cancel button or saved chanegs it become false*/}
            {isEditing && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '9999',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    width: '80%',
                    maxWidth: '400px',
                    minWidth: '300px',
                    borderRadius: '15px',
                    padding: '20px',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                }}>
                    <h3 className='text-center mt-1 pt-2 text-white'>Update Book Data</h3>
                    <div className='text-white container'>
                        <div className=''>
                            <label htmlFor="bookname" className="form-label">Book Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bookname"
                                value={formData.bookname}
                                onChange={handleInputChange}
                                placeholder='Enter book name'
                            />
                        </div>

                        <div className=''>
                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder='Enter the book description'
                            />
                        </div>

                        <div className=''>
                            <label htmlFor="author" className="form-label">Author</label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                value={formData.author}
                                onChange={handleInputChange}
                                placeholder='Enter the name of the author'
                            />
                        </div>

                        <div className=''>
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                                type="text"
                                className="form-control"
                                id="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder='Enter the URL of the image'
                            />
                        </div>

                        <div className=''>
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder='Enter the price of the book'
                            />
                        </div>

                       {/* these are button */}
                        <div className='d-flex justify-content-between align-items-center my-2'>
                            {/* on click save changes are called  */}
                            <button className='btn btn-success' onClick={saveChanges} >
                                Save Changes
                            </button>
                            <button className='btn btn-danger' onClick={cancelEdit} >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* it is logic to display save after the click of update button for a second  */}
            {Done && <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '9999',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                width: '10%',
                maxWidth: '100px',
                minWidth: '100px',
                borderRadius: '50%',
                padding: '20px',
                boxSizing: 'border-box',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)'
            }}>
                <div>Saved</div>

                <div class="spinner-border text-light " role="status">
                    <span class="visually-hidden">Saved</span>
                </div>
            </div>}
        </div>
    );
}
