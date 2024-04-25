import React, { useState, useEffect } from "react";
import { Form, GridContainer, Grid } from '@trussworks/react-uswds';

interface W2FormData {
    id?: string;
    income: string;
    socialSecurityWages: string;
    medicareWages: string;
    socialSecurityTaxWithheld: string;
    medicareTaxWithheld: string;
    federalIncomeWithheld: string;
    w2StreetAddress1: string;
    w2StreetAddress2: string;
    w2City: string;
    w2State: string;
    w2Zip: string;
}

interface User {
    userId: number;
    username: string;
    password: string;
    role: string;
}

export default function W2Form() {
    const initialFormData: W2FormData = {
        income: "",
        socialSecurityWages: "",
        medicareWages: "",
        socialSecurityTaxWithheld: "",
        medicareTaxWithheld: "",
        federalIncomeWithheld: "",
        w2StreetAddress1: "",
        w2StreetAddress2: "",
        w2City: "",
        w2State: "",
        w2Zip: "",
    };

    const initialUser: User = {
        userId: 4,
        username: "aatrox",
        password: "bxa(n`0Xqujjd~",
        role: "ROLE_USER"
    };

    const [formData, setFormData] = useState<W2FormData>(initialFormData);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const savedFormData = localStorage.getItem('w2FormData');
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }

        const formSubmittedStatus = localStorage.getItem(`formSubmitted_${initialUser.userId}`);
        if (formSubmittedStatus === 'true') {
            setFormSubmitted(true);
        }
    }, [initialUser.userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
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
            streetAddress1: formData.w2StreetAddress1,
            streetAddress2: formData.w2StreetAddress2,
            city: formData.w2City,
            state: formData.w2State,
            zip: formData.w2Zip
        };
    
        if (!formSubmitted) {
            requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataToSend)
            };
            setFormSubmitted(true);
            localStorage.setItem(`formSubmitted_${userId}`, 'true');
        } else {
            const formDataToSendWithId = { ...formDataToSend, id: userId.toString() };
            requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataToSendWithId)
            };
        }
    
        try {
            let url = 'http://localhost:8080/w2Forms/createW2Form';
            if (formSubmitted) {
                url = `http://localhost:8080/w2Forms/updateW2Form/${userId}`;
            }
    
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.status === 201) {
                const formId = response.headers.get('Location');
                if (formId) {
                    localStorage.setItem('formId', formId);
                }
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    
        localStorage.setItem('w2FormData', JSON.stringify(formData));
    };

    return (
        <>
            <GridContainer>
                <Grid row>
                    <div className="usa-layout-docs__main desktop:grid-col-12 tablet:grid-col-8">
                        <Form onSubmit={handleSubmit}>
                            {Object.entries(formData).map(([key, value]) => (
                                <div key={key} className="usa-form-group">
                                    <label htmlFor={key}>{key}:</label>
                                    <input
                                        id={key}
                                        type="text"
                                        name={key}
                                        value={value}
                                        onChange={handleChange}
                                        className="usa-input"
                                    />
                                </div>
                            ))}
                            <button type="submit" className="usa-button">Submit</button>
                        </Form>
                    </div>
                </Grid>
            </GridContainer>
        </>
    );
}