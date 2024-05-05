import React, { useState, useEffect } from "react";
import { Form, GridContainer, Grid, TextInput, Label, Button, Select, FormGroup, DateInputGroup, Fieldset, DatePicker, DateInput, Table, Alert } from '@trussworks/react-uswds';
import { useNavigate } from 'react-router-dom';

interface W2FormData {
    id?: string;
    income: string;
    socialSecurityWages: string;
    medicareWages: string;
    socialSecurityTaxWithheld: string;
    medicareTaxWithheld: string;
    federalIncomeWithheld: string;
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    state: string;
    zip: string;
}

interface User {
    userId: number;
    username: string;
    password?: string;
    role?: string;
}

export default function W2Form() {
    const initialFormData: W2FormData = {
        income: "",
        socialSecurityWages: "",
        medicareWages: "",
        socialSecurityTaxWithheld: "",
        medicareTaxWithheld: "",
        federalIncomeWithheld: "",
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        state: "",
        zip: "",
    };

    const User: User = {
        userId: 0,
        username: "",
        password: "",
        role: ""
    };

    const [formData, setFormData] = useState<W2FormData>(initialFormData);
    const [showAlert, setShowAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [initialUser, setInitialUser] = useState<User>(User);

    const navigate = useNavigate();

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
            const response = await fetch(`http://localhost:8080/w2Forms/user/${initialUser.userId}`, {
                credentials: 'include',
                method: 'GET'
            });
            if (response.ok) {
                const data: W2FormData = await response.json();
                console.log("Fetched W2 Form Data:", data);
                setFormData(data);
            }
        } catch (error) {
            console.error('Error fetching w2 form data:', error);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
        fetchData();
    }, [initialUser.userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedState = e.target.value;
        setFormData(prevData => ({
            ...prevData,
            state: selectedState
        }));
    };

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/personal-info-form');
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const requiredFields = ["income", "streetAddress1", "city", "state", "zip"];
        const isEmptyField = Object.entries(formData)
            .filter(([key]) => requiredFields.includes(key))
            .some(([, value]) => value === '');

        if (isEmptyField) {
            setShowAlert(true);
            setIsSuccess(false);
            return;
        }

        const userId: number = initialUser.userId;

        let requestOptions: any;
        const formDataToSend = {
            user: {
                userId: initialUser.userId
            },
            income: parseFloat(formData.income),
            socialSecurityWages: parseFloat(formData.socialSecurityWages),
            medicareWages: parseFloat(formData.medicareWages),
            socialSecurityTaxWithheld: parseFloat(formData.socialSecurityTaxWithheld),
            medicareTaxWithheld: parseFloat(formData.medicareTaxWithheld),
            federalIncomeWithheld: parseFloat(formData.federalIncomeWithheld),
            streetAddress1: formData.streetAddress1,
            streetAddress2: formData.streetAddress2,
            city: formData.city,
            state: formData.state,
            zip: formData.zip
        };

        if (formData.id) {
            requestOptions = {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataToSend)
            };
        } else {
            requestOptions = {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataToSend)
            };
        }

        try {
            let url = 'http://localhost:8080/w2Forms/createW2Form';
            if (formData.id) {
                url = `http://localhost:8080/w2Forms/updateW2Form/${userId}`;
            }

            const response = await fetch(url, requestOptions);

            setIsSuccess(true);
            setShowAlert(false);
            navigate('/int-1099-form');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.status === 201) {
                const formId = response.headers.get('Location');
                if (formId) {
                    localStorage.setItem('formId', formId);
                }

                fetchData();
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

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
                <h1>W2 Form</h1>
                <GridContainer>
                    <Grid row>
                    <Grid col={2}/>
                        <Grid col={4}>
                            <Label htmlFor="income" className="text-bold text-underline text-info-darker">Income</Label>
                            <TextInput
                                id="income"
                                name="income"
                                value={formData.income}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Example: 20000"
                            />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="federalIncomeWithheld" className="text-bold text-underline text-info-darker">Federal Income Withheld</Label>
                            <TextInput
                                id="federalIncomeWithheld"
                                name="federalIncomeWithheld"
                                value={formData.federalIncomeWithheld}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Example: 2000"
                            />
                        </Grid>
                        <Grid col={2}/>
                        <Grid col={2}/>
                        <Grid col={4}>
                            <Label htmlFor="medicareWages" className="text-bold text-underline text-info-darker">Medicare Wages</Label>
                            <TextInput
                                id="medicareWages"
                                name="medicareWages"
                                value={formData.medicareWages}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Example: 20000"
                            />
                        </Grid>
                        
                        <Grid col={4}>
                            <Label htmlFor="medicareTaxWithheld" className="text-bold text-underline text-info-darker">Medicare Tax Withheld</Label>
                            <TextInput
                                id="medicareTaxWithheld"
                                name="medicareTaxWithheld"
                                value={formData.medicareTaxWithheld}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Example: 1000"
                            />
                        </Grid>
                        <Grid col={2}/>
                        <Grid col={2}/>
                        <Grid col={4}>
                            <Label htmlFor="socialSecurityWages" className="text-bold text-underline text-info-darker">Social Security Wages</Label>
                            <TextInput
                                id="socialSecurityWages"
                                name="socialSecurityWages"
                                value={formData.socialSecurityWages}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Example: 20000"
                            />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="socialSecurityTaxWithheld" className="text-bold text-underline text-info-darker">Social Security Tax Withheld</Label>
                            <TextInput
                                id="socialSecurityTaxWithheld"
                                name="socialSecurityTaxWithheld"
                                value={formData.socialSecurityTaxWithheld}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Example: 5000"
                            />
                        </Grid>
                        <Grid col={2}/>
                        <Grid col={2}/>
                        <Grid col={4}>
                            <Label htmlFor="streetAddress1" className="text-bold text-underline text-info-darker">Employer Street Address 1</Label>
                            <TextInput
                                id="streetAddress1"
                                name="streetAddress1"
                                value={formData.streetAddress1}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder="Example: 123 Main St"
                            />
                        </Grid>

                        <Grid col={4}>
                            <Label htmlFor="streetAddress2" className="text-bold text-underline text-info-darker">Employer Street Address 2 <span className="text-italic">- optional</span></Label>
                            <TextInput
                                id="streetAddress2"
                                name="streetAddress2"
                                value={formData.streetAddress2}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder="Example: Apt 101"
                            />
                        </Grid>
                        <Grid col={2}/>
                        <Grid col={2}/>

                        <Grid col={3}>
                            <Label htmlFor="city" className="text-bold text-underline text-info-darker">Employer City</Label>
                            <TextInput
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder="Example: Anytown"
                            />
                        </Grid>
                        <Grid col={3} className="usa-form-group">
                            <Label htmlFor="state" className="text-bold text-underline text-info-darker">Employer State</Label>
                            <Select
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleStateChange}
                                style={{ width: "calc(100% - 16px)" }}
                            >
                                <option value="">- Select your state-</option>
                                <option value="Alabama">Alabama</option>
                                <option value="Alaska">Alaska</option>
                                <option value="Arizona">Arizona</option>
                                <option value="Arkansas">Arkansas</option>
                                <option value="California">California</option>
                                <option value="Colorado">Colorado</option>
                                <option value="Connecticut">Connecticut</option>
                                <option value="Delaware">Delaware</option>
                                <option value="District Of Columbia">District Of Columbia</option>
                                <option value="Florida">Florida</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Idaho">Idaho</option>
                                <option value="Illinois">Illinois</option>
                                <option value="Indiana">Indiana</option>
                                <option value="Iowa">Iowa</option>
                                <option value="Kansas">Kansas</option>
                                <option value="Kentucky">Kentucky</option>
                                <option value="Louisiana">Louisiana</option>
                                <option value="Maine">Maine</option>
                                <option value="Maryland">Maryland</option>
                                <option value="Massachusetts">Massachusetts</option>
                                <option value="Michigan">Michigan</option>
                                <option value="Minnesota">Minnesota</option>
                                <option value="Mississippi">Mississippi</option>
                                <option value="Missouri">Missouri</option>
                                <option value="Montana">Montana</option>
                                <option value="Nebraska">Nebraska</option>
                                <option value="Nevada">Nevada</option>
                                <option value="New Hampshire">New Hampshire</option>
                                <option value="New Jersey">New Jersey</option>
                                <option value="New Mexico">New Mexico</option>
                                <option value="New York">New York</option>
                                <option value="North Carolina">North Carolina</option>
                                <option value="North Dakota">North Dakota</option>
                                <option value="Ohio">Ohio</option>
                                <option value="OklahomaK">Oklahoma</option>
                                <option value="Oregon">Oregon</option>
                                <option value="Pennsylvania">Pennsylvania</option>
                                <option value="Rhode Island">Rhode Island</option>
                                <option value="South Carolina">South Carolina</option>
                                <option value="South Dakota">South Dakota</option>
                                <option value="Tennessee">Tennessee</option>
                                <option value="Texas">Texas</option>
                                <option value="Utah">Utah</option>
                                <option value="Vermont">Vermont</option>
                                <option value="Virginia">Virginia</option>
                                <option value="Washington">Washington</option>
                                <option value="West Virginia">West Virginia</option>
                                <option value="Wisconsin">Wisconsin</option>
                                <option value="Wyoming">Wyoming</option>
                            </Select>
                        </Grid>
                        <Grid col={2}>
                            <Label htmlFor="zip" className="text-bold text-underline text-info-darker">Employer ZIP Code</Label>
                            <TextInput
                                id="zip" name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder="Example: 12345"
                            />
                        </Grid>

                    </Grid>
                </GridContainer>
                <GridContainer style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                        <Grid row>
                            <Grid col={12}>
                                <Button type="button" base onClick={handleBack} style={{ marginRight: '1rem' }}>Back</Button>
                                <Button type="button" onClick={handleSubmit}style={{ marginRight: '11rem' }}>Continue</Button>
                            </Grid>
                        </Grid>
                    </GridContainer>
            </div>
        </>
    );
}