package com.example.taxprepsystem.taxprepsystem.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taxprepsystem.taxprepsystem.models.W2;
import com.example.taxprepsystem.taxprepsystem.repositories.W2Repository;

@Service
public class W2Service {

    @Autowired
    W2Repository w2Repository;

    //retrieving w2 form by the form id
    public W2 findW2FormById(int id){

        Optional<W2> w2Form = w2Repository.findById(id);

        if(w2Form.isPresent()){
            return w2Form.get();
        }

        return null;
    }

    //retrieve all w2 form from the database
    public List<W2> findAllW2Forms(){
        
        return w2Repository.findAll();
    }

    //retrieve w2 form by the user id
    public W2 findW2FormByUserId(int userId){

        Optional<W2> w2Form = w2Repository.findW2FormByUserId(userId);

        if(w2Form.isPresent()){
            return w2Form.get();
        }

        return null;
    }

    //create w2 form and inserting into database
    public W2 createW2Form(W2 w2Form){

        return w2Repository.save(w2Form);
    }

    //update a W2 Form and updating it in the database
    public W2 updateW2Form(W2 w2Form){

        return w2Repository.save(w2Form);
    }

    // update W2 based on userId
    public W2 updateW2FormByUserId(int userId, W2 formData){
        Optional<W2> existingW2Optional = w2Repository.findW2FormByUserId(userId);
        if (existingW2Optional.isPresent()) {
            W2 existingW2Form = existingW2Optional.get();

            existingW2Form.setIncome(formData.getIncome());
            existingW2Form.setSocialSecurityWages(formData.getSocialSecurityWages());
            existingW2Form.setMedicareWages(formData.getMedicareWages());
            existingW2Form.setSocialSecurityTaxWithheld(formData.getSocialSecurityTaxWithheld());
            existingW2Form.setMedicareTaxWithheld(formData.getMedicareTaxWithheld());
            existingW2Form.setFederalIncomeWithheld(formData.getFederalIncomeWithheld());
            existingW2Form.setStreetAddress1(formData.getStreetAddress1());
            existingW2Form.setStreetAddress2(formData.getStreetAddress2());
            existingW2Form.setCity(formData.getCity());
            existingW2Form.setState(formData.getState());
            existingW2Form.setZip(formData.getZip());

            
            return w2Repository.save(existingW2Form);
        } 
           return null;
    }

    //delete the W2 form by id
    public void deleteW2Form(int id){
        
        W2 w2Form = findW2FormById(id); //finding the W2 form from the database using the id to delete
        w2Repository.delete(w2Form);

    }
}
