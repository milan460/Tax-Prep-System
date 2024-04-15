package com.example.taxprepsystem.taxprepsystem.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "w2_form")
public class W2 {
    
    @Id
    @Column(name = "form_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    @Min(0)
    private double income;

    @Column(name = "social_security_wages")
    @Min(0)
    private double socialSecurityWages;

    @Column(name = "medicare_wages")
    @Min(0)
    private double medicareWages;

    @Column(name = "social_security_tax_withheld")
    @Min(0)
    private double socialSecurityTaxWithheld;

    @Column(name = "medicare_tax_withheld")
    @Min(0)
    private double medicareTaxWithheld;

    @Column(name = "federal_income_withheld")
    @Min(0)
    private double federalIncomeWithheld;

    @Column(name = "w2_street_address_1")
    private String streetAddress1;

    @Column(name = "w2_street_address_2")
    private String streetAddress2;

    @Column(name = "w2_city")
    private String city;

    @Column(name = "w2_state")
    private String state;

    @Column(name = "w2_zip")
    private String zip;


    public W2(){

    }


    public W2(int id) {
        this.id = id;
    }


    public W2(int id, User user, @Min(0) double income, @Min(0) double socialSecurityWages,
            @Min(0) double medicareWages, @Min(0) double socialSecurityTaxWithheld, @Min(0) double medicareTaxWithheld,
            @Min(0) double federalIncomeWithheld, String streetAddress1, String streetAddress2, String city,
            String state, String zip) {
        this.id = id;
        this.user = user;
        this.income = income;
        this.socialSecurityWages = socialSecurityWages;
        this.medicareWages = medicareWages;
        this.socialSecurityTaxWithheld = socialSecurityTaxWithheld;
        this.medicareTaxWithheld = medicareTaxWithheld;
        this.federalIncomeWithheld = federalIncomeWithheld;
        this.streetAddress1 = streetAddress1;
        this.streetAddress2 = streetAddress2;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }


    public int getId() {
        return id;
    }


    public void setId(int id) {
        this.id = id;
    }


    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }


    public double getIncome() {
        return income;
    }


    public void setIncome(double income) {
        this.income = income;
    }


    public double getSocialSecurityWages() {
        return socialSecurityWages;
    }


    public void setSocialSecurityWages(double socialSecurityWages) {
        this.socialSecurityWages = socialSecurityWages;
    }


    public double getMedicareWages() {
        return medicareWages;
    }


    public void setMedicareWages(double medicareWages) {
        this.medicareWages = medicareWages;
    }


    public double getSocialSecurityTaxWithheld() {
        return socialSecurityTaxWithheld;
    }


    public void setSocialSecurityTaxWithheld(double socialSecurityTaxWithheld) {
        this.socialSecurityTaxWithheld = socialSecurityTaxWithheld;
    }


    public double getMedicareTaxWithheld() {
        return medicareTaxWithheld;
    }


    public void setMedicareTaxWithheld(double medicareTaxWithheld) {
        this.medicareTaxWithheld = medicareTaxWithheld;
    }


    public double getFederalIncomeWithheld() {
        return federalIncomeWithheld;
    }


    public void setFederalIncomeWithheld(double federalIncomeWithheld) {
        this.federalIncomeWithheld = federalIncomeWithheld;
    }


    public String getStreetAddress1() {
        return streetAddress1;
    }


    public void setStreetAddress1(String streetAddress1) {
        this.streetAddress1 = streetAddress1;
    }


    public String getStreetAddress2() {
        return streetAddress2;
    }


    public void setStreetAddress2(String streetAddress2) {
        this.streetAddress2 = streetAddress2;
    }


    public String getCity() {
        return city;
    }


    public void setCity(String city) {
        this.city = city;
    }


    public String getState() {
        return state;
    }


    public void setState(String state) {
        this.state = state;
    }


    public String getZip() {
        return zip;
    }


    public void setZip(String zip) {
        this.zip = zip;
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        long temp;
        temp = Double.doubleToLongBits(income);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(socialSecurityWages);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(medicareWages);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(socialSecurityTaxWithheld);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(medicareTaxWithheld);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(federalIncomeWithheld);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + ((streetAddress1 == null) ? 0 : streetAddress1.hashCode());
        result = prime * result + ((streetAddress2 == null) ? 0 : streetAddress2.hashCode());
        result = prime * result + ((city == null) ? 0 : city.hashCode());
        result = prime * result + ((state == null) ? 0 : state.hashCode());
        result = prime * result + ((zip == null) ? 0 : zip.hashCode());
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
        W2 other = (W2) obj;
        if (id != other.id)
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (Double.doubleToLongBits(income) != Double.doubleToLongBits(other.income))
            return false;
        if (Double.doubleToLongBits(socialSecurityWages) != Double.doubleToLongBits(other.socialSecurityWages))
            return false;
        if (Double.doubleToLongBits(medicareWages) != Double.doubleToLongBits(other.medicareWages))
            return false;
        if (Double.doubleToLongBits(socialSecurityTaxWithheld) != Double
                .doubleToLongBits(other.socialSecurityTaxWithheld))
            return false;
        if (Double.doubleToLongBits(medicareTaxWithheld) != Double.doubleToLongBits(other.medicareTaxWithheld))
            return false;
        if (Double.doubleToLongBits(federalIncomeWithheld) != Double.doubleToLongBits(other.federalIncomeWithheld))
            return false;
        if (streetAddress1 == null) {
            if (other.streetAddress1 != null)
                return false;
        } else if (!streetAddress1.equals(other.streetAddress1))
            return false;
        if (streetAddress2 == null) {
            if (other.streetAddress2 != null)
                return false;
        } else if (!streetAddress2.equals(other.streetAddress2))
            return false;
        if (city == null) {
            if (other.city != null)
                return false;
        } else if (!city.equals(other.city))
            return false;
        if (state == null) {
            if (other.state != null)
                return false;
        } else if (!state.equals(other.state))
            return false;
        if (zip == null) {
            if (other.zip != null)
                return false;
        } else if (!zip.equals(other.zip))
            return false;
        return true;
    }


    @Override
    public String toString() {
        return "W2 [id=" + id + ", user=" + user + ", income=" + income + ", socialSecurityWages=" + socialSecurityWages
                + ", medicareWages=" + medicareWages + ", socialSecurityTaxWithheld=" + socialSecurityTaxWithheld
                + ", medicareTaxWithheld=" + medicareTaxWithheld + ", federalIncomeWithheld=" + federalIncomeWithheld
                + ", streetAddress1=" + streetAddress1 + ", streetAddress2=" + streetAddress2 + ", city=" + city
                + ", state=" + state + ", zip=" + zip + "]";
    }

}
