insert into Users (username, password, role) 
values ('afradson0', 'bZ3%d(n`0Xqujjd~', 'ROLE_USER');

insert into w2_form (user_id, income, social_security_wages, medicare_wages, social_security_tax_withheld, medicare_tax_withheld, federal_income_withheld, w2_street_address_1, w2_street_address_2, w2_city, w2_state, w2_zip) 
values (1, 97878.57, 97878.57, 97878.57, 6068.47, 1419.24, 2153.33, '37949 Randy Place', 'Suite 88', 'Portland', 'Oregon', '97206');


insert into personal_info_form (user_id, first_name, last_name, email, street_address_1, street_address_2, city, state, zip, date_of_birth, social_security_number, filing_status) 
values (1, 'Adolphus', 'Fradson', 'afradson0@ted.com', '37949 Randy Place', 'Suite 88', 'Portland', 'Oregon', '97206', '01/28/2004', '252-28-6268', 'Single');

insert into nec_1099_form (user_id, payer_name, payer_TIN, payer_street_address, payer_city, payer_state, payer_country, payer_zip, recipient_TIN, recipient_street_address_1, recipient_street_address_2, recipient_city, recipient_state, recipient_zip, non_employee_compensation, amount_withheld) 
values (1, 'Anderson, Mohr and Wiza', '551-07-8098', '875 Hauk Court', 'Tacoma', 'Washington', 'United States', '98424', '318-95-3947', '3285 Pond Point', 'Room 50', 'Prescott', 'Arizona', '86305', 120579.31, 0);

