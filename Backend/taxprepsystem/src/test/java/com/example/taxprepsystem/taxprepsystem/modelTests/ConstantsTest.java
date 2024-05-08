package com.example.taxprepsystem.taxprepsystem.modelTests;

import com.example.taxprepsystem.taxprepsystem.models.Constants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ConstantsTest {
    private Constants constants;

    @BeforeEach
    void setUp() {
        constants = new Constants();
    }

    @Test
    void testId() {
        int id = 1;
        constants.setId(id);
        assertEquals(id, constants.getId());
    }

    @Test
    void testDependentsConstant() {
        Double dependentsConstant = 1.0;
        constants.setDependentsConstant(dependentsConstant);
        assertEquals(dependentsConstant, constants.getDependentsConstant());
    }

    @Test
    void testSingleStatus() {
        Double singleStatus = 1.0;
        constants.setSingleStatus(singleStatus);
        assertEquals(singleStatus, constants.getSingleStatus());
    }

    @Test
    void testMarriedStatus() {
        Double marriedStatus = 1.0;
        constants.setMarriedStatus(marriedStatus);
        assertEquals(marriedStatus, constants.getMarriedStatus());
    }

    @Test
    void testTaxBracket1() {
        Double taxBracket1 = 1.0;
        constants.setTaxBracket1(taxBracket1);
        assertEquals(taxBracket1, constants.getTaxBracket1());
    }

    @Test
    void testTaxBracket2() {
        Double taxBracket2 = 1.0;
        constants.setTaxBracket2(taxBracket2);
        assertEquals(taxBracket2, constants.getTaxBracket2());
    }

    @Test
    void testTaxBracket3() {
        Double taxBracket3 = 1.0;
        constants.setTaxBracket3(taxBracket3);
        assertEquals(taxBracket3, constants.getTaxBracket3());
    }

    @Test
    void testTaxBracket4() {
        Double taxBracket4 = 1.0;
        constants.setTaxBracket4(taxBracket4);
        assertEquals(taxBracket4, constants.getTaxBracket4());
    }

    @Test
    void testTaxBracket5() {
        Double taxBracket5 = 1.0;
        constants.setTaxBracket5(taxBracket5);
        assertEquals(taxBracket5, constants.getTaxBracket5());
    }

    @Test
    void testTaxBracket6() {
        Double taxBracket6 = 1.0;
        constants.setTaxBracket6(taxBracket6);
        assertEquals(taxBracket6, constants.getTaxBracket6());
    }

    @Test
    void testTaxBracket7() {
        Double taxBracket7 = 1.0;
        constants.setTaxBracket7(taxBracket7);
        assertEquals(taxBracket7, constants.getTaxBracket7());
    }
}
