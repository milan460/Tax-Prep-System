import React, { useState, useEffect } from "react";
import { Form, GridContainer, Grid, TextInput, Label, Button, Select, FormGroup, DateInputGroup, Fieldset, DatePicker, DateInput, Table, Alert } from '@trussworks/react-uswds';
import { useNavigate } from 'react-router-dom';

interface INT1099Form {
    formId?: number;
    user?: {
        userId?: number
    }
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
    password: string;
    role: string;
}

export default function INT1099() {


    const initialUser: User = {
        userId: 1,
        username: "afradson0",
        password: "bZ3%d(n`0Xqujjd~",
        role: "ROLE_USER"
    }

    const initial1099Form: INT1099Form = {
        user: {
            userId: initialUser.userId
        },
        payerName: "",
        interestIncome: 0,
        federalIncomeTaxWithheld: 0,
        savingsBondsAndTreasuryInterest: 0,
        investmentExpenses: 0,
        marketDiscount: 0
    }

    const [formData, setFormData] = useState<INT1099Form>(initial1099Form);
    const [showAlert, setShowAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/1099/user/${initialUser.userId}`);
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

        const method = formData.formId ? 'PUT' : 'POST';
        const URL = formData.formId ? `http://localhost:8080/1099/updateINTForm/user/${initialUser.userId}` : 'http://localhost:8080/1099/createINTForm';

        console.log(method)
        fetch(URL, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
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
                        Form is missing content
                    </Alert>
                )}
                {isSuccess && (
                    <Alert type="success" heading="Success status" headingLevel="h4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        Form is successfully filled out.
                    </Alert>
                )}
                <h1>1099 Form</h1>
                <GridContainer>
                    <Grid row>
                        <Grid col={3} />
                        <Grid col={3}>
                            <Label htmlFor="payerName" className="text-bold text-underline text-info-darker">Payer Name</Label>
                            <TextInput
                                id="payerName"
                                name="payerName"
                                value={formData.payerName}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder="Example: John Doe"
                            />
                            <Label htmlFor="federalIncomeTaxWithheld" className="text-bold text-underline text-info-darker">Federal Income Tax Withheld</Label>
                            <TextInput
                                id="federalIncomeTaxWithheld"
                                name="federalIncomeTaxWithheld"
                                value={formData.federalIncomeTaxWithheld.toString()}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Example: 5000"
                            />
                        </Grid>
                        <Grid col={3}>
                        <Label htmlFor="interestIncome" className="text-bold text-underline text-info-darker">Interest Income</Label>
                            <TextInput
                                id="interestIncome"
                                name="interestIncome"
                                value={formData.interestIncome.toString()}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Example: 10000"
                            />
                            <Label htmlFor="investmentExpenses" className="text-bold text-underline text-info-darker">Investment Expenses</Label>
                            <TextInput
                                id="investmentExpenses"
                                name="investmentExpenses"
                                value={formData.investmentExpenses.toString()}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Example: 5000"
                            />
                        </Grid>
                    </Grid>
                    <Grid row>
                        <Grid col={3} />
                        <Grid col={6}>
                            <Label htmlFor="savingsBondsAndTreasuryInterest" className="text-bold text-underline text-info-darker">Savings Bonds And Treasury Interest</Label>
                            <TextInput
                                id="savingsBondsAndTreasuryInterest"
                                name="savingsBondsAndTreasuryInterest"
                                value={formData.savingsBondsAndTreasuryInterest.toString()}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Example: 5000"
                            />
                        </Grid>
                    </Grid>
                    <Grid row>
                        <Grid col={3} />
                        <Grid col={6}>
                            <Label htmlFor="marketDiscount" className="text-bold text-underline text-info-darker">Market Discount</Label>
                            <TextInput
                                id="marketDiscount"
                                name="marketDiscount"
                                value={formData.marketDiscount.toString()}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Example: 5000"
                            />
                        </Grid>
                    </Grid>
                    
                </GridContainer>
                <GridContainer style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                        <Grid row>
                            <Grid col={12}>
                                <Button type="button" base onClick={handleBack} style={{ marginRight: '1rem' }}>Back</Button>
                                <Button type="button" onClick={handleSubmit}style={{ marginRight: '16rem' }}>Continue</Button>
                            </Grid>
                        </Grid>
                    </GridContainer>
            </div>
        </>

    )

}