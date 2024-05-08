package com.example.taxprepsystem.taxprepsystem.modelTests;

import com.example.taxprepsystem.taxprepsystem.models.User;
import com.example.taxprepsystem.taxprepsystem.models.W2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class W2Test {

    private W2 w2;
    private User user;

    @BeforeEach
    void setUp() {
        user = Mockito.mock(User.class);
        w2 = new W2();
        w2.setUser(user);
    }

    @Test
    void testId() {
        int id = 1;
        w2.setId(id);
        assertEquals(id, w2.getId());
    }

    @Test
    void testUser() {
        when(user.getUserId()).thenReturn(1);
        assertEquals(1, w2.getUser().getUserId());
    }

    @Test
    void testIncome() {
        double income = 50000.0;
        w2.setIncome(income);
        assertEquals(income, w2.getIncome(), 0.001);
    }

    @Test
    void testSocialSecurityWages() {
        double socialSecurityWages = 6000.0;
        w2.setSocialSecurityWages(socialSecurityWages);
        assertEquals(socialSecurityWages, w2.getSocialSecurityWages(), 0.001);
    }

    @Test
    void testMedicareWages() {
        double medicareWages = 7000.0;
        w2.setMedicareWages(medicareWages);
        assertEquals(medicareWages, w2.getMedicareWages(), 0.001);
    }

    @Test
    void testSocialSecurityTaxWithheld() {
        double socialSecurityTaxWithheld = 800.0;
        w2.setSocialSecurityTaxWithheld(socialSecurityTaxWithheld);
        assertEquals(socialSecurityTaxWithheld, w2.getSocialSecurityTaxWithheld(), 0.001);
    }

    @Test
    void testMedicareTaxWithheld() {
        double medicareTaxWithheld = 900.0;
        w2.setMedicareTaxWithheld(medicareTaxWithheld);
        assertEquals(medicareTaxWithheld, w2.getMedicareTaxWithheld(), 0.001);
    }

    @Test
    void testFederalIncomeWithheld() {
        double federalIncomeWithheld = 1000.0;
        w2.setFederalIncomeWithheld(federalIncomeWithheld);
        assertEquals(federalIncomeWithheld, w2.getFederalIncomeWithheld(), 0.001);
    }

    @Test
    void testStreetAddress1() {
        String streetAddress1 = "123 Main St";
        w2.setStreetAddress1(streetAddress1);
        assertEquals(streetAddress1, w2.getStreetAddress1());
    }

    @Test
    void testStreetAddress2() {
        String streetAddress2 = "Apt 4B";
        w2.setStreetAddress2(streetAddress2);
        assertEquals(streetAddress2, w2.getStreetAddress2());
    }

    @Test
    void testCity() {
        String city = "Springfield";
        w2.setCity(city);
        assertEquals(city, w2.getCity());
    }

    @Test
    void testState() {
        String state = "IL";
        w2.setState(state);
        assertEquals(state, w2.getState());
    }

    @Test
    void testZip() {
        String zip = "12345";
        w2.setZip(zip);
        assertEquals(zip, w2.getZip());
    }
}

