package com.example.taxprepsystem.taxprepsystem.modelTests;

import com.example.taxprepsystem.taxprepsystem.models.INT1099;
import com.example.taxprepsystem.taxprepsystem.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class INT1099Test {

    private INT1099 int1099;
    private User user;

    @BeforeEach
    void setUp() {
        user = Mockito.mock(User.class);
        int1099 = new INT1099();
        int1099.setUser(user);
    }

    @Test
    void testFormId() {
        int formId = 1;
        int1099.setFormId(formId);
        assertEquals(formId, int1099.getFormId());
    }

    @Test
    void testUser() {
        when(user.getUserId()).thenReturn(1);
        assertEquals(1, int1099.getUser().getUserId());
    }

    @Test
    void testPayerName() {
        String payerName = "John Doe";
        int1099.setPayerName(payerName);
        assertEquals(payerName, int1099.getPayerName());
    }

    @Test
    void testInterestIncome() {
        double interestIncome = 5000.0;
        int1099.setInterestIncome(interestIncome);
        assertEquals(interestIncome, int1099.getInterestIncome(), 0.001);
    }

    @Test
    void testFederalIncomeTaxWithheld() {
        double federalIncomeTaxWithheld = 500.0;
        int1099.setFederalIncomeTaxWithheld(federalIncomeTaxWithheld);
        assertEquals(federalIncomeTaxWithheld, int1099.getFederalIncomeTaxWithheld(), 0.001);
    }

    @Test
    void testSavingsBondsAndTreasuryInterest() {
        double savingsBondsAndTreasuryInterest = 1000.0;
        int1099.setSavingsBondsAndTreasuryInterest(savingsBondsAndTreasuryInterest);
        assertEquals(savingsBondsAndTreasuryInterest, int1099.getSavingsBondsAndTreasuryInterest(), 0.001);
    }

    @Test
    void testInvestmentExpenses() {
        double investmentExpenses = 200.0;
        int1099.setInvestmentExpenses(investmentExpenses);
        assertEquals(investmentExpenses, int1099.getInvestmentExpenses(), 0.001);
    }

    @Test
    void testMarketDiscount() {
        double marketDiscount = 300.0;
        int1099.setMarketDiscount(marketDiscount);
        assertEquals(marketDiscount, int1099.getMarketDiscount(), 0.001);
    }
}
