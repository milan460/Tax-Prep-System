package com.example.taxprepsystem.taxprepsystem.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taxprepsystem.taxprepsystem.models.NEC1099;
import com.example.taxprepsystem.taxprepsystem.repositories.NEC1099Repository;

@Service
public class NEC1099Service {
    
    @Autowired
    private NEC1099Repository nec1099Repository;

     // Get all NEC1099
     public List<NEC1099> getAllNEC1099Forms() {
        return (List<NEC1099>) nec1099Repository.findAll();
    }

    // Get NEC1099 by ID
    public NEC1099 getNEC1099FormById(int formId) {
        Optional<NEC1099> nec1099 = nec1099Repository.findById(formId);
        
        if(nec1099.isPresent()){
            return nec1099.get();
        }
        return null;
    }

     // Get NEC1099 by userId
     public NEC1099 getNEC1099FormsByUserId(int userId) {
        Optional<NEC1099> nec1099 = nec1099Repository.findByUserId(userId);

        if(nec1099.isPresent()){
            return nec1099.get();
        }
        return null;
    }

     // Save NEC1099Form
     public NEC1099 saveNEC1099Form(NEC1099 form) {
        return nec1099Repository.save(form);
    }

    // Update a NEC1099
    public int updateNEC1099Form(int formId, String payerName, String payerTIN, String payerStreetAddress, String payerCity, String payerState, String payerCountry, String payerZip, String recipientTIN, String recipientStreetAddress1, String recipientStreetAddress2, String recipientCity, String recipientState, String recipientZip, double nonEmployeeCompensation, double amountWithheld) {
        return nec1099Repository.updateNEC1099Form(formId, payerName, payerTIN, payerStreetAddress, payerCity, payerState, payerCountry, payerZip, recipientTIN, recipientStreetAddress1, recipientStreetAddress2, recipientCity, recipientState, recipientZip, nonEmployeeCompensation, amountWithheld);
    }

    // Delete a NEC1099
    public void deleteNEC1099Form(int formId) {
        nec1099Repository.deleteById(formId);
    }
}
