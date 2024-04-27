package com.example.taxprepsystem.taxprepsystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taxprepsystem.taxprepsystem.models.Constants;
import com.example.taxprepsystem.taxprepsystem.repositories.ConstantsRepository;

@Service
public class ConstantsService {

    @Autowired
    ConstantsRepository constantsRepository;

    // Get all Constants
    public List<Constants> getAllConstants() {
        return constantsRepository.findAll();
    }

    // Save a new constant
    public Constants createConstant(Constants constants) {
        return constantsRepository.save(constants);
    }

    // Update Constant
    public int updateConstant(int id, Double dependentsConstant, Double singleStatus, Double marriedStatus,
            Double taxBracket1, Double taxBracket2, Double taxBracket3,
            Double taxBracket4, Double taxBracket5, Double taxBracket6,
            Double taxBracket7) {
        return constantsRepository.updateConstants(id, dependentsConstant, singleStatus, marriedStatus,
                taxBracket1, taxBracket2, taxBracket3, taxBracket4, taxBracket5, taxBracket6, taxBracket7);
    }

    // Delete a Constant
    public void deleteConstant(int constId){
        constantsRepository.deleteById(constId);
    }
}
