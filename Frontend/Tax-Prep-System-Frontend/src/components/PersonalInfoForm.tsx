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
    dependents: number;
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
        filingStatus: "",
        dependents: 0
    };

    const initialUser: User = {
        userId: 1,
        username: "afradson0",
        password: "bZ3%d(n`0Xqujjd~",
        role: "ROLE_USER"
    };

    const [formData, setFormData] = useState<PersonalInfoFormData>(initialFormData);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/personalForms/user/${initialUser.userId}`);
            if (response.ok) {
                const data: PersonalInfoFormData = await response.json();
                setFormData(data);
            }
        } catch (error) {
            console.error('Error fetching personal form data:', error);
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
            filingStatus: formData.filingStatus,
            dependents: formData.dependents
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
            let url = 'http://localhost:8080/personalForms/createPersonalForm';
            if (formData.id) {
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
                            {Object.entries(formData).map(([key, value]) => {
                                if (key === "firstName" || key === "lastName" || key === "email" || key === "streetAddress1" || key === "streetAddress2" || key === "city" || key === "state" || key === "zip" || key === "dateOfBirth" || key === "ssn" || key === "filingStatus" || key === "dependents") {
                                    return (
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
                                    );
                                }
                            })}
                            <button type="submit" className="usa-button">Submit</button>
                        </Form>
                    </div>
                </Grid>
            </GridContainer>
        </>
    );

}