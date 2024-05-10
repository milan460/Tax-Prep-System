# Tax Preparation System

## Objective
Create a tax preparation website styled similarly to the IRS website, facilitating user-friendly tax filing processes.

## Functional Requirements
- **User Administration:** Enable account creation and login functionalities.
- **User Information:** Allow users to input personal details for tax filing.
- **Financial Information:** Provide sections for W2 and 1099-INT data entry.
- **Review Page:** Display a summary of entered information for user verification.
- **Results Page:** Show the calculated federal tax breakdown, indicating refunds or amounts owed.

## Technology Stack
### Backend
- Spring Boot (monolithic app architecture)
- JUnit, Trussworks, i18n
- OAuth2 
- Docker

### Frontend
- React with TypeScript
- Jest for testing

### Database
- Aurora (RDS)

### Cloud Hosting
- AWS

### Version Control
- GitHub

## Non-Functional (Bonus) Requirements
- Create an account management page where users can update personal and financial info.
- Configure OAuth2 social login using Google as an authorization server.

## Process Flow
1. **Sign In:**
   - Users authenticate via OAuth2 (Google)
2. **Home:**
   - Dashboard displaying navigation options and summary of tax-related actions.
3. **Personal Information:**
   - Collect and validate personal data (full name, DOB, SSN, contact info).
4. **W2:**
   - Entry for W2 details (income, tax withheld, employer info).
5. **1099-INT:**
   - Entry for interest income details (1099-INT form specifics).
6. **Review Page:**
   - Display a summary of entered personal and financial information for user review.
7. **Results:**
   - Calculate federal tax obligations based on provided data.
   - Show breakdown of taxes (income tax, deductions, credits, etc.).
   - Indicate whether the user will receive a refund or owes taxes.
