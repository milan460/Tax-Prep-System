package com.example.taxprepsystem.taxprepsystem.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taxprepsystem.taxprepsystem.models.PersonalInfo;
import com.example.taxprepsystem.taxprepsystem.repositories.PersonalInfoRepository;

@Service
public class PersonalInfoService {
    
    @Autowired
    PersonalInfoRepository personalInfoRepository;

    //find the Personal Info Form by its id
    public PersonalInfo findPersonalInfoFormById(int id){

        Optional<PersonalInfo> personalInfo = personalInfoRepository.findById(id);

        if(personalInfo.isPresent()){
            return personalInfo.get();
        }

        return null;
    } 


    //finding all Personal Info Forms from the database
    public List<PersonalInfo> findAllPersonalInfoForms(){
        return personalInfoRepository.findAll();
    }


    //finding Personal Information Form by the userId
    public PersonalInfo findPersonalInfoFormByUserId(int userId){

        Optional<PersonalInfo> personalInfo = personalInfoRepository.findPersonalInfoFormByUserId(userId);

        if(personalInfo.isPresent()){
            return personalInfo.get();
        }

        return null;
    }


    //creating a Personal Information Form and adding it to the database
    public PersonalInfo createPersonalInfoForm(PersonalInfo personalInfo){

        return personalInfoRepository.save(personalInfo);
    }

    //update a Personal Information Form and updating it in the database
    public PersonalInfo updatePersonalInfoForm(PersonalInfo personalInfo){

        return personalInfoRepository.save(personalInfo);
    }


    //deleting the Personal Information Form using the id
    public void deletePersonalInfoForm(int id){
        
        PersonalInfo personalInfo = findPersonalInfoFormById(id); //finding the Personal Info form from the database using the id to delete
        personalInfoRepository.delete(personalInfo);

    }
}
