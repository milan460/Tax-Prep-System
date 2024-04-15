package com.example.taxprepsystem.taxprepsystem.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taxprepsystem.taxprepsystem.models.User;
import com.example.taxprepsystem.taxprepsystem.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by userId
    public User getUserById(int userId) {
        Optional<User> user = userRepository.findById(userId);
        

        if(user.isPresent()){
            return user.get();
        }
        return null;
    }

    // Save a new user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Update a user
    public int updateUser(int userId, String newUsername, String newPassword, String newRole) {
        return userRepository.updateUser(userId, newUsername, newPassword, newRole);
    }

    // Delete a user
    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }
}
