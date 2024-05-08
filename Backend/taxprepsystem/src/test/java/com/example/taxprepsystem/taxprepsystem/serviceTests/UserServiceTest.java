package com.example.taxprepsystem.taxprepsystem.serviceTests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThrows;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.taxprepsystem.taxprepsystem.models.User;
import com.example.taxprepsystem.taxprepsystem.repositories.UserRepository;
import com.example.taxprepsystem.taxprepsystem.services.UserService;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;
    private AutoCloseable closeable;

    @BeforeEach
    public void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    public void tearDown() throws Exception {
        closeable.close();
    }

    @Test
    public void testLoadUserByUsernameWhenFound() {
        // Arrange
        User expectedUser = new User();
        when(userRepository.findByUsername("test")).thenReturn(Optional.of(expectedUser));

        // Act
        UserDetails result = userService.loadUserByUsername("test");

        // Assert
        assertNotNull(result);
        assertEquals(expectedUser, result);
    }

    @Test
    public void testLoadUserByUsernameWhenNotFound() {
        // Arrange
        when(userRepository.findByUsername("test")).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername("test"));
    }

    @Test
    public void testFindUserByUsername() {
        // Arrange
        User expectedUser = new User();
        when(userRepository.findByUsername("test")).thenReturn(Optional.of(expectedUser));

        // Act
        User result = userService.findUserByUsername("test");

        // Assert
        assertNotNull(result);
        assertEquals(expectedUser, result);
    }

    @Test
    public void testGetAllUsers() {
        // Arrange
        List<User> expectedList = Arrays.asList(new User(), new User());
        when(userRepository.findAll()).thenReturn(expectedList);

        // Act
        List<User> result = userService.getAllUsers();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedList, result);
    }

    @Test
    public void testGetUserByIdWhenFound() {
        // Arrange
        User expectedUser = new User();
        when(userRepository.findById(1)).thenReturn(Optional.of(expectedUser));

        // Act
        User result = userService.getUserById(1);

        // Assert
        assertNotNull(result);
        assertEquals(expectedUser, result);
    }

    @Test
    public void testGetUserByIdWhenNotFound() {
        // Arrange
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        // Act
        User result = userService.getUserById(1);

        // Assert
        assertNull(result);
    }

    @Test
    public void testSaveUser() {
        // Arrange
        User newUser = new User();
        when(userRepository.findByUsername(newUser.getUsername())).thenReturn(Optional.empty());
        when(userRepository.save(newUser)).thenReturn(newUser);

        // Act
        User result = userService.saveUser(newUser);

        // Assert
        assertNotNull(result);
        assertEquals(newUser, result);
    }

    @Test
    public void testSaveUserWhenUsernameExists() {
        // Arrange
        User existingUser = new User();
        when(userRepository.findByUsername(existingUser.getUsername())).thenReturn(Optional.of(existingUser));

        // Act and Assert
        assertThrows(RuntimeException.class, () -> userService.saveUser(existingUser));
    }


    @Test
    public void testUpdateUser() {
        // Arrange
        User existingUser = new User();
        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));
        when(userRepository.updateUser(anyInt(), anyString(), anyString(), anyString())).thenReturn(1);
                                                                                                        
        // Act
        int result = userService.updateUser(1, "newUsername", "newPassword", "newRole");

        // Assert
        assertEquals(1, result);
        verify(userRepository, times(1)).updateUser(1, "newUsername", "newPassword", "newRole");
    }

    @Test
    public void testDeleteUser() {
        // Arrange & Act
        userService.deleteUser(1);

        // Assert
        verify(userRepository, times(1)).deleteById(1);
    }
}