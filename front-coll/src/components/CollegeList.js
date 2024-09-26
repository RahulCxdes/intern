import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CollegeList.css'; 

const CollegeList = () => {
  const [courseName, setCourseName] = useState('');
  const [collegeData, setCollegeData] = useState([]); 
  const [filteredColleges, setFilteredColleges] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const fetchAllColleges = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost:8080/api/colleges');
      const data = Array.isArray(response.data) ? response.data : [];
      setCollegeData(data);
      setFilteredColleges(data); 
    } catch (error) {
      console.error('Error fetching colleges:', error);
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCollegesByCourse = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost:8080/api/colleges/courses', {
        params: { courseName },
      });

      const data = Array.isArray(response.data) ? response.data : [];
      setFilteredColleges(data); 
    } catch (error) {
      console.error('Error fetching colleges:', error);
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAllColleges();
  }, []);

  return (
    <div className="college-list">
      <h1>All Colleges</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      

      <div className="box all-colleges">
        <h2>All Colleges</h2>
        <table className="min-w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">College Name</th>
              <th className="border border-gray-300 p-2">Course Name</th>
              <th className="border border-gray-300 p-2">Fee</th>
              <th className="border border-gray-300 p-2">Duration (months)</th>
              <th className="border border-gray-300 p-2">Accommodation</th>
              <th className="border border-gray-300 p-2">Accommodation Fee</th>
            </tr>
          </thead>
          <tbody>
            {collegeData.map((college) =>
              college.courses.map((course) => (
                <tr key={`${college.id}-${course.id}`}>
                  <td className="border border-gray-300 p-2">{college.name}</td>
                  <td className="border border-gray-300 p-2">{course.courseName}</td>
                  <td className="border border-gray-300 p-2">${course.courseFee}</td>
                  <td className="border border-gray-300 p-2">{course.courseDuration}</td>
                  <td className="border border-gray-300 p-2">{course.accommodation || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">${course.accommodationFee || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    
      <div className="box search-colleges">
        <h2>Search Colleges by Course Name</h2>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter course name"
          className="border border-gray-300 p-2 rounded"
        />
        <button onClick={fetchCollegesByCourse} className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {Array.isArray(filteredColleges) && filteredColleges.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">College Name</th>
                <th className="border border-gray-300 p-2">Course Name</th>
                <th className="border border-gray-300 p-2">Fee</th>
                <th className="border border-gray-300 p-2">Duration (months)</th>
                <th className="border border-gray-300 p-2">Accommodation</th>
                <th className="border border-gray-300 p-2">Accommodation Fee</th>
              </tr>
            </thead>
            <tbody>
              {filteredColleges.map((college) =>
                college.courses.map((course) => (
                  <tr key={`${college.id}-${course.id}`}>
                    <td className="border border-gray-300 p-2">{college.name}</td>
                    <td className="border border-gray-300 p-2">{course.courseName}</td>
                    <td className="border border-gray-300 p-2">${course.courseFee}</td>
                    <td className="border border-gray-300 p-2">{course.courseDuration}</td>
                    <td className="border border-gray-300 p-2">{course.accommodation || 'N/A'}</td>
                    <td className="border border-gray-300 p-2">${course.accommodationFee || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          !loading && <p>No colleges found for the course "{courseName}".</p>
        )}
      </div>

      
      <button onClick={() => navigate('/add-college-course')} className="mt-4 bg-green-500 text-white p-2 rounded">
        Add College and Course
      </button>
    </div>
  );
};

export default CollegeList;
