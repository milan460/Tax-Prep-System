package com.example.taxprepsystem.taxprepsystem;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.taxprepsystem.taxprepsystem.models.Constants;
import com.example.taxprepsystem.taxprepsystem.repositories.ConstantsRepository;
import com.example.taxprepsystem.taxprepsystem.services.ConstantsService;

public class ConstantsServiceTest {

    @Mock
    private ConstantsRepository constantsRepository;

    @InjectMocks
    private ConstantsService constantsService;
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
    public void testGetAllConstants() {
        // Arrange
        List<Constants> expectedList = Arrays.asList(new Constants(), new Constants());
        when(constantsRepository.findAll()).thenReturn(expectedList);

        // Act
        List<Constants> result = constantsService.getAllConstants();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedList, result);
    }

    @Test
    public void testCreateConstant() {
        // Arrange
        Constants newConstant = new Constants();
        when(constantsRepository.save(newConstant)).thenReturn(newConstant);

        // Act
        Constants result = constantsService.createConstant(newConstant);

        // Assert
        assertNotNull(result);
        assertEquals(newConstant, result);
    }

    @Test
    public void testUpdateConstant() {
        // Arrange
        when(constantsRepository.updateConstants(anyInt(), anyDouble(), anyDouble(), anyDouble(), anyDouble(), anyDouble(), anyDouble(), anyDouble(), anyDouble(), anyDouble(), anyDouble())).thenReturn(1);

        // Act
        int result = constantsService.updateConstant(1, 100.0, 50.0, 70.0, 10.0, 20.0, 30.0, 40.0, 50.0, 60.0, 70.0);

        // Assert
        assertEquals(1, result);
        verify(constantsRepository, times(1)).updateConstants(1, 100.0, 50.0, 70.0, 10.0, 20.0, 30.0, 40.0, 50.0, 60.0, 70.0);
    }

    @Test
    public void testDeleteConstant() {
        // Arrange & Act
        constantsService.deleteConstant(1);

        // Assert
        verify(constantsRepository, times(1)).deleteById(1);
    }
}
