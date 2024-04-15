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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.taxprepsystem.taxprepsystem.models.NEC1099;
import com.example.taxprepsystem.taxprepsystem.services.NEC1099Service;

@RestController
@CrossOrigin
@RequestMapping("/nec")
public class NEC1099Controller {

    @Autowired
    private NEC1099Service nec1099Service;

    // Get all NEC1099 forms
    @GetMapping
    public ResponseEntity<List<NEC1099>> getAllNEC1099Forms() {
        List<NEC1099> nec1099Forms = nec1099Service.getAllNEC1099Forms();
        return new ResponseEntity<>(nec1099Forms, HttpStatus.OK);
    }

    // Get NEC1099 form by ID
    @GetMapping("/{formId}")
    public ResponseEntity<NEC1099> getNEC1099FormById(@PathVariable int formId) {
        NEC1099 nec1099Form = nec1099Service.getNEC1099FormById(formId);
            return new ResponseEntity<>(nec1099Form, HttpStatus.OK);
    }

    // Get NEC1099 form by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<NEC1099> getNEC1099FormByUserId(@PathVariable int userId) {
        NEC1099 nec1099Form = nec1099Service.getNEC1099FormsByUserId(userId);
            return new ResponseEntity<>(nec1099Form, HttpStatus.OK);
    }

    // Create NEC1099 form
    @PostMapping("/createNECForm")
    public ResponseEntity<NEC1099> createNEC1099Form(@RequestBody NEC1099 form) {
        NEC1099 savedForm = nec1099Service.saveNEC1099Form(form);
        return new ResponseEntity<>(savedForm, HttpStatus.CREATED);
    }

    // Update NEC1099 form
    @PutMapping("/updateNECForm")
    public ResponseEntity<Void> updateNEC1099Form(@RequestBody NEC1099 form) {
        int updatedCount = nec1099Service.updateNEC1099Form(form.getFormId(), form.getPayerName(), form.getPayerTIN(), form.getPayerStreetAddress(),
                form.getPayerCity(), form.getPayerState(), form.getPayerCountry(), form.getPayerZip(), form.getRecipientTIN(),
                form.getRecipientStreetAddress1(), form.getRecipientStreetAddress2(), form.getRecipientCity(), form.getRecipientState(),
                form.getRecipientZip(), form.getNonEmployeeCompensation(), form.getAmountWithheld());
        if (updatedCount > 0) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete NEC1099 form
    @DeleteMapping("/deleteNECForm/{formId}")
    public ResponseEntity<Void> deleteNEC1099Form(@PathVariable int formId) {
        nec1099Service.deleteNEC1099Form(formId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
