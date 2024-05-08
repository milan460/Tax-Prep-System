package com.example.taxprepsystem.taxprepsystem;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.example.taxprepsystem.taxprepsystem.models.User;
import com.example.taxprepsystem.taxprepsystem.services.UserService;

public class UserServiceTest {

    private static UserService userService;
    private User user1;
    private User user2;
    private User user3;

    @BeforeClass
    public static void setUpClass() {
        userService = new UserService();
    }

    @Before
    public void setUp() {
        user1 = new User("testuser1", "password1", "ROLE_USER");
        user2 = new User("testuser2", "password2", "ROLE_USER");
        user3 = new User("testuser3", "password3", "ROLE_ADMIN");

        userService.saveUser(user1);
        userService.saveUser(user2);
        userService.saveUser(user3);
    }

    @After
    public void tearDown() {
        userService.deleteUser(user1.getUserId());
        userService.deleteUser(user2.getUserId());
        userService.deleteUser(user3.getUserId());
    }

    @Test
    public void testFindUserByUsername_existingUser() {
        User foundUser = userService.findUserByUsername("testuser1");
        assertNotNull(foundUser);
        assertEquals(user1.getUsername(), foundUser.getUsername());
        assertEquals(user1.getPassword(), foundUser.getPassword());
        assertEquals(user1.getRole(), foundUser.getRole());
    }

    @Test
    public void testFindUserByUsername_nonExistingUser() {
        User foundUser = userService.findUserByUsername("nonexistent");
        assertNull(foundUser);
    }

    @Test
    public void testGetAllUsers() {
        List<User> allUsers = userService.getAllUsers();
        assertNotNull(allUsers);
        assertFalse(allUsers.isEmpty());
        assertEquals(3, allUsers.size());
    }

    @Test
    public void testGetUserById_existingUser() {
        User foundUser = userService.getUserById(user1.getUserId());
        assertNotNull(foundUser);
        assertEquals(user1.getUsername(), foundUser.getUsername());
        assertEquals(user1.getPassword(), foundUser.getPassword());
        assertEquals(user1.getRole(), foundUser.getRole());
    }

    @Test
    public void testGetUserById_nonExistingUser() {
        User foundUser = userService.getUserById(-1);
        assertNull(foundUser);
    }

    @Test
    public void testSaveUser_newUser() {
        User newUser = new User("newuser", "newpassword", "ROLE_USER");
        User savedUser = userService.saveUser(newUser);
        assertNotNull(savedUser);
        assertEquals(newUser.getUsername(), savedUser.getUsername());
        assertEquals(newUser.getPassword(), savedUser.getPassword());
        assertEquals(newUser.getRole(), savedUser.getRole());
    }

    @Test
    public void testSaveUser_existingUser() {
        User existingUser = new User("testuser1", "newpassword", "ROLE_USER");
        assertThrows(RuntimeException.class, () -> userService.saveUser(existingUser));
    }

    @Test
    public void testSaveAdmin_newAdmin() {
        User newAdmin = new User("newadmin", "newpassword", "ROLE_ADMIN");
        User savedAdmin = userService.saveAdmin(newAdmin);
        assertNotNull(savedAdmin);
        assertEquals(newAdmin.getUsername(), savedAdmin.getUsername());
        assertEquals(newAdmin.getPassword(), savedAdmin.getPassword());
        assertEquals(newAdmin.getRole(), savedAdmin.getRole());
    }

    @Test
    public void testSaveAdmin_existingAdmin() {
        User existingAdmin = new User("admin", "password", "ROLE_ADMIN");
        assertThrows(RuntimeException.class, () -> userService.saveAdmin(existingAdmin));
    }

    @Test
    public void testUpdateUser() {
        String newUsername = "updateduser";
        String newPassword = "newpassword";
        String newRole = "ROLE_USER";
        int updatedRows = userService.updateUser(user1.getUserId(), newUsername, newPassword, newRole);
        assertEquals(1, updatedRows);
        User updatedUser = userService.getUserById(user1.getUserId());
        assertNotNull(updatedUser);
        assertEquals(newUsername, updatedUser.getUsername());
        assertEquals(newPassword, updatedUser.getPassword());
        assertEquals(newRole, updatedUser.getRole());
    }

    @Test
    public void testDeleteUser() {
        userService.deleteUser(user3.getUserId());
        User deletedUser = userService.getUserById(user3.getUserId());
        assertNull(deletedUser);
    }
}