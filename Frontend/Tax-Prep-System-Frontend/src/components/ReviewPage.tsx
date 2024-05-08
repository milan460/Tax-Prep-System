import React, { useEffect, useState } from 'react';
import {  GridContainer, Grid, TextInput, Label, Button, Alert } from '@trussworks/react-uswds';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// TypeScript interface for the props
interface ComponentProps{
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface PersonalInfo {
    user: {
        userId: number;
        username: string;
        password: string;
        role: string;
    };
    firstName: string;
    lastName: string;
    email: string;
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    state: string;
    zip: string;
    dateOfBirth: string;
    ssn: string;
    filingStatus: string;
    dependents: number;
}

interface W2Info {
    id: number;
    user: {
        userId: number;
        username: string;
        password: string;
        role: string;
    };
    income: number;
    socialSecurityWages: number;
    medicareWages: number;
    socialSecurityTaxWithheld: number;
    medicareTaxWithheld: number;
    federalIncomeWithheld: number;
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    state: string;
    zip: string;
}

interface INT1099Info {
    formId: number;
    user: {
        userId: number;
        username: string;
        password: string;
        role: string;
    };
    payerName: string;
    interestIncome: number;
    federalIncomeTaxWithheld: number;
    savingsBondsAndTreasuryInterest: number;
    investmentExpenses: number;
    marketDiscount: number;
}


interface User {
    userId: number;
    username: string;
    password?: string;
    role?: string;
}

// Define ReviewPage component with props
const ReviewPage: React.FC<ComponentProps> = ({ setCurrentPage }) => {

    // Set current page to 4
    setCurrentPage(4);

    // Initialize a user
    const User: User = {
        userId: 0,
        username: "",
        password: "",
        role: ""
    };

     // Initialize state variables using useState hook
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
    const [w2Info, setW2Info] = useState<W2Info | null>(null);
    const [int1099Info, setInt1099Info] = useState<INT1099Info | null>(null);
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    const [initialUser, setInitialUser] = useState<User>(User);

     // Initialize navigate function and useTranslation hook
    const navigate = useNavigate();
    const { t } = useTranslation();



    // Use useEffect hook to fetch data when initialUser.userId changes
    useEffect(() => {

        // Function to fetch current user data with GET request
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('http://localhost:8080/currentUser', {
                    credentials: 'include',
                    method: 'GET'
                });
                if (response.ok) {
                    const data: User = await response.json();
                    // Set the user data if fetch was successful
                    setInitialUser(data);
                    console.log(data);
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        // Function to fetch personal information with GET request
        const fetchPersonalInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8080/personalForms/user/${initialUser.userId}`, {
                    credentials: 'include',
                    method: 'GET'
                });
                const text = await response.text();  
                try {
                    const data = JSON.parse(text);  
                    // Set the personal info data if fetch was successful
                    setPersonalInfo(data);
                } catch (jsonError) {
                    console.error('Failed to parse JSON:', jsonError, 'Response received:', text);
                }
                // if (response.ok) {
                //     const data: PersonalInfo = await response.json();
                //     setPersonalInfo(data);
                // }
            } catch (error) {
                console.error('Error fetching personal information:', error);
            }
        };
        // Function to fetch W2 information with GET request
        const fetchW2Info = async () => {
            try {
                const response = await fetch(`http://localhost:8080/w2Forms/user/${initialUser.userId}`, {
                    credentials: 'include',
                    method: 'GET'
                });
                if (response.ok) {
                    const data: W2Info = await response.json();
                    // Set the W2 info data if fetch was successful
                    setW2Info(data);
                }
            } catch (error) {
                console.error('Error fetching W2 information:', error);
            }
        };

        // Function to fetch 1099-INT information with GET request
        const fetchINT1099Info = async () => {
            try {
                const response = await fetch(`http://localhost:8080/1099/user/${initialUser.userId}`, {
                    credentials: 'include',
                    method: 'GET'
                });
                if (response.ok) {
                    const data: INT1099Info = await response.json();
                    // Set 1099-int info if fetch was successful
                    setInt1099Info(data);
                }
            } catch (error) {
                console.error('Error fetching 1099-INT information:', error);
            }
        };

