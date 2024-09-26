

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';  
import AddCollegeCourse from './components/AddCollegeCourse';
import CollegeList from './components/CollegeList';
import './App.css';


const App = () => {
  return (
    <BrowserRouter>
      <nav>
 
        <Link to="/colleges">View Colleges</Link>
        <Link to="/add-college-course">Add College and Course</Link>
      </nav>

      
      <Routes>
        <Route path="/colleges" element={<CollegeList />} />
        <Route path="/add-college-course" element={<AddCollegeCourse />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

