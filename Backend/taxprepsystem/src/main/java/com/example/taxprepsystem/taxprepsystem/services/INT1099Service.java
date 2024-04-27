package com.example.taxprepsystem.taxprepsystem.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taxprepsystem.taxprepsystem.models.INT1099;
import com.example.taxprepsystem.taxprepsystem.repositories.INT1099Repository;

@Service
public class INT1099Service {
    
    @Autowired
    private INT1099Repository int1099Repository;

     // Get all INT1099
     public List<INT1099> getAllINT1099Forms() {
        return (List<INT1099>) int1099Repository.findAll();
    }

    // Get INT1099 by ID
    public INT1099 getINT1099FormById(int formId) {
        Optional<INT1099> int1099 = int1099Repository.findById(formId);
        
        if(int1099.isPresent()){
            return int1099.get();
        }
        return null;
    }

     // Get INT1099 by userId
     public INT1099 getINT1099FormsByUserId(int userId) {
        Optional<INT1099> int1099 = int1099Repository.findByUserId(userId);

        if(int1099.isPresent()){
            return int1099.get();
        }
        return null;
    }

     // Save INT1099Form
     public INT1099 saveINT1099Form(INT1099 form) {
        return int1099Repository.save(form);
    }

    // Update a INT1099
    public int updateINT1099Form(int formId, String payerName, double interestIncome, double federalIncomeTaxWithheld, double savingsBondsAndTreasuryInterest, double investmentExpenses, double marketDiscount) {
        return int1099Repository.updateINT1099Form(formId, payerName, interestIncome, federalIncomeTaxWithheld, savingsBondsAndTreasuryInterest, investmentExpenses, marketDiscount);
    }

    //update INT1099 with userId
    public INT1099 updateINT1099FormByUserId(int userId, INT1099 form){
         Optional<INT1099> existingINT1099FormOptional = int1099Repository.findByUserId(userId);
         if(existingINT1099FormOptional.isPresent()){
             INT1099 existingINT1099Form = existingINT1099FormOptional.get();

             existingINT1099Form.setPayerName(form.getPayerName());
             existingINT1099Form.setInterestIncome(form.getInterestIncome());
             existingINT1099Form.setFederalIncomeTaxWithheld(form.getFederalIncomeTaxWithheld());
             existingINT1099Form.setSavingsBondsAndTreasuryInterest(form.getSavingsBondsAndTreasuryInterest());
             existingINT1099Form.setInvestmentExpenses(form.getInvestmentExpenses());
             existingINT1099Form.setMarketDiscount(form.getMarketDiscount());

             return int1099Repository.save(existingINT1099Form);

         }

         return null;
    }

    // Delete a INT1099
    public void deleteINT1099Form(int formId) {
        int1099Repository.deleteById(formId);
    }
}