        // Call all the fetch functions to load the data
        fetchCurrentUser();
        fetchINT1099Info();
        fetchW2Info();
        fetchPersonalInfo();
    }, [initialUser.userId]);

     // Function to handle input changes for all forms
    const handleInputChange = (
        field: keyof PersonalInfo | keyof W2Info | keyof INT1099Info,
        value: string
    ) => {
        if (personalInfo && w2Info && int1099Info) {
            if (field in personalInfo) {
                setPersonalInfo({ ...personalInfo, [field]: value });
            } else if (field in w2Info) {
                setW2Info({ ...w2Info, [field]: value });
            } else if (field in int1099Info) {
                setInt1099Info({ ...int1099Info, [field]: value });
            }
        }
    };

     // Function to navigate back
    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/int-1099-form');
    }

    // Function to handle form submission
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowSubmitAlert(true);
    };

     // Return ReviewPage component
    return (
        <>
        {/*Shows the info from personal info form*/}
            <div>
                <GridContainer>
                    <Grid row>
                        <Grid col={12}>
                            <h1>{t('reviewPageTitle')}</h1>
                            {showSubmitAlert && (
                                <Alert type="info" heading={t('informativeStatus')} headingLevel="h4">
                                    {t('areYouSureSubmit')}
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        <Button type="button" onClick={() => navigate('/results-page')}>{t('submitButton')}</Button>
                                    </div>
                                </Alert>
                            )}
                            <a href="/personal-info-form" onClick={(e) => { e.preventDefault(); navigate('/personal-info-form'); }}>
                                <h3>{t('personalInformation')}</h3>
                            </a>
                        </Grid>
                    </Grid>
                    <Grid row>
                        <Grid col={3}>
                            <Label htmlFor="firstName">{t('firstNameLabel')}</Label>
                            <TextInput
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={personalInfo?.firstName || ''}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="lastName">{t('lastNameLabel')}</Label>
                            <TextInput
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={personalInfo?.lastName || ''}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="email">{t('emailLabel')}</Label>
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                value={personalInfo?.email || ''}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="streetAddress1">{t('streetAddress1Label')}</Label>
                            <TextInput
                                id="streetAddress1"
                                name="streetAddress1"
                                type="text"
                                value={personalInfo?.streetAddress1 || ''}
                                onChange={(e) => handleInputChange('streetAddress1', e.target.value)}
                                readOnly
                            />
                        </Grid>
                    </Grid>
                    <Grid row>
                        <Grid col={3}>
                            <Label htmlFor="streetAddress2">{t('streetAddress2Label')}</Label>
                            <TextInput
                                id="streetAddress2"
                                name="streetAddress2"
                                type="text"
                                value={personalInfo?.streetAddress2 || ''}
                                onChange={(e) => handleInputChange('streetAddress2', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="city">{t('cityLabel')}</Label>
                            <TextInput
                                id="city"
                                name="city"
                                type="text"
                                value={personalInfo?.city || ''}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="state">{t('stateLabel')}</Label>
                            <TextInput
                                id="state"
                                name="state"
                                type="text"
                                value={personalInfo?.state || ''}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="zip">{t('zipCodeLabel')}</Label>
                            <TextInput
                                id="zip"
                                name="zip"
                                type="text"
                                value={personalInfo?.zip || ''}
                                onChange={(e) => handleInputChange('zip', e.target.value)}
                                readOnly
                            />
                        </Grid>
                    </Grid>
                    <Grid row>
                        <Grid col={3}>
                            <Label htmlFor="dateOfBirth">{t('dateOfBirthLabel')}</Label>
                            <TextInput
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="text"
                                value={personalInfo?.dateOfBirth || ''}
                                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="ssn">{t('ssnLabel')}</Label>
                            <TextInput
                                id="ssn"
                                name="ssn"
                                type="text"
                                value={personalInfo?.ssn || ''}
                                onChange={(e) => handleInputChange('ssn', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="filingStatus">{t('filingStatusLabel')}</Label>
                            <TextInput
                                id="filingStatus"
                                name="filingStatus"
                                type="text"
                                value={personalInfo?.filingStatus || ''}
                                onChange={(e) => handleInputChange('filingStatus', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="dependents">{t('dependentsLabel')}</Label>
                            <TextInput
                                id="dependents"
                                name="dependents"
                                type="text"
                                value={personalInfo?.dependents || personalInfo?.dependents == 0 ? personalInfo.dependents.toString() : ''}
                                onChange={(e) => handleInputChange('dependents', e.target.value)}
                                readOnly
                            />
                        </Grid>
                    </Grid>
                </GridContainer>

                {/*Shows the info from W2 form*/}
                <GridContainer>
                    <Grid row>
                        <Grid col={12}>
                            <a href="/w2-form" onClick={(e) => { e.preventDefault(); navigate('/w2-form'); }}>
                                <h3>W2</h3>
                            </a>
                        </Grid>
                    </Grid>
                    <Grid row>
                        <Grid col={3}>
                            <Label htmlFor="income">{t('incomeLabel')}</Label>
                            <TextInput
                                id="income"
                                name="income"
                                type="text"
                                value={w2Info?.income ? `$${w2Info.income}` : ''}
                                onChange={(e) => handleInputChange('income', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="socialSecurityWages">{t('socialSecurityWagesLabel')}</Label>
                            <TextInput
                                id="socialSecurityWages"
                                name="socialSecurityWages"
                                type="text"
                                value={w2Info?.socialSecurityWages ? `$${w2Info.socialSecurityWages}` : ''}
                                onChange={(e) => handleInputChange('socialSecurityWages', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="socialSecurityTaxWithheld">{t('socialSecurityTaxWithheldLabel')}</Label>
                            <TextInput
                                id="socialSecurityTaxWithheld"
                                name="socialSecurityTaxWithheld"
                                type="text"
                                value={w2Info?.socialSecurityTaxWithheld ? `$${w2Info.socialSecurityTaxWithheld}` : ''}
                                onChange={(e) => handleInputChange('socialSecurityTaxWithheld', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="federalIncomeWithheld">{t('federalIncomeWithheldLabel')}</Label>
                            <TextInput
                                id="federalIncomeWithheld"
                                name="federalIncomeWithheld"
                                type="text"
                                value={w2Info?.federalIncomeWithheld ? `$${w2Info.federalIncomeWithheld}` : ''}
                                onChange={(e) => handleInputChange('federalIncomeWithheld', e.target.value)}
                                readOnly
                            />
                        </Grid>
                    </Grid>
                </GridContainer>

                {/*Shows the info from 1099-int form*/}
                <GridContainer>
                    <Grid row>
                        <Grid col={12}>
                            <a href="/int-1099-form" onClick={(e) => { e.preventDefault(); navigate('/int-1099-form'); }}>
                                <h3>INT1099</h3>
                            </a>
                        </Grid>
                    </Grid>
                    <Grid row>
                        <Grid col={3}>
                            <Label htmlFor="payerName">{t('payerNameLabel')}</Label>
                            <TextInput
                                id="payerName"
                                name="payerName"
                                type="text"
                                value={int1099Info?.payerName || ''}
                                onChange={(e) => handleInputChange('payerName', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="interestIncome">{t('interestIncomeLabel')}</Label>
                            <TextInput
                                id="interestIncome"
                                name="interestIncome"
                                type="text"
                                value={int1099Info?.interestIncome ? `$${int1099Info.interestIncome}` : ''}
                                onChange={(e) => handleInputChange('interestIncome', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="federalIncomeTaxWithheld">{t('federalIncomeTaxWithheldLabel')}</Label>
                            <TextInput
                                id="federalIncomeTaxWithheld"
                                name="federalIncomeTaxWithheld"
                                type="text"
                                value={int1099Info?.federalIncomeTaxWithheld ? `$${int1099Info.federalIncomeTaxWithheld}` : ''}
                                onChange={(e) => handleInputChange('federalIncomeTaxWithheld', e.target.value)}
                                readOnly
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="investmentExpenses">{t('investmentExpensesLabel')}</Label>
                            <TextInput
                                id="investmentExpenses"
                                name="investmentExpenses"
                                type="text"
                                value={int1099Info?.investmentExpenses ? `$${int1099Info.investmentExpenses}` : ''}
                                onChange={(e) => handleInputChange('investmentExpenses', e.target.value)}
                                readOnly
                            />
                        </Grid>
                    </Grid>
                </GridContainer>
                {/*Buttons to go back or submit the review page*/}
                <div style={{ marginTop: '20px', marginBottom: '20px', justifyContent: 'center' }}>
                    <Button type="button" base onClick={handleBack}>{t('backButton')}</Button>
                    <Button type="button" onClick={handleSubmit}>{t('submitButton')}</Button>
                </div>
            </div>
        </>
    );
};


export default ReviewPage;