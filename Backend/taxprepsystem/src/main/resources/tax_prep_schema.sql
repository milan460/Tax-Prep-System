-- Drop tables if they exist
DROP TABLE IF EXISTS PersonalInfoForm;
DROP TABLE IF EXISTS W2Form;
DROP TABLE IF EXISTS NEC1099Form;
DROP TABLE IF EXISTS Users;

-- Create Users table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create Personal Information Form table
CREATE TABLE personal_info_form (
    form_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    street_address_1 VARCHAR(100),
    street_address_2 VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    zip VARCHAR(20),
    date_of_birth DATE,
    social_security_number VARCHAR(20),
    filing_status VARCHAR(20)
);

-- Create Financial (W2) Form table
CREATE TABLE w2_form (
    form_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    income DECIMAL(12, 2),
    social_security_wages DECIMAL(12, 2),
    medicare_wages DECIMAL(12, 2),
    social_security_tax_withheld DECIMAL(12, 2),
    medicare_tax_withheld DECIMAL(12, 2),
    federal_income_withheld DECIMAL(12, 2),
    w2_street_address_1 VARCHAR(100),
    w2_street_address_2 VARCHAR(100),
    w2_city VARCHAR(50),
    w2_state VARCHAR(50),
    w2_zip VARCHAR(20)
);

-- Create Financial (1099-NEC) Form table
CREATE TABLE nec_1099_form (
    form_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    payer_name VARCHAR(100),
    payer_TIN VARCHAR(20),
    payer_street_address VARCHAR(100),
    payer_city VARCHAR(50),
    payer_state VARCHAR(50),
    payer_country VARCHAR(50),
    payer_zip VARCHAR(20),
    recipient_TIN VARCHAR(20),
    recipient_street_address_1 VARCHAR(100),
    recipient_street_address_2 VARCHAR(100),
    recipient_city VARCHAR(50),
    recipient_state VARCHAR(50),
    recipient_zip VARCHAR(20),
    non_employee_compensation DECIMAL(12, 2),
    amount_withheld DECIMAL(12, 2)
);
