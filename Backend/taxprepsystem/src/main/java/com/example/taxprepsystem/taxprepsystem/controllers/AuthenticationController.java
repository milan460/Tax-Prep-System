package com.example.taxprepsystem.taxprepsystem.controllers;

import com.example.taxprepsystem.taxprepsystem.models.User;
import com.example.taxprepsystem.taxprepsystem.services.UserService;

import jakarta.servlet.http.Cookie;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;


@RestController
@CrossOrigin("http://tyler-alex-milan-tax-system.skillstorm-congo.com:5173/")
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

    @Autowired
    private CsrfTokenRepository csrfTokenRepository;

    @GetMapping("/currentUser")
    public User getCurrentUser(@AuthenticationPrincipal OAuth2User oAuth2User) {
        User user = userService.findUserByUsername(oAuth2User.getAttribute("email"));

        return user;
    }


    @GetMapping("/signin")
    public RedirectView signIn(@AuthenticationPrincipal OAuth2User oAuth2User, Authentication auth, HttpServletResponse response, HttpServletRequest request) {

        //check if user exists in database
        User user = userService.findUserByUsername(oAuth2User.getAttribute("email"));
        if (user == null) { //add user to database if not found
            user = new User();
            user.setUsername(oAuth2User.getAttribute("email"));
            userService.saveUser(user);
        }

        if (auth instanceof OAuth2AuthenticationToken) {

            //generate csrf token
            CsrfToken csrfToken = csrfTokenRepository.generateToken(request);
            csrfTokenRepository.saveToken(csrfToken, request, response);


            //authorizing the client and returning the cookie with the access token
            //casting the Authentication object to be a OAuth2AuthenticationToken object
            OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) auth;

            // retrieving the authorized client with *this specific* Authentication Principal (each user is unique)
            OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(authToken.getAuthorizedClientRegistrationId(), authToken.getName());

            Cookie cookie = new Cookie("accessToken", client.getAccessToken().getTokenValue());
            Cookie csrfCookie = new Cookie("XSRF-TOKEN", csrfToken.getToken());

            csrfCookie.setPath("/");
            csrfCookie.setHttpOnly(false);
            cookie.setHttpOnly(false);

            response.addCookie(cookie);
            response.addCookie(csrfCookie);


            //returning the value of the token
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return new RedirectView("http://tyler-alex-milan-tax-system.skillstorm-congo.com:5173");
        }

        //Redirecting the admin to the admin page
        if (user.getRole().equals("ROLE_ADMIN")) {

            //creating a cookie with the role of the admin
            Cookie adminCookie = new Cookie("role", "admin");
            response.addCookie(adminCookie);
            return new RedirectView("http://tyler-alex-milan-tax-system.skillstorm-congo.com:5173/admin-page");

            //redirecting the user to the home page
        } else if (user.getRole().equals("ROLE_USER")) {
            return new RedirectView("http://tyler-alex-milan-tax-system.skillstorm-congo.com:5173/home");
        }
        //if the user is not found, redirect to the home page
        else {
            return new RedirectView("http://tyler-alex-milan-tax-system.skillstorm-congo.com:5173");
        }
    }
}


