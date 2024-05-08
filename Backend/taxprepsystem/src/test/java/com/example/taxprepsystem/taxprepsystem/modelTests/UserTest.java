package com.example.taxprepsystem.taxprepsystem.modelTests;

import com.example.taxprepsystem.taxprepsystem.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


public class UserTest {

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
    }

    @Test
    void testUserId() {
        int userId = 1;
        user.setUserId(userId);
        assertEquals(userId, user.getUserId());
    }

    @Test
    void testUsername() {
        String username = "testUser";
        user.setUsername(username);
        assertEquals(username, user.getUsername());
    }

    @Test
    void testPassword() {
        String password = "testPassword";
        user.setPassword(password);
        assertEquals(password, user.getPassword());
    }

    @Test
    void testRole() {
        String role = "USER";
        user.setRole(role);
        assertEquals(role, user.getRole());
    }

    @Test
    void testAuthorities() {
        String role = "USER";
        user.setRole(role);
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        SimpleGrantedAuthority userRole = new SimpleGrantedAuthority("ROLE_" + role);
        authorities.add(userRole);
        Collection<? extends GrantedAuthority> returnedAuthorities = user.getAuthorities();
        assertTrue(returnedAuthorities.containsAll(authorities) && authorities.containsAll(returnedAuthorities));
    }

    @Test
    void testAccountNonExpired() {
        assertTrue(user.isAccountNonExpired());
    }

    @Test
    void testAccountNonLocked() {
        assertTrue(user.isAccountNonLocked());
    }

    @Test
    void testCredentialsNonExpired() {
        assertTrue(user.isCredentialsNonExpired());
    }

    @Test
    void testEnabled() {
        assertTrue(user.isEnabled());
    }
}