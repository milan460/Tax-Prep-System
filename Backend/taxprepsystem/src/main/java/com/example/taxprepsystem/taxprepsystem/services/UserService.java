package com.example.taxprepsystem.taxprepsystem.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.taxprepsystem.taxprepsystem.models.User;
import com.example.taxprepsystem.taxprepsystem.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

    // User Service to handle user CRUD operations on users

    // Autowire the UserRepository for JPA operations
    @Autowired
    private UserRepository userRepository;


    //override the loadUserByUsername method to find a user by username and build a UserDetails object
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {


        Optional<User> user = userRepository.findByUsername(username);


        if(user.isPresent()){
            User existingUser = user.get();
            return existingUser;
        }
        else{
            throw new UsernameNotFoundException(username + " not found.");
        }

    }

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username).orElse(null);
    }

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
    public User saveUser(User user) throws RuntimeException{
       Optional<User> foundUser = userRepository.findByUsername(user.getUsername());
       if(foundUser.isPresent()){

           throw new RuntimeException("User with that username already exists.");
       }

       // Set the role of the user to ROLE_USER
        user.setRole("ROLE_USER");

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
