package com.example.taxprepsystem.taxprepsystem.controllerTests;

import com.example.taxprepsystem.taxprepsystem.controllers.W2Controller;
import com.example.taxprepsystem.taxprepsystem.models.W2;
import com.example.taxprepsystem.taxprepsystem.services.W2Service;
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
public class W2ControllerTest {
    @Mock
    private W2Service w2Service;

    @InjectMocks
    private W2Controller w2Controller;
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
    public void testGetAllW2Forms() {
        // Arrange
        List<W2> expectedW2Forms = Arrays.asList(new W2(), new W2());
        when(w2Service.findAllW2Forms()).thenReturn(expectedW2Forms);

        // Act
        ResponseEntity<List<W2>> response = w2Controller.getAllW2Forms();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        assertEquals(expectedW2Forms, response.getBody());
    }

    // Test for getW2FormsById()
    @Test
    public void testGetW2FormsById() {
        // Arrange
        int id = 1;
        W2 expectedW2Form = new W2();
        when(w2Service.findW2FormById(id)).thenReturn(expectedW2Form);

        // Act
        ResponseEntity<W2> response = w2Controller.getW2FormsById(id);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedW2Form, response.getBody());
    }

    // Test for getW2FormsByUserId()
    @Test
    public void testGetW2FormsByUserId() {
        // Arrange
        int userId = 1;
        W2 expectedW2Form = new W2();
        when(w2Service.findW2FormByUserId(userId)).thenReturn(expectedW2Form);

        // Act
        ResponseEntity<W2> response = w2Controller.getW2FormsByUserId(userId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedW2Form, response.getBody());
    }

    // Test for createW2Form()
    @Test
    public void testCreateW2Form() {
        // Arrange
        W2 inputW2Form = new W2();
        W2 savedW2Form = new W2();
        when(w2Service.createW2Form(inputW2Form)).thenReturn(savedW2Form);

        // Act
        ResponseEntity<W2> response = w2Controller.createW2Form(inputW2Form);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedW2Form, response.getBody());
    }

    // Test for updateW2Form()
    @Test
    public void testUpdateW2Form() {
        // Arrange
        W2 inputW2Form = new W2();
        W2 updatedW2Form = new W2();
        when(w2Service.updateW2Form(inputW2Form)).thenReturn(updatedW2Form);

        // Act
        ResponseEntity<W2> response = w2Controller.updateW2Form(inputW2Form);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(updatedW2Form, response.getBody());
    }

    // Test for updateW2FormByUserId()
    @Test
    public void testUpdateW2FormByUserId() {
        // Arrange
        int userId = 1;
        W2 formData = new W2();
        W2 updatedW2Form = new W2();
        when(w2Service.updateW2FormByUserId(userId, formData)).thenReturn(updatedW2Form);

        // Act
        ResponseEntity<W2> response = w2Controller.updateW2FormByUserId(userId, formData);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedW2Form, response.getBody());
    }

    // Test for deleteW2Form()
    @Test
    public void testDeleteW2Form() {
        // Arrange
        int id = 1;
        doNothing().when(w2Service).deleteW2Form(id);

        // Act
        ResponseEntity<W2> response = w2Controller.deleteW2Form(id);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}
