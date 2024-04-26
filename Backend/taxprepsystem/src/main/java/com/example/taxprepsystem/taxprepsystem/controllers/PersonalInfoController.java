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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.taxprepsystem.taxprepsystem.models.PersonalInfo;
import com.example.taxprepsystem.taxprepsystem.services.PersonalInfoService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin
@RequestMapping("/personalForms")
public class PersonalInfoController {
    
    @Autowired
    PersonalInfoService personalInfoService;

    //Get request to retrieve a list of all personal info forms in the database
    @GetMapping
    public ResponseEntity<List<PersonalInfo>> getAllPersonalInfoForms() {
        List<PersonalInfo> personalInfoForms = personalInfoService.findAllPersonalInfoForms();
        return new ResponseEntity<List<PersonalInfo>>(personalInfoForms, HttpStatus.OK);
    }

    //Get request to retrieve a personal information form by the form id
    @GetMapping("/{id}")
    public ResponseEntity<PersonalInfo> getPersonalInfoFormsById(@PathVariable int id) {
        PersonalInfo personalInfo = personalInfoService.findPersonalInfoFormById(id);
        return new ResponseEntity<PersonalInfo>(personalInfo, HttpStatus.OK);
    }

    //Get request to retrieve a personal information form by the user id
    @GetMapping("/user/{userId}")
    public ResponseEntity<PersonalInfo> getPersonalInfoFormsByUserId(@PathVariable int userId) {
        PersonalInfo personalInfo = personalInfoService.findPersonalInfoFormByUserId(userId);
        return new ResponseEntity<PersonalInfo>(personalInfo, HttpStatus.OK);
    }

    //Post request to create a new personal information form 
    @PostMapping("/createPersonalForm")
    public ResponseEntity<PersonalInfo> createPersonalInfoForm(@RequestBody PersonalInfo PersonalInfo) {
        
        PersonalInfo newPersonalInfo = personalInfoService.createPersonalInfoForm(PersonalInfo);
        
        return new ResponseEntity<PersonalInfo>(newPersonalInfo, HttpStatus.CREATED);
    }

    //Put request to update a existing personal information form
    @PutMapping("/updatePersonalForm")
    public ResponseEntity<PersonalInfo> updatePersonalInfoForm(@RequestBody PersonalInfo PersonalInfo) {
        
        PersonalInfo updatedPersonalInfo = personalInfoService.updatePersonalInfoForm(PersonalInfo);
        
        return new ResponseEntity<PersonalInfo>(updatedPersonalInfo, HttpStatus.CREATED);
    }

    // Put request to update personal info based on userId
    @PutMapping("/updatePersonalInfo/{userId}")
    public ResponseEntity  <PersonalInfo> updatePersonalInfoByUserId(@PathVariable("userId") int userId, @RequestBody @Valid PersonalInfo personalInfo) {
        PersonalInfo updatedPersonalInfo = personalInfoService.updatePersonalInfoByUserId(userId, personalInfo);
        return new ResponseEntity<>(updatedPersonalInfo, HttpStatus.OK);  
    }

    //Delete request to delete an existing personal information form by id
    @DeleteMapping("/deletePersonalForm/{id}")
    public ResponseEntity<PersonalInfo> deletePersonalInfoForm(@PathVariable int id){

        personalInfoService.deletePersonalInfoForm(id);

        return ResponseEntity.noContent().build();
    }
}
