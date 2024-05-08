package com.example.taxprepsystem.taxprepsystem.controllerTests;

import com.example.taxprepsystem.taxprepsystem.controllers.PersonalInfoController;
import com.example.taxprepsystem.taxprepsystem.models.PersonalInfo;
import com.example.taxprepsystem.taxprepsystem.services.PersonalInfoService;
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

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class PersonalInfoControllerTest {
    @Mock
    private PersonalInfoService personalInfoService;

    @InjectMocks
    private PersonalInfoController personalInfoController;
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
    public void testGetAllPersonalInfoForms() {
        // Arrange
        List<PersonalInfo> expectedForms = Arrays.asList(new PersonalInfo(), new PersonalInfo());
        when(personalInfoService.findAllPersonalInfoForms()).thenReturn(expectedForms);

        // Act
        ResponseEntity<List<PersonalInfo>> response = personalInfoController.getAllPersonalInfoForms();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        assertEquals(expectedForms, response.getBody());
    }

    // Test for getPersonalInfoFormsById()
    @Test
    public void testGetPersonalInfoFormsById() {
        // Arrange
        int id = 1;
        PersonalInfo expectedForm = new PersonalInfo();
        when(personalInfoService.findPersonalInfoFormById(id)).thenReturn(expectedForm);

        // Act
        ResponseEntity<PersonalInfo> response = personalInfoController.getPersonalInfoFormsById(id);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedForm, response.getBody());
    }

    // Test for getPersonalInfoFormsByUserId()
    @Test
    public void testGetPersonalInfoFormsByUserId() {
        // Arrange
        int userId = 1;
        PersonalInfo expectedForm = new PersonalInfo();
        when(personalInfoService.findPersonalInfoFormByUserId(userId)).thenReturn(expectedForm);

        // Act
        ResponseEntity<PersonalInfo> response = personalInfoController.getPersonalInfoFormsByUserId(userId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedForm, response.getBody());
    }

    // Test for createPersonalInfoForm()
    @Test
    public void testCreatePersonalInfoForm() {
        // Arrange
        PersonalInfo inputForm = new PersonalInfo();
        PersonalInfo savedForm = new PersonalInfo();
        when(personalInfoService.createPersonalInfoForm(inputForm)).thenReturn(savedForm);

        // Act
        ResponseEntity<PersonalInfo> response = personalInfoController.createPersonalInfoForm(inputForm);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedForm, response.getBody());
    }

    // Test for updatePersonalInfoForm()
    @Test
    public void testUpdatePersonalInfoForm() {
        // Arrange
        PersonalInfo inputForm = new PersonalInfo();
        PersonalInfo updatedForm = new PersonalInfo();
        when(personalInfoService.updatePersonalInfoForm(inputForm)).thenReturn(updatedForm);

        // Act
        ResponseEntity<PersonalInfo> response = personalInfoController.updatePersonalInfoForm(inputForm);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(updatedForm, response.getBody());
    }

    // Test for updatePersonalInfoByUserId()
    @Test
    public void testUpdatePersonalInfoByUserId() {
        // Arrange
        int userId = 1;
        PersonalInfo inputForm = new PersonalInfo();
        PersonalInfo updatedForm = new PersonalInfo();
        when(personalInfoService.updatePersonalInfoByUserId(userId, inputForm)).thenReturn(updatedForm);

        // Act
        ResponseEntity<PersonalInfo> response = personalInfoController.updatePersonalInfoByUserId(userId, inputForm);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedForm, response.getBody());
    }

    // Test for deletePersonalInfoForm()
    @Test
    public void testDeletePersonalInfoForm() {
        // Arrange
        int id = 1;
        doNothing().when(personalInfoService).deletePersonalInfoForm(id);

        // Act
        ResponseEntity<PersonalInfo> response = personalInfoController.deletePersonalInfoForm(id);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}
