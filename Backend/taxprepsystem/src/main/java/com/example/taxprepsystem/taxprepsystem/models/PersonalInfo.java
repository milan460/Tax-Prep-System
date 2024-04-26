package com.example.taxprepsystem.taxprepsystem.models;

import java.time.LocalDate;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "personal_info_form")
public class PersonalInfo {
    
    @Id
    @Column(name = "form_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column
    private String email;

    @Column(name = "street_address_1")
    private String streetAddress1;
    
    @Column(name = "street_address_2")
    private String streetAddress2;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String zip;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "social_security_number")
    private String ssn;

    @Column(name = "filing_status")
    private String filingStatus;

    public PersonalInfo(){

    }

    public PersonalInfo(int id) {
        this.id = id;
    }

    public PersonalInfo(int id, User user, String firstName, String lastName, String email, String streetAddress1,
            String streetAddress2, String city, String state, String zip, LocalDate dateOfBirth, String ssn,
            String filingStatus) {
        this.id = id;
        this.user = user;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.streetAddress1 = streetAddress1;
        this.streetAddress2 = streetAddress2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.dateOfBirth = dateOfBirth;
        this.ssn = ssn;
        this.filingStatus = filingStatus;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public String getFilingStatus() {
        return filingStatus;
    }

    public void setFilingStatus(String filingStatus) {
        this.filingStatus = filingStatus;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
        result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((streetAddress1 == null) ? 0 : streetAddress1.hashCode());
        result = prime * result + ((streetAddress2 == null) ? 0 : streetAddress2.hashCode());
        result = prime * result + ((city == null) ? 0 : city.hashCode());
        result = prime * result + ((state == null) ? 0 : state.hashCode());
        result = prime * result + ((zip == null) ? 0 : zip.hashCode());
        result = prime * result + ((dateOfBirth == null) ? 0 : dateOfBirth.hashCode());
        result = prime * result + ((ssn == null) ? 0 : ssn.hashCode());
        result = prime * result + ((filingStatus == null) ? 0 : filingStatus.hashCode());
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
        PersonalInfo other = (PersonalInfo) obj;
        if (id != other.id)
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (firstName == null) {
            if (other.firstName != null)
                return false;
        } else if (!firstName.equals(other.firstName))
            return false;
        if (lastName == null) {
            if (other.lastName != null)
                return false;
        } else if (!lastName.equals(other.lastName))
            return false;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
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
        if (dateOfBirth == null) {
            if (other.dateOfBirth != null)
                return false;
        } else if (!dateOfBirth.equals(other.dateOfBirth))
            return false;
        if (ssn == null) {
            if (other.ssn != null)
                return false;
        } else if (!ssn.equals(other.ssn))
            return false;
        if (filingStatus == null) {
            if (other.filingStatus != null)
                return false;
        } else if (!filingStatus.equals(other.filingStatus))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "PersonalInfo [id=" + id + ", user=" + user + ", firstName=" + firstName + ", lastName=" + lastName
                + ", email=" + email + ", streetAddress1=" + streetAddress1 + ", streetAddress2=" + streetAddress2
                + ", city=" + city + ", state=" + state + ", zip=" + zip + ", dateOfBirth=" + dateOfBirth + ", ssn="
                + ssn + ", filingStatus=" + filingStatus + "]";
    }
}
