import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Add.css';

const AddCollegeCourse = () => {
  const [collegeName, setCollegeName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseFee, setCourseFee] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [accommodationFee, setAccommodationFee] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCollegeCourse = {
      name: collegeName, 
      courses: [
        {
          courseName: courseName,           
          courseFee: courseFee,             
          courseDuration: courseDuration,  
          accommodation: accommodation,     
          accommodationFee: accommodationFee
        },
      ],
    };

    try {
      const response = await fetch('http://localhost:8080/api/college', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCollegeCourse),
      });

      if (response.ok) {
        setCollegeName('');
        setCourseName('');
        setCourseFee('');
        setCourseDuration('');
        setAccommodation('');
        setAccommodationFee('');
        toast.success('College and Course added successfully!');
      } else {
        toast.error('Failed to add College and Course');
      }
    } catch (error) {
      console.error('Error adding college and course:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add College and Course</h2>
        <div>
          <label>College Name:</label>
          <input
            type="text"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course Fee:</label>
          <input
            type="number"
            value={courseFee}
            onChange={(e) => setCourseFee(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course Duration (months):</label>
          <input
            type="text"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Accommodation Type (AC/Non-AC):</label>
          <input
            type="text"
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Accommodation Fee:</label>
          <input
            type="number"
            value={accommodationFee}
            onChange={(e) => setAccommodationFee(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add College and Course</button>
      </form>

      <ToastContainer />

      
      <button onClick={() => navigate('/colleges')}>Go to College List</button>
    </>
  );
};

export default AddCollegeCourse;
