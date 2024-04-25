package com.example.taxprepsystem.taxprepsystem.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.taxprepsystem.taxprepsystem.models.W2;
import com.example.taxprepsystem.taxprepsystem.services.W2Service;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@CrossOrigin
@RequestMapping("/w2Forms")


public class W2Controller {
    
    @Autowired
    W2Service w2Service;

    //Get request to retrieve a list of all W2 forms in the database
    @GetMapping
    public ResponseEntity<List<W2>> getAllW2Forms() {
        List<W2> w2Form = w2Service.findAllW2Forms();
        return new ResponseEntity<List<W2>>(w2Form, HttpStatus.OK);
    }

    //Get request to retrieve a W2 form by the form id
    @GetMapping("/{id}")
    public ResponseEntity<W2> getW2FormsById(@PathVariable int id) {
        W2 w2Form = w2Service.findW2FormById(id);
        return new ResponseEntity<W2>(w2Form, HttpStatus.OK);
    }

    //Get request to retrieve a W2 form by the user id
    @GetMapping("/user/{userId}")
    public ResponseEntity<W2> getW2FormsByUserId(@PathVariable int userId) {
        W2 w2Form = w2Service.findW2FormByUserId(userId);
        return new ResponseEntity<W2>(w2Form, HttpStatus.OK);
    }

    //Post request to create a new W2 form 
    @PostMapping("/createW2Form")
    public ResponseEntity<W2> createW2Form(@RequestBody W2 w2Form) {
        
        W2 newW2Form = w2Service.createW2Form(w2Form);
        
        return new ResponseEntity<W2>(newW2Form, HttpStatus.CREATED);
    }

    //Put request to update a existing W2 form
    @PutMapping("/updateW2Form")
    public ResponseEntity<W2> updateW2Form(@RequestBody W2 w2Form) {
        
        W2 updatedW2Form = w2Service.updateW2Form(w2Form);
        
        return new ResponseEntity<W2>(updatedW2Form, HttpStatus.CREATED);
    }

    // Put request to update a users W2 Form
    @PutMapping("/updateW2Form/{userId}")
    public ResponseEntity<W2> updateW2FormByUserId(@PathVariable("userId") int userId, @RequestBody @Valid W2 formData) {
            W2 updatedW2Form = w2Service.updateW2FormByUserId(userId, formData);
            return new ResponseEntity<>(updatedW2Form, HttpStatus.OK);  
    }

    //Delete request to delete an existing W2 form by id
    @DeleteMapping("/deleteW2Form/{id}")
    public ResponseEntity<W2> deleteW2Form(@PathVariable int id){

        w2Service.deleteW2Form(id);

        return ResponseEntity.noContent().build();
    }
}
