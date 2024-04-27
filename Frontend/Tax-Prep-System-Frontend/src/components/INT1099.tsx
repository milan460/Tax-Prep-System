import React, { useState, useEffect } from "react";
import { Form, GridContainer, Grid } from '@trussworks/react-uswds';

interface INT1099Form{
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

interface User{
    userId: number;
    username: string;
    password: string;
    role: string;
}

export default function INT1099(){
    

    const initialUser: User = {
        userId: 2,
        username: "test",
        password: "testpass",
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

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/1099/user/${initialUser.userId}`);
            if(response.ok){
                const data: INT1099Form = await response.json();
                setFormData(data);
            }
        }
        catch(error){
            console.error('Error fetching 1099-INT form data: ', error);
        }
    };

    useEffect(() => {
        fetchData();
   }, [initialUser.userId]);

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        
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
        })
        .catch(error => console.error('error with request', error));
        
   };

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
       
        setFormData( (prevData: INT1099Form) => ({
            ...prevData,
            [name]: value
        }));
   };



   return(
        <>
            <GridContainer>
                <Grid row>
                    <div className="usa-layout-docs__main desktop:grid-col-12 tablet:grid-col-8">
                        <Form onSubmit={handleSubmit}>
                            {Object.entries(formData).map(([key, value]) => {
                                if(key === "payerName" || key === "interestIncome" || key === "federalIncomeTaxWithheld" || key === "savingsBondsAndTreasuryInterest" || key === "investmentExpenses" || key === "marketDiscount"){
                                    return(
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
   )
   
}