package com.example.taxprepsystem.taxprepsystem.serviceTests;

import com.example.taxprepsystem.taxprepsystem.repositories.W2Repository;
import com.example.taxprepsystem.taxprepsystem.services.W2Service;
import com.example.taxprepsystem.taxprepsystem.models.W2;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class W2ServiceTest {

    @Mock
    private W2Repository w2Repository;

    @InjectMocks
    private W2Service w2Service;
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
    public void testFindW2FormByIdWhenFound() {
        //Arrange
        W2 expectedw2 = new W2();
        when(w2Repository.findById(1)).thenReturn(Optional.of(expectedw2));

        //Act
        W2 result = w2Service.findW2FormById(1);

        //Assert
        assertNotNull("The returned W2 Form should not be null", result);
        assertEquals("The returned W2 Form should be the expected W2 Form", expectedw2, result);
    }

    @Test
    public void testFindW2FormByIdWhenNotFound() {
        //Arrange
        when(w2Repository.findById(1)).thenReturn(Optional.empty());

        //Act
        W2 result = w2Service.findW2FormById(1);

        //Assert
        assertNull("The returned W2 Form should be null", result);
    }

    @Test
    public void testFindW2FormByUserIdWhenFound() {
        // Arrange
        W2 expectedW2 = new W2();
        when(w2Repository.findW2FormByUserId(1)).thenReturn(Optional.of(expectedW2));

        // Act
        W2 result = w2Service.findW2FormByUserId(1);

        // Assert
        assertNotNull(result);
        assertEquals(expectedW2, result);
    }

    @Test
    public void testFindW2FormByUserIdWhenNotFound() {
        // Arrange
        when(w2Repository.findW2FormByUserId(1)).thenReturn(Optional.empty());

        // Act
        W2 result = w2Service.findW2FormByUserId(1);

        // Assert
        assertNull(result);
    }

    @Test
    public void testFindAllW2Forms() {
        // Arrange
        List<W2> expectedList = Arrays.asList(new W2(), new W2());
        when(w2Repository.findAll()).thenReturn(expectedList);

        // Act
        List<W2> result = w2Service.findAllW2Forms();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedList, result);
    }

    @Test
    public void testCreateW2Form() {
        // Arrange
        W2 newW2 = new W2();
        when(w2Repository.save(newW2)).thenReturn(newW2);

        // Act
        W2 result = w2Service.createW2Form(newW2);

        // Assert
        assertNotNull(result);
        assertEquals(newW2, result);
    }

    @Test
    public void testUpdateW2Form() {
        // Arrange
        W2 existingW2 = new W2();
        when(w2Repository.save(existingW2)).thenReturn(existingW2);

        // Act
        W2 result = w2Service.updateW2Form(existingW2);

        // Assert
        assertNotNull(result);
        assertEquals(existingW2, result);
    }

    @Test
    public void testDeleteW2Form() {
        // Arrange
        W2 existingW2 = new W2();
        when(w2Repository.findById(1)).thenReturn(Optional.of(existingW2));
        doNothing().when(w2Repository).delete(existingW2);

        // Act
        w2Service.deleteW2Form(1);

        // Assert
        verify(w2Repository, times(1)).delete(existingW2);
    }
}
