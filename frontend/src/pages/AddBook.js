import React, { useState } from 'react';
import axios from 'axios';

export default function AddBook() {
  // for saved msg
      const [Done, setDone] = useState(false)
  
  // this is use state hook intically data of all fields is null
  const [data, setData] = useState({
    bookname: "",
    description: "",
    author: "",
    image: "",
    price: ""
  });

  // this function is associated with input feilds if there any change in input this function works and recive event as an argument 
  const change = (e) => {
    // it destructure name and value from it 
    const { name, value } = e.target;
    // it concat data whcih is null initialy and concat it with the value of the element acording to the name for which it is called
    setData({ ...data, [name]: value });
  };

  // it is simplest function only used to disable submit button untils condition are not full filed
  const validateForm = () => {
    const { bookname, description, author, image, price } = data;
    if (
      !bookname || bookname.length < 3 ||
      !description || description.length < 100 ||
      !author || author.length < 3 ||
      !image ||
      !price || price <= 0
    ) {
      return false;
    }
    return true;
  };

  // on submit this function is called
  const submit = async (e) => {
    // it prevent it from refresing after from submittion 
    e.preventDefault();
    
    // it is not nessacry but chat gpt added it
    if (!validateForm()) {
      alert("Please add all required details with valid information.");
      return;
    }

    // it send add request to the server and add the data we sent in input 
    await axios.post('http://localhost:3001/api/v1/add', data)
      .then(() => {
        // afer adding it disl=play msg
 // diplaying save msg for a second
 setTimeout(() => {
  setDone(true);  // Show "Saved" message
  setTimeout(() => setDone(false), 500); // Hide "Saved" after 0/.5 second
}, 500);        // after adding data it again make the data values null
        setData({
          bookname: "",
          description: "",
          author: "",
          image: "",
          price: ""
        });
      })
      .catch((err) => {
        // error ms will display if data not added
        alert("Error adding data: " + err.message);
      });
  };

  return (
    // main container
    <div className="Home-page d-flex justify-content-center align-items-center bg-dark mb-3"
      style={{ minHeight: "91.5vh" }}>

     {/* form i copied from bootstrap */}
      <div className="text-white container px-5" style={{
        marginTop: '80px',
        marginBottom: '20px',
        padding: '10px',
        paddingBottom:'5px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#1e1e1e',
        maxWidth:'80%'
      }}>
            {/* heading */}
        <h4 className="text-center  my-0">Add a New Book</h4>

        <div className='my-1'>
          <label htmlFor="bookname" className="form-label mb-0">Book Name</label>
          <input
            type="text"
            className="form-control"
            id="bookname"
            placeholder="Enter book name"
            name='bookname'
            value={data.bookname} // value inside is equal to data of book name
            onChange={change}  // change event is called on change
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '8px',
              backgroundColor: '#f9f9f9',
              fontSize: '16px'
            }}
          />
        </div>

        <div className='my-1'>
          <label htmlFor="description" className="form-label mb-0">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Enter the book description"
            name="description"
            value={data.description}
            onChange={change}
            rows="2"
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '8px',
              backgroundColor: '#f9f9f9',
              fontSize: '16px'
            }}
          />
        </div>

        <div className='my-1'>
          <label htmlFor="author" className="form-label mb-0">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="Enter the name of the author"
            name='author'
            value={data.author}
            onChange={change}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '8px',
              backgroundColor: '#f9f9f9',
              fontSize: '16px'
            }}
          />
        </div>

        <div className='my-1'>
          <label htmlFor="image" className="form-label mb-0">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Enter the URL of the image"
            name='image'
            value={data.image}
            onChange={change}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '8px',
              backgroundColor: '#f9f9f9',
              fontSize: '16px'
            }}
          />
        </div>

        <div className='my-1'>
          <label htmlFor="price" className="form-label mb-0">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter the price of the book"
            name='price'
            value={data.price}
            onChange={change}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '8px',
              backgroundColor: '#f9f9f9',
              fontSize: '16px'
            }}
          />
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button
          
            className={`btn btn-success px-4 py-2 ${!validateForm() ? 'disabled' : ''}`} // hrer if condition not full fileed the from disaable class applied
            onClick={submit}
            // same as uper section 
            disabled={!validateForm()}
            style={{
              // styling added by chat gpt
              fontSize: '16px',
              borderRadius: '5px',
              padding: '8px 15px',
              cursor: !validateForm() ? 'not-allowed' : 'pointer', 
              backgroundColor: !validateForm() ? '#ccc' : '#28a745',
              transition: 'background-color 0.3s ease',
              width:'100%'
            }}
          >
            Submit
          </button>
        </div>
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
    </div>
  );
}
