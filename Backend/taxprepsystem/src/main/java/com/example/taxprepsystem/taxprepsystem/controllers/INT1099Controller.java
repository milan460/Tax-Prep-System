package com.example.taxprepsystem.taxprepsystem.controllers;

import java.util.List;

import jakarta.validation.Valid;
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

import com.example.taxprepsystem.taxprepsystem.models.INT1099;
import com.example.taxprepsystem.taxprepsystem.services.INT1099Service;

@RestController
@CrossOrigin
@RequestMapping("/1099")
public class INT1099Controller {

    @Autowired
    private INT1099Service int1099Service;

    // Get all INT1099 forms
    @GetMapping
    public ResponseEntity<List<INT1099>> getAllINT1099Forms() {
        List<INT1099> int1099Forms = int1099Service.getAllINT1099Forms();
        return new ResponseEntity<>(int1099Forms, HttpStatus.OK);
    }

    // Get INT1099 form by ID
    @GetMapping("/{formId}")
    public ResponseEntity<INT1099> getINT1099FormById(@PathVariable int formId) {
        INT1099 int1099Forms = int1099Service.getINT1099FormById(formId);
            return new ResponseEntity<>(int1099Forms, HttpStatus.OK);
    }

    // Get INT1099 form by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<INT1099> getINT1099FormByUserId(@PathVariable int userId) {
        INT1099 int1099Forms = int1099Service.getINT1099FormsByUserId(userId);
            return new ResponseEntity<>(int1099Forms, HttpStatus.OK);
    }

    // Create INT1099 form
    @PostMapping("/createINTForm")
    public ResponseEntity<INT1099> createINT1099Form(@RequestBody INT1099 form) {
        INT1099 savedForm = int1099Service.saveINT1099Form(form);
        return new ResponseEntity<>(savedForm, HttpStatus.CREATED);
    }

    // Update INT1099 form
    @PutMapping("/updateINTForm")
    public ResponseEntity<Void> updateINT1099Form(@RequestBody INT1099 form) {
        int updatedCount = int1099Service.updateINT1099Form(form.getFormId(), form.getPayerName(), form.getInterestIncome(), form.getFederalIncomeTaxWithheld(),
                form.getSavingsBondsAndTreasuryInterest(), form.getInvestmentExpenses(), form.getMarketDiscount());
        if (updatedCount > 0) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //update INT1099 form by userId
    @PutMapping("/updateINTForm/user/{userId}")
    public ResponseEntity<INT1099> updateINT1099FormByUserId(@PathVariable("userId") int userId, @RequestBody @Valid INT1099 form){
        INT1099 updatedINTForm = int1099Service.updateINT1099FormByUserId(userId, form);

        return new ResponseEntity<>(updatedINTForm, HttpStatus.OK);
    }

    // Delete INT1099 form
    @DeleteMapping("/deleteINTForm/{formId}")
    public ResponseEntity<Void> deleteINT1099Form(@PathVariable int formId) {
        int1099Service.deleteINT1099Form(formId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
