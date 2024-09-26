package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.College;
import com.example.demo.model.Course;
import com.example.demo.service.CollegeService;

@RestController
@CrossOrigin(origins = "*") 
@RequestMapping("/api")
public class CollegeController {
      @Autowired
    private CollegeService collegeService;

    @GetMapping("/colleges/courses")
    public ResponseEntity<List<College>> getCollegesByCourseName(@RequestParam("courseName") String courseName) {
        List<College> colleges = collegeService.getCollegesByCourseName(courseName);
        if (colleges.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(colleges, HttpStatus.OK);
    }

    @PostMapping("/college")
    public ResponseEntity<College> addCollege(@RequestBody College college) {
        College savedCollege = collegeService.addCollege(college);
        return new ResponseEntity<>(savedCollege, HttpStatus.CREATED);
    }

    
@GetMapping("/colleges")
public ResponseEntity<List<College>> getAllColleges() {
    List<College> colleges = collegeService.getAllColleges();
    return new ResponseEntity<>(colleges, HttpStatus.OK);
}

}
