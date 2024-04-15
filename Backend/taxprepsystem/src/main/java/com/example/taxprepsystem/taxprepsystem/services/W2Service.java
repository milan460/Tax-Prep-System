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

    //delete the W2 form by id
    public void deleteW2Form(int id){
        
        W2 w2Form = findW2FormById(id); //finding the W2 form from the database using the id to delete
        w2Repository.delete(w2Form);

    }
}
