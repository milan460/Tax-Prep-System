package com.example.taxprepsystem.taxprepsystem;

import com.example.taxprepsystem.taxprepsystem.repositories.W2Repository;
import com.example.taxprepsystem.taxprepsystem.services.W2Service;
import com.example.taxprepsystem.taxprepsystem.models.W2;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

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
}
