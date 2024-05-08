package com.example.taxprepsystem.taxprepsystem.modelTests;

import com.example.taxprepsystem.taxprepsystem.models.PersonalInfo;
import com.example.taxprepsystem.taxprepsystem.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class PersonalInfoTest {

        private PersonalInfo personalInfo;
        private User user;

        @BeforeEach
        void setUp() {
            user = Mockito.mock(User.class);
            personalInfo = new PersonalInfo();
            personalInfo.setUser(user);
        }

        @Test
        void testId() {
            int id = 1;
            personalInfo.setId(id);
            assertEquals(id, personalInfo.getId());
        }

        @Test
        void testUser() {
            when(user.getUserId()).thenReturn(1);
            assertEquals(1, personalInfo.getUser().getUserId());
        }

        @Test
        void testFirstName() {
            String firstName = "John";
            personalInfo.setFirstName(firstName);
            assertEquals(firstName, personalInfo.getFirstName());
        }

        @Test
        void testLastName() {
            String lastName = "Doe";
            personalInfo.setLastName(lastName);
            assertEquals(lastName, personalInfo.getLastName());
        }

        @Test
        void testEmail() {
            String email = "john.doe@example.com";
            personalInfo.setEmail(email);
            assertEquals(email, personalInfo.getEmail());
        }

        @Test
        void testStreetAddress1() {
            String streetAddress1 = "123 Main St";
            personalInfo.setStreetAddress1(streetAddress1);
            assertEquals(streetAddress1, personalInfo.getStreetAddress1());
        }

        @Test
        void testStreetAddress2() {
            String streetAddress2 = "Apt 4B";
            personalInfo.setStreetAddress2(streetAddress2);
            assertEquals(streetAddress2, personalInfo.getStreetAddress2());
        }

        @Test
        void testCity() {
            String city = "Springfield";
            personalInfo.setCity(city);
            assertEquals(city, personalInfo.getCity());
        }

        @Test
        void testState() {
            String state = "IL";
            personalInfo.setState(state);
            assertEquals(state, personalInfo.getState());
        }

        @Test
        void testZip() {
            String zip = "12345";
            personalInfo.setZip(zip);
            assertEquals(zip, personalInfo.getZip());
        }

        @Test
        void testDateOfBirth() {
            LocalDate dateOfBirth = LocalDate.of(1990, 1, 1);
            personalInfo.setDateOfBirth(dateOfBirth);
            assertEquals(dateOfBirth, personalInfo.getDateOfBirth());
        }

        @Test
        void testSsn() {
            String ssn = "123-45-6789";
            personalInfo.setSsn(ssn);
            assertEquals(ssn, personalInfo.getSsn());
        }

        @Test
        void testFilingStatus() {
            String filingStatus = "Single";
            personalInfo.setFilingStatus(filingStatus);
            assertEquals(filingStatus, personalInfo.getFilingStatus());
        }

        @Test
        void testDependents() {
            int dependents = 2;
            personalInfo.setDependents(dependents);
            assertEquals(dependents, personalInfo.getDependents());
        }
    }

