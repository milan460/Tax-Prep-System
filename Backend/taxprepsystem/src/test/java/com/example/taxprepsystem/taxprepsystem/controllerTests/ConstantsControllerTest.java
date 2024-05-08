package com.example.taxprepsystem.taxprepsystem.controllerTests;

import com.example.taxprepsystem.taxprepsystem.controllers.ConstantsController;
import com.example.taxprepsystem.taxprepsystem.models.Constants;
import com.example.taxprepsystem.taxprepsystem.services.ConstantsService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class ConstantsControllerTest {

    @Mock
    private ConstantsService constantsService;

    @InjectMocks
    private ConstantsController constantsController;
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
    public void testCreateConstants() {
        Constants inputConstants = new Constants();
        Constants savedConstants = new Constants();
        when(constantsService.createConstant(inputConstants)).thenReturn(savedConstants);

        ResponseEntity<Constants> response = constantsController.createConstants(inputConstants);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedConstants, response.getBody());
    }

    // Test for updateConstants()
    @Test
    public void testUpdateConstantsWhenSuccessful() {
        // Arrange
        Constants constantsToUpdate = new Constants();
        constantsToUpdate.setId(1);
        when(constantsService.updateConstant(anyInt(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any())).thenReturn(1);

        // Act
        ResponseEntity<Void> response = constantsController.updateConstants(constantsToUpdate);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdateConstantsWhenNotFound() {
        // Arrange
        Constants constantsToUpdate = new Constants();
        constantsToUpdate.setId(1);
        when(constantsService.updateConstant(anyInt(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any())).thenReturn(0);

        // Act
        ResponseEntity<Void> response = constantsController.updateConstants(constantsToUpdate);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    // Test for deleteConstant()
    @Test
    public void testDeleteConstant() {
        // Arrange
        int constId = 1;
        doNothing().when(constantsService).deleteConstant(constId);

        // Act
        ResponseEntity<Void> response = constantsController.deleteConstant(constId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}
