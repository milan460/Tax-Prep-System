import { Button, Grid, GridContainer } from "@trussworks/react-uswds";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// TypeScript interface for the props
interface ComponentProps{
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

// interface Constants {
//     id: number;
//     dependentsConstant: number;
//     singleStatus: number;
//     marriedStatus: number;
//     taxBracket1: number;
//     taxBracket2: number;
//     taxBracket3: number;
//     taxBracket4: number;
//     taxBracket5: number;
//     taxBracket6: number;
//     taxBracket7: number;
// }

// interface PersonalInfo {
//     user: {
//         userId: number;
//         username: string;
//         password: string;
//         role: string;
//     };
//     firstName: string;
//     lastName: string;
//     email: string;
//     streetAddress1: string;
//     streetAddress2: string;
//     city: string;
//     state: string;
//     zip: string;
//     dateOfBirth: string;
//     ssn: string;
//     filingStatus: string;
//     dependents: number;
// }
// interface W2Info {
//     id: number;
//     user: {
//         userId: number;
//         username: string;
//         password: string;
//         role: string;
//     };
//     income: number;
//     socialSecurityWages: number;
//     medicareWages: number;
//     socialSecurityTaxWithheld: number;
//     medicareTaxWithheld: number;
//     federalIncomeWithheld: number;
//     streetAddress1: string;
//     streetAddress2: string;
//     city: string;
//     state: string;
//     zip: string;
// }

// interface INT1099Info {
//     formId: number;
//     user: {
//         userId: number;
//         username: string;
//         password: string;
//         role: string;
//     };
//     payerName: string;
//     interestIncome: number;
//     federalIncomeTaxWithheld: number;
//     savingsBondsAndTreasuryInterest: number;
//     investmentExpenses: number;
//     marketDiscount: number;
// }

interface User {
    userId: number;
}

// Define ResultsPage component with props
const ResultsPage: React.FC<ComponentProps> = ({ setCurrentPage }) => {

    // Set current page to 6
    setCurrentPage(6);

    // Initialize the user Id
    const User: User = {
        userId: 0,
    };

    // Initialize state variables using useState hook
    // const [constants, setConstants] = useState<Constants | null>(null);
    // const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
    // const [w2Info, setW2Info] = useState<W2Info | null>(null);
    // const [int1099Info, setInt1099Info] = useState<INT1099Info | null>(null);
    const [taxesOwed, setTaxesOwed] = useState<number>(0);
    const [taxBracket, setTaxBracket] = useState<string>('');
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalIncomeAfterTaxes, setTotalIncomeAfterTaxes] = useState<number>(0);
    const [initialUser, setInitialUser] = useState<User>(User);

