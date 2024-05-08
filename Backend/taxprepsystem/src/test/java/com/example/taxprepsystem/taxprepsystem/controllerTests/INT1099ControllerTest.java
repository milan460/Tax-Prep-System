package com.example.taxprepsystem.taxprepsystem.controllerTests;

import com.example.taxprepsystem.taxprepsystem.controllers.INT1099Controller;
import com.example.taxprepsystem.taxprepsystem.models.INT1099;
import com.example.taxprepsystem.taxprepsystem.services.INT1099Service;
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
public class INT1099ControllerTest {

    @Mock
    private INT1099Service int1099Service;

    @InjectMocks
    private INT1099Controller int1099Controller;
    private AutoCloseable closeable;

    @BeforeEach
    public void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    public void tearDown() throws Exception {
        closeable.close();
    }

    // Test for getAllINT1099Forms()
    @Test
    public void testGetAllINT1099Forms() {
        // Arrange
        List<INT1099> expectedForms = Arrays.asList(new INT1099(), new INT1099());
        when(int1099Service.getAllINT1099Forms()).thenReturn(expectedForms);

        // Act
        ResponseEntity<List<INT1099>> response = int1099Controller.getAllINT1099Forms();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        assertEquals(expectedForms, response.getBody());
    }

    // Test for getINT1099FormById()
    @Test
    public void testGetINT1099FormById() {
        // Arrange
        int formId = 1;
        INT1099 expectedForm = new INT1099();
        when(int1099Service.getINT1099FormById(formId)).thenReturn(expectedForm);

        // Act
        ResponseEntity<INT1099> response = int1099Controller.getINT1099FormById(formId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedForm, response.getBody());
    }

    // Test for getINT1099FormByUserId()
    @Test
    public void testGetINT1099FormByUserId() {
        // Arrange
        int userId = 1;
        INT1099 expectedForm = new INT1099();
        when(int1099Service.getINT1099FormsByUserId(userId)).thenReturn(expectedForm);

        // Act
        ResponseEntity<INT1099> response = int1099Controller.getINT1099FormByUserId(userId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedForm, response.getBody());
    }

    // Test for createINT1099Form()
    @Test
    public void testCreateINT1099Form() {
        // Arrange
        INT1099 inputForm = new INT1099();
        INT1099 savedForm = new INT1099();
        when(int1099Service.saveINT1099Form(inputForm)).thenReturn(savedForm);

        // Act
        ResponseEntity<INT1099> response = int1099Controller.createINT1099Form(inputForm);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedForm, response.getBody());
    }

    // Test for updateINT1099Form()
    @Test
    public void testUpdateINT1099Form() {
        // Arrange
        INT1099 inputForm = new INT1099();
        int updatedCount = 1;
        when(int1099Service.updateINT1099Form(
                inputForm.getFormId(),
                inputForm.getPayerName(),
                inputForm.getInterestIncome(),
                inputForm.getFederalIncomeTaxWithheld(),
                inputForm.getSavingsBondsAndTreasuryInterest(),
                inputForm.getInvestmentExpenses(),
                inputForm.getMarketDiscount())).thenReturn(updatedCount);

        // Act
        ResponseEntity<Void> response = int1099Controller.updateINT1099Form(inputForm);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    // Test for updateINT1099FormByUserId()
    @Test
    public void testUpdateINT1099FormByUserId() {
        // Arrange
        int userId = 1;
        INT1099 inputForm = new INT1099();
        INT1099 updatedForm = new INT1099();
        when(int1099Service.updateINT1099FormByUserId(userId, inputForm)).thenReturn(updatedForm);

        // Act
        ResponseEntity<INT1099> response = int1099Controller.updateINT1099FormByUserId(userId, inputForm);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedForm, response.getBody());
    }

    // Test for deleteINT1099Form()
    @Test
    public void testDeleteINT1099Form() {
        // Arrange
        int formId = 1;
        doNothing().when(int1099Service).deleteINT1099Form(formId);

        // Act
        ResponseEntity<Void> response = int1099Controller.deleteINT1099Form(formId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }



}
