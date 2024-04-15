package com.example.taxprepsystem.taxprepsystem.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.taxprepsystem.taxprepsystem.models.PersonalInfo;

@Repository
public interface PersonalInfoRepository extends JpaRepository<PersonalInfo, Integer>{

    //custom query to retrieve personal info form by user id
    @Query("select p from PersonalInfo p where p.user.id = :userId")
    Optional<PersonalInfo> findPersonalInfoFormByUserId (@Param("userId") int userId);

}
