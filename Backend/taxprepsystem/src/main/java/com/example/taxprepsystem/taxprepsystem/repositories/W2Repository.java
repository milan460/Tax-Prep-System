package com.example.taxprepsystem.taxprepsystem.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.taxprepsystem.taxprepsystem.models.W2;

@Repository
public interface W2Repository extends JpaRepository<W2, Integer>{

    //custom query to retrieve w2 form by user id
    @Query("select w from W2 w where w.user.id = :userId")
    Optional<W2> findW2FormByUserId (@Param("userId") int userId);
}
