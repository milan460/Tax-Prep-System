package com.example.taxprepsystem.taxprepsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.taxprepsystem.taxprepsystem.models.User;

import jakarta.transaction.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.username = :newUsername, u.password = :newPassword, u.role = :newRole WHERE u.userId = :userId")
    int updateUser(@Param("userId") int userId,@Param("newUsername") String newUsername,@Param("newPassword") String newPassword,@Param("newRole") String newRole);

    Optional<User> findByUsername(String username);


}
