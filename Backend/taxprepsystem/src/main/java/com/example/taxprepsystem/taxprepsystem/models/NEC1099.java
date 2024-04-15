package com.example.taxprepsystem.taxprepsystem.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "nec_1099_form")
public class NEC1099 {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "form_id")
    private int formId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @Column(name = "payer_name")
    private String payerName;

    @Column(name = "payer_TIN")
    private String payerTIN;

    @Column(name = "payer_street_address")
    private String payerStreetAddress;

    @Column(name = "payer_city")
    private String payerCity;

    @Column(name = "payer_state")
    private String payerState;

    @Column(name = "payer_country")
    private String payerCountry;

    @Column(name = "payer_zip")
    private String payerZip;

    @Column(name = "recipient_TIN")
    private String recipientTIN;

    @Column(name = "recipient_street_address_1")
    private String recipientStreetAddress1;

    @Column(name = "recipient_street_address_2")
    private String recipientStreetAddress2;

    @Column(name = "recipient_city")
    private String recipientCity;

    @Column(name = "recipient_state")
    private String recipientState;

    @Column(name = "recipient_zip")
    private String recipientZip;

    @Column(name = "non_employee_compensation")
    private double nonEmployeeCompensation;

    @Column(name = "amount_withheld")
    private double amountWithheld;

    public NEC1099() {
    }

    public NEC1099(User user, String payerName, String payerTIN, String payerStreetAddress, String payerCity,
            String payerState, String payerCountry, String payerZip, String recipientTIN,
            String recipientStreetAddress1, String recipientStreetAddress2, String recipientCity, String recipientState,
            String recipientZip, double nonEmployeeCompensation, double amountWithheld) {
        this.user = user;
        this.payerName = payerName;
        this.payerTIN = payerTIN;
        this.payerStreetAddress = payerStreetAddress;
        this.payerCity = payerCity;
        this.payerState = payerState;
        this.payerCountry = payerCountry;
        this.payerZip = payerZip;
        this.recipientTIN = recipientTIN;
        this.recipientStreetAddress1 = recipientStreetAddress1;
        this.recipientStreetAddress2 = recipientStreetAddress2;
        this.recipientCity = recipientCity;
        this.recipientState = recipientState;
        this.recipientZip = recipientZip;
        this.nonEmployeeCompensation = nonEmployeeCompensation;
        this.amountWithheld = amountWithheld;
    }

    public NEC1099(int formId, User user, String payerName, String payerTIN, String payerStreetAddress,
            String payerCity, String payerState, String payerCountry, String payerZip, String recipientTIN,
            String recipientStreetAddress1, String recipientStreetAddress2, String recipientCity, String recipientState,
            String recipientZip, double nonEmployeeCompensation, double amountWithheld) {
        this.formId = formId;
        this.user = user;
        this.payerName = payerName;
        this.payerTIN = payerTIN;
        this.payerStreetAddress = payerStreetAddress;
        this.payerCity = payerCity;
        this.payerState = payerState;
        this.payerCountry = payerCountry;
        this.payerZip = payerZip;
        this.recipientTIN = recipientTIN;
        this.recipientStreetAddress1 = recipientStreetAddress1;
        this.recipientStreetAddress2 = recipientStreetAddress2;
        this.recipientCity = recipientCity;
        this.recipientState = recipientState;
        this.recipientZip = recipientZip;
        this.nonEmployeeCompensation = nonEmployeeCompensation;
        this.amountWithheld = amountWithheld;
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

    public String getPayerTIN() {
        return payerTIN;
    }

    public void setPayerTIN(String payerTIN) {
        this.payerTIN = payerTIN;
    }

    public String getPayerStreetAddress() {
        return payerStreetAddress;
    }

    public void setPayerStreetAddress(String payerStreetAddress) {
        this.payerStreetAddress = payerStreetAddress;
    }

    public String getPayerCity() {
        return payerCity;
    }

    public void setPayerCity(String payerCity) {
        this.payerCity = payerCity;
    }

    public String getPayerState() {
        return payerState;
    }

    public void setPayerState(String payerState) {
        this.payerState = payerState;
    }

    public String getPayerCountry() {
        return payerCountry;
    }

    public void setPayerCountry(String payerCountry) {
        this.payerCountry = payerCountry;
    }

    public String getPayerZip() {
        return payerZip;
    }

    public void setPayerZip(String payerZip) {
        this.payerZip = payerZip;
    }

    public String getRecipientTIN() {
        return recipientTIN;
    }

    public void setRecipientTIN(String recipientTIN) {
        this.recipientTIN = recipientTIN;
    }

    public String getRecipientStreetAddress1() {
        return recipientStreetAddress1;
    }

    public void setRecipientStreetAddress1(String recipientStreetAddress1) {
        this.recipientStreetAddress1 = recipientStreetAddress1;
    }

    public String getRecipientStreetAddress2() {
        return recipientStreetAddress2;
    }

    public void setRecipientStreetAddress2(String recipientStreetAddress2) {
        this.recipientStreetAddress2 = recipientStreetAddress2;
    }

    public String getRecipientCity() {
        return recipientCity;
    }

    public void setRecipientCity(String recipientCity) {
        this.recipientCity = recipientCity;
    }

    public String getRecipientState() {
        return recipientState;
    }

    public void setRecipientState(String recipientState) {
        this.recipientState = recipientState;
    }

    public String getRecipientZip() {
        return recipientZip;
    }

    public void setRecipientZip(String recipientZip) {
        this.recipientZip = recipientZip;
    }

    public double getNonEmployeeCompensation() {
        return nonEmployeeCompensation;
    }

    public void setNonEmployeeCompensation(double nonEmployeeCompensation) {
        this.nonEmployeeCompensation = nonEmployeeCompensation;
    }

    public double getAmountWithheld() {
        return amountWithheld;
    }

    public void setAmountWithheld(double amountWithheld) {
        this.amountWithheld = amountWithheld;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + formId;
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((payerName == null) ? 0 : payerName.hashCode());
        result = prime * result + ((payerTIN == null) ? 0 : payerTIN.hashCode());
        result = prime * result + ((payerStreetAddress == null) ? 0 : payerStreetAddress.hashCode());
        result = prime * result + ((payerCity == null) ? 0 : payerCity.hashCode());
        result = prime * result + ((payerState == null) ? 0 : payerState.hashCode());
        result = prime * result + ((payerCountry == null) ? 0 : payerCountry.hashCode());
        result = prime * result + ((payerZip == null) ? 0 : payerZip.hashCode());
        result = prime * result + ((recipientTIN == null) ? 0 : recipientTIN.hashCode());
        result = prime * result + ((recipientStreetAddress1 == null) ? 0 : recipientStreetAddress1.hashCode());
        result = prime * result + ((recipientStreetAddress2 == null) ? 0 : recipientStreetAddress2.hashCode());
        result = prime * result + ((recipientCity == null) ? 0 : recipientCity.hashCode());
        result = prime * result + ((recipientState == null) ? 0 : recipientState.hashCode());
        result = prime * result + ((recipientZip == null) ? 0 : recipientZip.hashCode());
        long temp;
        temp = Double.doubleToLongBits(nonEmployeeCompensation);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(amountWithheld);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        NEC1099 other = (NEC1099) obj;
        if (formId != other.formId)
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (payerName == null) {
            if (other.payerName != null)
                return false;
        } else if (!payerName.equals(other.payerName))
            return false;
        if (payerTIN == null) {
            if (other.payerTIN != null)
                return false;
        } else if (!payerTIN.equals(other.payerTIN))
            return false;
        if (payerStreetAddress == null) {
            if (other.payerStreetAddress != null)
                return false;
        } else if (!payerStreetAddress.equals(other.payerStreetAddress))
            return false;
        if (payerCity == null) {
            if (other.payerCity != null)
                return false;
        } else if (!payerCity.equals(other.payerCity))
            return false;
        if (payerState == null) {
            if (other.payerState != null)
                return false;
        } else if (!payerState.equals(other.payerState))
            return false;
        if (payerCountry == null) {
            if (other.payerCountry != null)
                return false;
        } else if (!payerCountry.equals(other.payerCountry))
            return false;
        if (payerZip == null) {
            if (other.payerZip != null)
                return false;
        } else if (!payerZip.equals(other.payerZip))
            return false;
        if (recipientTIN == null) {
            if (other.recipientTIN != null)
                return false;
        } else if (!recipientTIN.equals(other.recipientTIN))
            return false;
        if (recipientStreetAddress1 == null) {
            if (other.recipientStreetAddress1 != null)
                return false;
        } else if (!recipientStreetAddress1.equals(other.recipientStreetAddress1))
            return false;
        if (recipientStreetAddress2 == null) {
            if (other.recipientStreetAddress2 != null)
                return false;
        } else if (!recipientStreetAddress2.equals(other.recipientStreetAddress2))
            return false;
        if (recipientCity == null) {
            if (other.recipientCity != null)
                return false;
        } else if (!recipientCity.equals(other.recipientCity))
            return false;
        if (recipientState == null) {
            if (other.recipientState != null)
                return false;
        } else if (!recipientState.equals(other.recipientState))
            return false;
        if (recipientZip == null) {
            if (other.recipientZip != null)
                return false;
        } else if (!recipientZip.equals(other.recipientZip))
            return false;
        if (Double.doubleToLongBits(nonEmployeeCompensation) != Double.doubleToLongBits(other.nonEmployeeCompensation))
            return false;
        if (Double.doubleToLongBits(amountWithheld) != Double.doubleToLongBits(other.amountWithheld))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "NEC1099 [formId=" + formId + ", user=" + user + ", payerName=" + payerName + ", payerTIN=" + payerTIN
                + ", payerStreetAddress=" + payerStreetAddress + ", payerCity=" + payerCity + ", payerState="
                + payerState + ", payerCountry=" + payerCountry + ", payerZip=" + payerZip + ", recipientTIN="
                + recipientTIN + ", recipientStreetAddress1=" + recipientStreetAddress1 + ", recipientStreetAddress2="
                + recipientStreetAddress2 + ", recipientCity=" + recipientCity + ", recipientState=" + recipientState
                + ", recipientZip=" + recipientZip + ", nonEmployeeCompensation=" + nonEmployeeCompensation
                + ", amountWithheld=" + amountWithheld + "]";
    }

    
   
}
