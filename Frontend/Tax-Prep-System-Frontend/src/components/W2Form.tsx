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
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    state: string;
    zip: string;
}

interface User {
    userId: number;
    username: string;
    password: string;
    role: string;
}

export default function W2Form(): JSX.Element {
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

    const initialUser: User = {
        userId: 1,
        username: "afradson0",
        password: "bZ3%d(n`0Xqujjd~",
        role: "ROLE_USER"
    };

    const [formData, setFormData] = useState<W2FormData>(initialFormData);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/w2Forms/user/${initialUser.userId}`);
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
        fetchData();
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
            streetAddress1: formData.streetAddress1,
            streetAddress2: formData.streetAddress2,
            city: formData.city,
            state: formData.state,
            zip: formData.zip
        };
    
        if (formData.id) {
            requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataToSend)
            };
        } else {
            requestOptions = {
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