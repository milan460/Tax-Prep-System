package com.example.taxprepsystem.taxprepsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.taxprepsystem.taxprepsystem.models.Constants;

import jakarta.transaction.Transactional;

@Repository
public interface ConstantsRepository extends JpaRepository<Constants, Integer> {

    @Transactional
    @Modifying
    @Query("UPDATE Constants c SET c.dependentsConstant = :dependentsConstant, c.singleStatus = :singleStatus, " +
            "c.marriedStatus = :marriedStatus, c.taxBracket1 = :taxBracket1, c.taxBracket2 = :taxBracket2, " +
            "c.taxBracket3 = :taxBracket3, c.taxBracket4 = :taxBracket4, c.taxBracket5 = :taxBracket5, " +
            "c.taxBracket6 = :taxBracket6, c.taxBracket7 = :taxBracket7 WHERE c.id = :id")
    int updateConstants(@Param("id") int id, @Param("dependentsConstant") Double dependentsConstant,
            @Param("singleStatus") Double singleStatus, @Param("marriedStatus") Double marriedStatus,
            @Param("taxBracket1") Double taxBracket1, @Param("taxBracket2") Double taxBracket2,
            @Param("taxBracket3") Double taxBracket3, @Param("taxBracket4") Double taxBracket4,
            @Param("taxBracket5") Double taxBracket5, @Param("taxBracket6") Double taxBracket6,
            @Param("taxBracket7") Double taxBracket7);
}
