package com.example.taxprepsystem.taxprepsystem.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.taxprepsystem.taxprepsystem.models.NEC1099;

import jakarta.transaction.Transactional;

@Repository
public interface NEC1099Repository extends JpaRepository<NEC1099, Integer>{

     // Update NEC1099 form
     @Transactional
     @Modifying
     @Query("UPDATE NEC1099 nf SET nf.payerName = :payerName, nf.payerTIN = :payerTIN, nf.payerStreetAddress = :payerStreetAddress, "
             +
             "nf.payerCity = :payerCity, nf.payerState = :payerState, nf.payerCountry = :payerCountry, nf.payerZip = :payerZip, "
             +
             "nf.recipientTIN = :recipientTIN, nf.recipientStreetAddress1 = :recipientStreetAddress1, nf.recipientStreetAddress2 = :recipientStreetAddress2, "
             +
             "nf.recipientCity = :recipientCity, nf.recipientState = :recipientState, nf.recipientZip = :recipientZip, "
             +
             "nf.nonEmployeeCompensation = :nonEmployeeCompensation, nf.amountWithheld = :amountWithheld "
             +
             "WHERE nf.formId = :formId")
     int updateNEC1099Form(@Param("formId") int formId, @Param("payerName") String payerName,
             @Param("payerTIN") String payerTIN,
             @Param("payerStreetAddress") String payerStreetAddress, @Param("payerCity") String payerCity,
             @Param("payerState") String payerState, @Param("payerCountry") String payerCountry,
             @Param("payerZip") String payerZip, @Param("recipientTIN") String recipientTIN,
             @Param("recipientStreetAddress1") String recipientStreetAddress1,
             @Param("recipientStreetAddress2") String recipientStreetAddress2,
             @Param("recipientCity") String recipientCity, @Param("recipientState") String recipientState,
             @Param("recipientZip") String recipientZip,
             @Param("nonEmployeeCompensation") double nonEmployeeCompensation,
             @Param("amountWithheld") double amountWithheld);
 
     // Get the NEC1099 form by userId
     @Query("SELECT nf FROM NEC1099 nf WHERE nf.user.userId = :userId")
     Optional<NEC1099> findByUserId(@Param("userId") int userId);
}
