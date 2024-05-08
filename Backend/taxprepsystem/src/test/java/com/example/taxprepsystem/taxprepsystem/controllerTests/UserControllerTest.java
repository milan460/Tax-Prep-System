package com.example.taxprepsystem.taxprepsystem.controllerTests;


import com.example.taxprepsystem.taxprepsystem.controllers.UserController;
import com.example.taxprepsystem.taxprepsystem.models.User;
import com.example.taxprepsystem.taxprepsystem.services.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

public class UserControllerTest {
    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;
    private AutoCloseable closeable;

    @BeforeEach
    public void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    public void tearDown() throws Exception {
        closeable.close();
    }


    // Test for getAllUsers()
    @Test
    public void testGetAllUsers() {
        // Arrange
        List<User> expectedUsers = Arrays.asList(new User(), new User());
        when(userService.getAllUsers()).thenReturn(expectedUsers);

        // Act
        ResponseEntity<List<User>> response = userController.getAllUsers();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        assertEquals(expectedUsers, response.getBody());
    }

    // Test for getUserById()
    @Test
    public void testGetUserById() {
        // Arrange
        int userId = 1;
        User expectedUser = new User();
        when(userService.getUserById(userId)).thenReturn(expectedUser);

        // Act
        ResponseEntity<User> response = userController.getUserById(userId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedUser, response.getBody());
    }

    // Test for createUser()
    @Test
    public void testCreateUser() {
        // Arrange
        User inputUser = new User();
        User savedUser = new User();
        when(userService.saveUser(inputUser)).thenReturn(savedUser);

        // Act
        ResponseEntity<User> response = userController.createUser(inputUser);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedUser, response.getBody());
    }

    // Test for updateUser()
    @Test
    public void testUpdateUser() {
        // Arrange
        User inputUser = new User();
        int updatedCount = 1;
        when(userService.updateUser(inputUser.getUserId(), inputUser.getUsername(), inputUser.getPassword(), inputUser.getRole())).thenReturn(updatedCount);

        // Act
        ResponseEntity<Void> response = userController.updateUser(inputUser);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    // Test for deleteUser()
    @Test
    public void testDeleteUser() {
        // Arrange
        int userId = 1;
        doNothing().when(userService).deleteUser(userId);

        // Act
        ResponseEntity<Void> response = userController.deleteUser(userId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}
