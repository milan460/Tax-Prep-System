package com.example.taxprepsystem.taxprepsystem.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.Objects;

@Entity
@Table(name = "int_1099_form")
public class INT1099 {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "form_id")
    private int formId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @Column(name = "payer_name")
    private String payerName;

    @Column(name = "interest_income")
    private double interestIncome;

    @Column(name = "federal_income_tax_withheld")
    private double federalIncomeTaxWithheld;

    @Column(name = "savings_bonds_and_treasury_interest")
    private double savingsBondsAndTreasuryInterest;

    @Column(name = "investment_expenses")
    private double investmentExpenses;

    @Column(name = "market_discount")
    private double marketDiscount;
    

    public INT1099(){

    }

    public INT1099(User user, String payerName, double interestIncome, double federalIncomeTaxWithheld, double savingsBondsAndTreasuryInterest, double investmentExpenses, double marketDiscount) {
        this.user = user;
        this.payerName = payerName;
        this.interestIncome = interestIncome;
        this.federalIncomeTaxWithheld = federalIncomeTaxWithheld;
        this.savingsBondsAndTreasuryInterest = savingsBondsAndTreasuryInterest;
        this.investmentExpenses = investmentExpenses;
        this.marketDiscount = marketDiscount;
    }

    public INT1099(int formId, User user, String payerName, double interestIncome, double federalIncomeTaxWithheld, double savingsBondsAndTreasuryInterest, double investmentExpenses, double marketDiscount) {
        this.formId = formId;
        this.user = user;
        this.payerName = payerName;
        this.interestIncome = interestIncome;
        this.federalIncomeTaxWithheld = federalIncomeTaxWithheld;
        this.savingsBondsAndTreasuryInterest = savingsBondsAndTreasuryInterest;
        this.investmentExpenses = investmentExpenses;
        this.marketDiscount = marketDiscount;
    }

    public int getFormId() {
        return formId;
    }

    public void setFormId(int formId) {
        this.formId = formId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPayerName() {
        return payerName;
    }

    public void setPayerName(String payerName) {
        this.payerName = payerName;
    }

    public double getInterestIncome() {
        return interestIncome;
    }

    public void setInterestIncome(double interestIncome) {
        this.interestIncome = interestIncome;
    }

    public double getFederalIncomeTaxWithheld() {
        return federalIncomeTaxWithheld;
    }

    public void setFederalIncomeTaxWithheld(double federalIncomeTaxWithheld) {
        this.federalIncomeTaxWithheld = federalIncomeTaxWithheld;
    }

    public double getSavingsBondsAndTreasuryInterest() {
        return savingsBondsAndTreasuryInterest;
    }

    public void setSavingsBondsAndTreasuryInterest(double savingsBondsAndTreasuryInterest) {
        this.savingsBondsAndTreasuryInterest = savingsBondsAndTreasuryInterest;
    }

    public double getInvestmentExpenses() {
        return investmentExpenses;
    }

    public void setInvestmentExpenses(double investmentExpenses) {
        this.investmentExpenses = investmentExpenses;
    }

    public double getMarketDiscount() {
        return marketDiscount;
    }

    public void setMarketDiscount(double marketDiscount) {
        this.marketDiscount = marketDiscount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        INT1099 int1099 = (INT1099) o;
        return formId == int1099.formId && Double.compare(interestIncome, int1099.interestIncome) == 0 && Double.compare(federalIncomeTaxWithheld, int1099.federalIncomeTaxWithheld) == 0 && Double.compare(savingsBondsAndTreasuryInterest, int1099.savingsBondsAndTreasuryInterest) == 0 && Double.compare(investmentExpenses, int1099.investmentExpenses) == 0 && Double.compare(marketDiscount, int1099.marketDiscount) == 0 && Objects.equals(user, int1099.user) && Objects.equals(payerName, int1099.payerName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(formId, user, payerName, interestIncome, federalIncomeTaxWithheld, savingsBondsAndTreasuryInterest, investmentExpenses, marketDiscount);
    }

    @Override
    public String toString() {
        return "INT1099{" +
                "formId=" + formId +
                ", user=" + user +
                ", payerName='" + payerName + '\'' +
                ", interestIncome=" + interestIncome +
                ", federalIncomeTaxWithheld=" + federalIncomeTaxWithheld +
                ", savingsBondsAndTreasuryInterest=" + savingsBondsAndTreasuryInterest +
                ", investmentExpenses=" + investmentExpenses +
                ", marketDiscount=" + marketDiscount +
                '}';
    }
}
