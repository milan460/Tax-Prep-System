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

import com.example.taxprepsystem.taxprepsystem.models.Constants;
import com.example.taxprepsystem.taxprepsystem.services.ConstantsService;

@RestController
@CrossOrigin
@RequestMapping("/constants")
public class ConstantsController {

    @Autowired
    ConstantsService constantsService;

    // Get a list of constants
    @GetMapping
    public ResponseEntity<List<Constants>> getAllConstants() {
        List<Constants> constants = constantsService.getAllConstants();
        return new ResponseEntity<>(constants, HttpStatus.OK);
    }

    // Create Constant
    @PostMapping("/createConstants")
    public ResponseEntity<Constants> createConstants(@RequestBody Constants constants) {
        Constants newConstants = constantsService.createConstant(constants);
        return new ResponseEntity<>(newConstants, HttpStatus.CREATED);
    }

    // Update Constant
    @PutMapping("/updateConstants")
    public ResponseEntity<Void> updateConstants(@RequestBody Constants constants) {
        int updateConstants = constantsService.updateConstant(constants.getId(), constants.getDependentsConstant(),
                constants.getSingleStatus(), constants.getMarriedStatus(), constants.getTaxBracket1(),
                constants.getTaxBracket2(), constants.getTaxBracket3(), constants.getTaxBracket4(),
                constants.getTaxBracket5(), constants.getTaxBracket6(), constants.getTaxBracket7());
        if (updateConstants > 0) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete Constant
    @DeleteMapping("/deleteConstant/{constantId}")
    public ResponseEntity<Void> deleteConstant(@PathVariable int constId){
        constantsService.deleteConstant(constId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
