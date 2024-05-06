import React, { useState, useEffect } from "react";
import { Form, GridContainer, Grid, TextInput, Label, Button, Select, FormGroup, DateInputGroup, Fieldset, DatePicker, DateInput, Table, Alert } from '@trussworks/react-uswds';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// TypeScript interface for the props
interface ComponentProps{
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface INT1099Form {
    formId?: number;
    user?: {
        userId?: number
    }
    payerName: string;
    interestIncome: string;
    federalIncomeTaxWithheld: string;
    savingsBondsAndTreasuryInterest: string;
    investmentExpenses: string;
    marketDiscount: string;
}

interface User {
    userId: number;
    username: string;
    password?: string;
    role?: string;
}

const INT1099: React.FC<ComponentProps> = ({ setCurrentPage }) => {

    setCurrentPage(4);

    const User: User = {
        userId: 0,
        username: "",
        password: "",
        role: ""
    }

    const initial1099Form: INT1099Form = {
        // user: {
        //     userId: User.userId
        // },
        payerName: "",
        interestIncome: "",
        federalIncomeTaxWithheld: "",
        savingsBondsAndTreasuryInterest: "",
        investmentExpenses: "",
        marketDiscount: ""
    }

    const [formData, setFormData] = useState<INT1099Form>(initial1099Form);
    const [showAlert, setShowAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [initialUser, setInitialUser] = useState<User>(User);


    const navigate = useNavigate();
    const { t } = useTranslation();

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch('http://localhost:8080/currentUser', {
                credentials: 'include',
                method: 'GET'
            });
            if (response.ok) {
                const data: User = await response.json();
                setInitialUser(data);
                console.log(data);
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/1099/user/${initialUser.userId}`, {
                credentials: 'include',
                method: 'GET'
            });
            if (response.ok) {
                const data: INT1099Form = await response.json();
                setFormData(data);
            }
        }
        catch (error) {
            console.error('Error fetching 1099-INT form data: ', error);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
        fetchData();
    }, [initialUser.userId]);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const excludedFields = ["savingsBondsAndTreasuryInterest", "marketDiscount"];
        const isEmptyField = Object.entries(formData)
            .filter(([key]) => !excludedFields.includes(key))
            .some(([, value]) => value === '');

        if (isEmptyField) {
            setShowAlert(true);
            setIsSuccess(false);
            return;
        }

        const formDataToSend = {
            user: {
                userId: initialUser.userId
            },
            payerName: formData.payerName,
            interestIncome: parseFloat(formData.interestIncome),
            federalIncomeTaxWithheld: parseFloat(formData.federalIncomeTaxWithheld),
            savingsBondsAndTreasuryInterest: parseFloat(formData.savingsBondsAndTreasuryInterest),
            investmentExpenses: parseFloat(formData.investmentExpenses),
            marketDiscount: parseFloat(formData.marketDiscount)
        }

        const method = formData.formId ? 'PUT' : 'POST';
        const URL = formData.formId ? `http://localhost:8080/1099/updateINTForm/user/${initialUser.userId}` : 'http://localhost:8080/1099/createINTForm';

        console.log(method)
        fetch(URL, {
            credentials: 'include',
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataToSend),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success', data)
                fetchData();

                setIsSuccess(true);
                setShowAlert(false);
                navigate("/review-page");
            })
            .catch(error => console.error('error with request', error));

    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((prevData: INT1099Form) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/w2-form');
    }



    return (
        <>
            <div>
                {showAlert && (
                    <Alert type="error" heading="Error status" headingLevel="h4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        {t('formMissingContent')}
                    </Alert>
                )}
                {isSuccess && (
                    <Alert type="success" heading="Success status" headingLevel="h4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        {t('formSuccessfullyFilled')}
                    </Alert>
                )}
                <h1>{t('1099INTForm')}</h1>
                <GridContainer>
                    <Grid row>
                        <Grid col={3} />
                        <Grid col={3}>
                            <Label htmlFor="payerName" className="text-bold text-underline text-info-darker">{t('payerNameLabel')}</Label>
                            <TextInput
                                id="payerName"
                                name="payerName"
                                value={formData.payerName}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder={`${t('exPlaceholder')}John Doe`}
                            />
                            <Label htmlFor="federalIncomeTaxWithheld" className="text-bold text-underline text-info-darker">{t('federalIncomeTaxWithheldLabel')}</Label>
                            <TextInput
                                id="federalIncomeTaxWithheld"
                                name="federalIncomeTaxWithheld"
                                value={formData.federalIncomeTaxWithheld.toString()}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder={`${t('exPlaceholder')}5000`}
                            />
                        </Grid>
                        <Grid col={3}>
                            <Label htmlFor="interestIncome" className="text-bold text-underline text-info-darker">{t('interestIncomeLabel')}</Label>
                            <TextInput
                                id="interestIncome"
                                name="interestIncome"
                                value={formData.interestIncome.toString()}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder={`${t('exPlaceholder')}10000`}
                            />
                            <Label htmlFor="investmentExpenses" className="text-bold text-underline text-info-darker">{t('investmentExpensesLabel')}</Label>
                            <TextInput
                                id="investmentExpenses"
                                name="investmentExpenses"
                                value={formData.investmentExpenses.toString()}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder={`${t('exPlaceholder')}5000`}
                            />
                        </Grid>
                    </Grid>
                    <Grid row>
                        <Grid col={3} />
                        <Grid col={6}>
                            <Label htmlFor="savingsBondsAndTreasuryInterest" className="text-bold text-underline text-info-darker">{t('savingsBondsAndTreasuryInterestLabel')}</Label>
                            <TextInput
                                id="savingsBondsAndTreasuryInterest"
                                name="savingsBondsAndTreasuryInterest"
                                value={formData.savingsBondsAndTreasuryInterest.toString()}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder={`${t('exPlaceholder')}5000`}
                            />
                        </Grid>
                    </Grid>
                    <Grid row>
                        <Grid col={3} />
                        <Grid col={6}>
                            <Label htmlFor="marketDiscount" className="text-bold text-underline text-info-darker">{t('marketDiscountLabel')}</Label>
                            <TextInput
                                id="marketDiscount"
                                name="marketDiscount"
                                value={formData.marketDiscount.toString()}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder={`${t('exPlaceholder')}5000`}
                            />
                        </Grid>
                    </Grid>
                </GridContainer>
                <GridContainer>
                    <Grid row>
                        <Grid col={12}>
                            <Button type="button" base onClick={handleBack} style={{ marginTop: '20px', marginBottom: '20px', justifyContent: 'center' }}>{t('backButton')}</Button>
                            <Button type="button" onClick={handleSubmit}>{t('continueButton')}</Button>
                        </Grid>
                    </Grid>
                </GridContainer>
            </div>
        </>

    )

}

export default INT1099;