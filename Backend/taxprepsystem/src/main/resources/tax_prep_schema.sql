-- Drop tables if they exist
DROP TABLE IF EXISTS personal_info_form;
DROP TABLE IF EXISTS w2_form;
DROP TABLE IF EXISTS int_1099_form;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS constants;

-- Create Users table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100),
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
    filing_status VARCHAR(20),
	dependents INT
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
-- CREATE TABLE nec_1099_form (
--    form_id SERIAL PRIMARY KEY,
--    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
--    payer_name VARCHAR(100),
--    payer_TIN VARCHAR(20),
--    payer_street_address VARCHAR(100),
--    payer_city VARCHAR(50),
--    payer_state VARCHAR(50),
--    payer_country VARCHAR(50),
--    payer_zip VARCHAR(20),
--    recipient_TIN VARCHAR(20),
--    recipient_street_address_1 VARCHAR(100),
--    recipient_street_address_2 VARCHAR(100),
--    recipient_city VARCHAR(50),
--    recipient_state VARCHAR(50),
--    recipient_zip VARCHAR(20),
--    non_employee_compensation DECIMAL(12, 2),
--    amount_withheld DECIMAL(12, 2)
-- );

CREATE TABLE int_1099_form (
    form_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    payer_name VARCHAR(100),
    interest_income DECIMAL(12, 2),
    federal_income_tax_withheld DECIMAL(12, 2),
    savings_bonds_and_treasury_interest DECIMAL(12, 2),
    investment_expenses DECIMAL(12, 2),
    market_discount DECIMAL(12, 2)
);

CREATE TABLE constants (
    id SERIAL PRIMARY KEY,
    dependents_constant DECIMAL(10, 2),
    single_status DECIMAL(10, 2),
    married_status DECIMAL(10, 2),
    tax_bracket_1 DECIMAL(4, 3),
    tax_bracket_2 DECIMAL(4, 3),
    tax_bracket_3 DECIMAL(4, 3),
    tax_bracket_4 DECIMAL(4, 3),
    tax_bracket_5 DECIMAL(4, 3),
    tax_bracket_6 DECIMAL(4, 3),
    tax_bracket_7 DECIMAL(4, 3)
);
