package com.example.taxprepsystem.taxprepsystem;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.taxprepsystem.taxprepsystem.models.INT1099;
import com.example.taxprepsystem.taxprepsystem.repositories.INT1099Repository;
import com.example.taxprepsystem.taxprepsystem.services.INT1099Service;

public class INT1099ServiceTest {

    @Mock
    private INT1099Repository int1099Repository;

    @InjectMocks
    private INT1099Service int1099Service;
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
    public void testGetAllINT1099Forms() {
        // Arrange
        List<INT1099> expectedList = Arrays.asList(new INT1099(), new INT1099());
        when(int1099Repository.findAll()).thenReturn(expectedList);

        // Act
        List<INT1099> result = int1099Service.getAllINT1099Forms();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedList, result);
    }

    @Test
    public void testGetINT1099FormByIdWhenFound() {
        // Arrange
        INT1099 expectedForm = new INT1099();
        when(int1099Repository.findById(1)).thenReturn(Optional.of(expectedForm));

        // Act
        INT1099 result = int1099Service.getINT1099FormById(1);

        // Assert
        assertNotNull(result);
        assertEquals(expectedForm, result);
    }

    @Test
    public void testGetINT1099FormByIdWhenNotFound() {
        // Arrange
        when(int1099Repository.findById(1)).thenReturn(Optional.empty());

        // Act
        INT1099 result = int1099Service.getINT1099FormById(1);

        // Assert
        assertNull(result);
    }

    @Test
    public void testGetINT1099FormsByUserIdWhenFound() {
        // Arrange
        INT1099 expectedForm = new INT1099();
        when(int1099Repository.findByUserId(1)).thenReturn(Optional.of(expectedForm));

        // Act
        INT1099 result = int1099Service.getINT1099FormsByUserId(1);

        // Assert
        assertNotNull(result);
        assertEquals(expectedForm, result);
    }

    @Test
    public void testGetINT1099FormsByUserIdWhenNotFound() {
        // Arrange
        when(int1099Repository.findByUserId(1)).thenReturn(Optional.empty());

        // Act
        INT1099 result = int1099Service.getINT1099FormsByUserId(1);

        // Assert
        assertNull(result);
    }

    @Test
    public void testSaveINT1099Form() {
        // Arrange
        INT1099 newForm = new INT1099();
        when(int1099Repository.save(newForm)).thenReturn(newForm);

        // Act
        INT1099 result = int1099Service.saveINT1099Form(newForm);

        // Assert
        assertNotNull(result);
        assertEquals(newForm, result);
    }

    @Test
    public void testUpdateINT1099Form() {
        // Arrange
        INT1099 existingForm = new INT1099();
        when(int1099Repository.updateINT1099Form(anyInt(), anyString(), anyDouble(), anyDouble(), anyDouble(), anyDouble(), anyDouble())).thenReturn(1);

        // Act
        int result = int1099Service.updateINT1099Form(1, "payerName", 100.0, 50.0, 20.0, 10.0, 5.0);

        // Assert
        assertEquals(1, result);
        verify(int1099Repository, times(1)).updateINT1099Form(1, "payerName", 100.0, 50.0, 20.0, 10.0, 5.0);
    }

    @Test
    public void testUpdateINT1099FormByUserId() {
        // Arrange
        INT1099 existingForm = new INT1099();
        when(int1099Repository.findByUserId(1)).thenReturn(Optional.of(existingForm));
        when(int1099Repository.save(existingForm)).thenReturn(existingForm);

        // Act
        INT1099 result = int1099Service.updateINT1099FormByUserId(1, existingForm);

        // Assert
        assertNotNull(result);
        assertEquals(existingForm, result);
    }

    @Test
    public void testDeleteINT1099Form() {
        // Arrange & Act
        int1099Service.deleteINT1099Form(1);

        // Assert
        verify(int1099Repository, times(1)).deleteById(1);
    }
}
