package com.example.demo.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.College;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {
   
   @Query("SELECT c FROM College c JOIN c.courses course WHERE course.courseName = :courseName")
   List<College> findByCourseName(String courseName);
}

