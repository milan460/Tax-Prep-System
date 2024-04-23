package com.example.taxprepsystem.taxprepsystem.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.taxprepsystem.taxprepsystem.models.INT1099;

import jakarta.transaction.Transactional;

@Repository
public interface INT1099Repository extends JpaRepository<INT1099, Integer>{

     // Update NEC1099 form
     @Transactional
     @Modifying
     @Query("UPDATE INT1099 nf SET nf.payerName = :payerName, nf.interestIncome = :interestIncome, "
             + "nf.federalIncomeTaxWithheld = :federalIncomeTaxWithheld, nf.savingsBondsAndTreasuryInterest = :savingsBondsAndTreasuryInterest, "
             + "nf.investmentExpenses = :investmentExpenses, nf.marketDiscount = :marketDiscount "
             + "WHERE nf.formId = :formId"
             )
     int updateINT1099Form(@Param("formId") int formId, @Param("payerName") String payerName,
            @Param("interestIncome") double interestIncome,
            @Param("federalIncomeTaxWithheld") double federalIncomeTaxWithheld,
            @Param("savingsBondsAndTreasuryInterest") double savingsBondsAndTreasuryInterest,
            @Param("investmentExpenses") double investmentExpenses,
            @Param("marketDiscount") double marketDiscount);
 
     // Get the NEC1099 form by userId
     @Query("SELECT nf FROM INT1099 nf WHERE nf.user.userId = :userId")
     Optional<INT1099> findByUserId(@Param("userId") int userId);
}
