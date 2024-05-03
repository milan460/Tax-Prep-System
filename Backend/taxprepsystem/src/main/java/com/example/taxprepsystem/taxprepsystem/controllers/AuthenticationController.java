package com.example.taxprepsystem.taxprepsystem.controllers;

import com.example.taxprepsystem.taxprepsystem.models.User;
import com.example.taxprepsystem.taxprepsystem.services.UserService;

import jakarta.servlet.http.Cookie;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@CrossOrigin
public class AuthenticationController { //Authentication Controller to handle user registration, login, and logout


    // Autowire the UserService for user CRUD operations
    @Autowired
    private UserService userService;

    // Autowire the PasswordEncoder for encoding passwords
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Autowire the OAuth2AuthorizedClientService for OAuth2 operations
    @Autowired
    private OAuth2AuthorizedClientService clientService;

    @GetMapping("/currentUser")
    public User getCurrentUser(@AuthenticationPrincipal OAuth2User oAuth2User){
        User user = userService.findUserByUsername(oAuth2User.getAttribute("email"));

        return user;
    }


//    @GetMapping("/signin")
//    public RedirectView signIn(@AuthenticationPrincipal OAuth2User user) {
//        User existingUser;
//        User authUser = new User();
//        authUser.setUsername(user.getAttribute("name")); //change to email
//        try{
//           existingUser = userService.saveUser(authUser);
//        }
//        catch (RuntimeException e){
//            existingUser = userService.getUserByUsername(authUser.getUsername());
//            return new RedirectView("http://localhost:5173");
//        }
//        return new RedirectView("http://localhost:5173");
//    }



    @GetMapping("/signin")
    public RedirectView signIn(@AuthenticationPrincipal OAuth2User oAuth2User, Authentication auth, HttpServletResponse response) {

        //check if user exists in database
        User user = userService.findUserByUsername(oAuth2User.getAttribute("email"));
        if(user == null){ //add user to database if not found
            user = new User();
            user.setUsername(oAuth2User.getAttribute("email"));
            userService.saveUser(user);
        }

        if(auth instanceof OAuth2AuthenticationToken) {

            //casting the Authentication object to be a OAuth2AuthenticationToken object
            OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken)auth;

            // retrieving the authorized client with *this specific* Authentication Principal (each user is unique)
            OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(authToken.getAuthorizedClientRegistrationId(), authToken.getName());

            //setting up the cookie and adding to the response
            Cookie cookie = new Cookie("accessToken", client.getAccessToken().getTokenValue());
            cookie.setHttpOnly(true);
            response.addCookie(cookie);


            //returning the value of the token
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else{
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return new RedirectView("http://localhost:5173");
        }
        return new RedirectView("http://localhost:5173/personal-info-form");
    }




}