     // Initialize navigate function and useTranslation hook
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Use useEffect hook to fetch data when initialUser.userId changes
    useEffect(() => {

         // Function to fetch current user data with GET request
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('http://tyler-alex-milan-tax-system.skillstorm-congo.com:8080/currentUser', {
                    credentials: 'include',
                    method: 'GET'
                });
                if (response.ok) {
                    // Initialize the User data
                    const data: User = await response.json();
                    setInitialUser(data);
                    console.log(data);
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        // Function to fetch all necessary data for tax calculations
        const fetchData = async () => {
            try {
                // Fetch constants with GET request
                const constantsResponse = await fetch(`http://tyler-alex-milan-tax-system.skillstorm-congo.com:8080/constants`, {
                    credentials: 'include',
                    method: 'GET'
                });

                // Fetch personal info with GET request
                const personalInfoResponse = await fetch(`http://tyler-alex-milan-tax-system.skillstorm-congo.com:8080/personalForms/user/${initialUser.userId}`, {
                    credentials: 'include',
                    method: 'GET'
                });

                // Fetch W2 info with GET request
                const w2InfoResponse = await fetch(`http://tyler-alex-milan-tax-system.skillstorm-congo.com:8080/w2Forms/user/${initialUser.userId}`, {
                    credentials: 'include',
                    method: 'GET'
                });

                // Fetch 1099-int info with GET request
                const int1099InfoResponse = await fetch(`http://tyler-alex-milan-tax-system.skillstorm-congo.com:8080/1099/user/${initialUser.userId}`, {
                    credentials: 'include',
                    method: 'GET'
                });

                // Check if all responses are OK
                if (
                    constantsResponse.ok &&
                    personalInfoResponse.ok &&
                    w2InfoResponse.ok &&
                    int1099InfoResponse.ok
                ) {
                    // Parse response data
                    const [constantsData, personalInfoData, w2InfoData, int1099InfoData] = await Promise.all([
                        constantsResponse.json(),
                        personalInfoResponse.json(),
                        w2InfoResponse.json(),
                        int1099InfoResponse.json(),
                    ]);

                    // Set state variables with fetched data
                    // setConstants(constantsData[0]);
                    // setPersonalInfo(personalInfoData);
                    // setW2Info(w2InfoData);
                    // setInt1099Info(int1099InfoData);

                     // Perform calculations based on fetched data
                    if (constantsData.length > 0 && personalInfoData && w2InfoData && int1099InfoData) {
                        const { dependentsConstant, singleStatus, marriedStatus, taxBracket1, taxBracket2, taxBracket3, taxBracket4, taxBracket5, taxBracket6, taxBracket7 } = constantsData[0];
                        const { filingStatus, dependents } = personalInfoData;

                        // Define tax brackets and thresholds
                        const bracket1Threshold = 9950;
                        const bracket2Threshold = 40525;
                        const bracket3Threshold = 86375;
                        const bracket4Threshold = 164925;
                        const bracket5Threshold = 209425;
                        const bracket6Threshold = 523600;

                        // Calculate deductions, income, and taxes owed
                        const standardDeduction = filingStatus === 'Single' || filingStatus === 'Married File Separate' ? singleStatus : marriedStatus;
                        const dependentsDeduction = dependentsConstant * (dependents || 0);

                        // Calculate total deductions and income
                        const totalDeductions = standardDeduction + dependentsDeduction;
                        const income = (w2InfoData.income || 0) + (int1099InfoData.interestIncome || 0);

                        // Check if income and deductions are valid for tax calculation
                        if (!isNaN(income) && !isNaN(totalDeductions) && income >= totalDeductions) {
                            const taxableIncome = income - totalDeductions;

                            // Initialize taxesOwed
                            let taxesOwed = 0;

                            // Calculate taxes based on tax brackets and thresholds and set calculatedTaxBracket to show on Tax Breakdown
                            if (taxableIncome > 0) {
                                let calculatedTaxBracket = '';
                                if (taxableIncome <= bracket1Threshold) {
                                    taxesOwed = taxableIncome * taxBracket1;
                                    calculatedTaxBracket = '10%';
                                } else if (taxableIncome <= bracket2Threshold) {
                                    taxesOwed = (bracket1Threshold * taxBracket1) + ((taxableIncome - bracket1Threshold) * taxBracket2);
                                    calculatedTaxBracket = '12%';
                                } else if (taxableIncome <= bracket3Threshold) {
                                    taxesOwed = (bracket1Threshold * taxBracket1) + ((bracket2Threshold - bracket1Threshold) * taxBracket2) + ((taxableIncome - bracket2Threshold) * taxBracket3);
                                    calculatedTaxBracket = '22%';
                                } else if (taxableIncome <= bracket4Threshold) {
                                    taxesOwed = (bracket1Threshold * taxBracket1) + ((bracket2Threshold - bracket1Threshold) * taxBracket2) + ((bracket3Threshold - bracket2Threshold) * taxBracket3) + ((taxableIncome - bracket3Threshold) * taxBracket4);
                                    calculatedTaxBracket = '24%';
                                } else if (taxableIncome <= bracket5Threshold) {
                                    taxesOwed = (bracket1Threshold * taxBracket1) + ((bracket2Threshold - bracket1Threshold) * taxBracket2) + ((bracket3Threshold - bracket2Threshold) * taxBracket3) + ((bracket4Threshold - bracket3Threshold) * taxBracket4) + ((taxableIncome - bracket4Threshold) * taxBracket5);
                                    calculatedTaxBracket = '32%';
                                } else if (taxableIncome <= bracket6Threshold) {
                                    taxesOwed = (bracket1Threshold * taxBracket1) + ((bracket2Threshold - bracket1Threshold) * taxBracket2) + ((bracket3Threshold - bracket2Threshold) * taxBracket3) + ((bracket4Threshold - bracket3Threshold) * taxBracket4) + ((bracket5Threshold - bracket4Threshold) * taxBracket5) + ((taxableIncome - bracket5Threshold) * taxBracket6);
                                    calculatedTaxBracket = '35%';
                                } else {
                                    taxesOwed = (bracket1Threshold * taxBracket1) + ((bracket2Threshold - bracket1Threshold) * taxBracket2) + ((bracket3Threshold - bracket2Threshold) * taxBracket3) + ((bracket4Threshold - bracket3Threshold) * taxBracket4) + ((bracket5Threshold - bracket4Threshold) * taxBracket5) + ((bracket6Threshold - bracket5Threshold) * taxBracket6) + ((taxableIncome - bracket6Threshold) * taxBracket7);
                                    calculatedTaxBracket = '37%';
                                }

                                 // Set tax bracket, taxes owed, total income, and total income after taxes
                                setTaxBracket(calculatedTaxBracket);
                                setTaxesOwed(taxesOwed);
                                setTotalIncome(income);
                                setTotalIncomeAfterTaxes(income - taxesOwed);
                            }
                        } else {
                            console.error('Invalid totalIncome or totalDeductions.');
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCurrentUser();
        fetchData();
    }, [initialUser.userId]);

    // Function to navigate back to review page
    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/review-page');
    }

     // Function to navigate to home page
    const handleHome = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/home');
    }

    // Return ResultsPage component
    return (
        <>
        {/* Tax breakdown section */}
            <div>
                <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: '50px', border: '1px solid #ccc', padding: '20px' }}>
                    <GridContainer>
                        <Grid col={12}>
                            <h1>{t('taxBreakdownTitle')}</h1>
                        </Grid>
                         {/* Total income section */}
                        <Grid row>
                            <Grid col={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: '50%' }}>
                                    <h2 className="text-info-darker" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{t('totalIncomeTitle')}</h2>
                                    <h3 className="text-bold">${totalIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>
                                </div>
                            </Grid>
                        </Grid>
                          {/* Total taxes owed section */}
                        <Grid row>
                            <Grid col={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: '50%' }}>
                                    <h2 className="text-info-darker" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{t('totalTaxesOwedTitle')}</h2>
                                    <h3 className="text-bold">${taxesOwed.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>
                                </div>
                            </Grid>
                        </Grid>
                          {/* Total income after taxes section */}
                        <Grid row>
                            <Grid col={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <h2 className="text-info-darker" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{t('totalIncomeAfterTaxesTitle')}</h2>
                                    <h3 className="text-bold">${totalIncomeAfterTaxes.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>
                                </div>
                            </Grid>
                        </Grid>
                          {/* Highest tax bracket section */}
                        <Grid row>
                            <Grid col={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: '50%' }}>
                                    <h2 className="text-info-darker" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{t('highestTaxBracketTitle')}</h2>
                                    <h3 className="text-bold">{taxBracket.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>
                                </div>
                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>

                {/* Navigation buttons */}
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Button type="button" base onClick={handleBack}>{t('backButton')}</Button>
                    <Button type="button" onClick={handleHome}>{t('homeButton')}</Button>
                </div>
            </div>
        </>
    );
};

export default ResultsPage;