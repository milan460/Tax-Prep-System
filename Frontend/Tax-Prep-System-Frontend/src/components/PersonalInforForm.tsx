import React, { useState, useEffect } from "react";
import { Form, GridContainer, Grid } from '@trussworks/react-uswds';

interface PersonalInfoFormData {
    id?: string;
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
}

interface User {
    userId: number;
    username: string;
    password: string;
    role: string;
}

export default function PersonalInfoForm() {
    const initialFormData: PersonalInfoFormData = {
        firstName: "",
        lastName: "",
        email: "",
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        state: "",
        zip: "",
        dateOfBirth: "",
        ssn: "",
        filingStatus: ""
    };

    const initialUser: User = {
        userId: 4,
        username: "aatrox",
        password: "bxa(n`0Xqujjd~",
        role: "ROLE_USER"
    };

    const [formData, setFormData] = useState<PersonalInfoFormData>(initialFormData);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const savedFormData = localStorage.getItem('personalInfoFormData');
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }

        const formSubmittedStatus = localStorage.getItem(`formSubmitted_personalInfo_${initialUser.userId}`);
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
                userId: initialUser.userId,
            },
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            streetAddress1: formData.streetAddress1,
            streetAddress2: formData.streetAddress2,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            dateOfBirth: formData.dateOfBirth,
            ssn: formData.ssn,
            filingStatus: formData.filingStatus
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
            localStorage.setItem(`formSubmitted_personalInfo_${userId}`, 'true');
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
            let url = 'http://localhost:8080/personalForms/createPersonalForm';
            if (formSubmitted) {
                url = `http://localhost:8080/personalForms/updatePersonalInfo/${userId}`;
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
    
        localStorage.setItem('personalInfoFormData', JSON.stringify(formData));
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