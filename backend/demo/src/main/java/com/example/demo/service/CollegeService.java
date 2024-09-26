package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.College;
import com.example.demo.model.Course;
import com.example.demo.repository.CollegeRepository;

@Service
public class CollegeService {
    @Autowired
    private CollegeRepository collegeRepository;

    
    public List<College> getCollegesByCourseName(String courseName) {
        return collegeRepository.findByCourseName(courseName);
    }


      
      public List<College> getAllColleges() {
        return collegeRepository.findAll();
    }

    public College addCollege(College college) {
        
        for (Course course : college.getCourses()) {
            course.setCollege(college); 
        }
        return collegeRepository.save(college); 
    }
    
}
