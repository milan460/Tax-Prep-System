import React, { useEffect, useState } from 'react';
import './signIn.css';
import { Alert, Button, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds';
// import { useTranslation } from 'react-i18next';

interface AdminFormData {
    dependentsConstant: number;
    singleStatus: number; 
    marriedStatus: number;
    taxBracket1: number;
    taxBracket2: number;
    taxBracket3: number;
    taxBracket4: number;
    taxBracket5: number;
    taxBracket6: number;
    taxBracket7: number;
}


export default function W2Form() {
    const initialFormData: AdminFormData = {
        dependentsConstant: 0,
        singleStatus: 0,
        marriedStatus: 0,
        taxBracket1: 0,
        taxBracket2: 0,
        taxBracket3: 0,
        taxBracket4: 0,
        taxBracket5: 0,
        taxBracket6: 0,
        taxBracket7: 0,
    };
    

    const [formData, setFormData] = useState<AdminFormData>(initialFormData);
    const [showAlert, setShowAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/constants`);
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched Constants Data:", data);
                setFormData(data); 
            }
        } catch (error) {
            console.error('Error fetching constants data:', error);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: Number(value)
        }));
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedState = e.target.value;
        setFormData(prevData => ({
            ...prevData,
            state: selectedState
        }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formDataToSend = {
            dependentsConstant: formData.dependentsConstant,
            singleStatus: formData.singleStatus,
            marriedStatus: formData.marriedStatus,
            taxBracket1: formData.taxBracket1,
            taxBracket2: formData.taxBracket2,
            taxBracket3: formData.taxBracket3,
            taxBracket4: formData.taxBracket4,
            taxBracket5: formData.taxBracket5,
            taxBracket6: formData.taxBracket6,
            taxBracket7: formData.taxBracket7
        };
        try {
            const response = await fetch('http://localhost:8080/constants/updateConstants', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataToSend)
            });
    
            const result = await response.json();
            if (result.success) {
                console.log("successfully made put request:",result) 
            } else {
                console.log("put request was not successful")
            }
        } catch (error) {
            console.error('Error updating constants:', error);
            setShowAlert(true);
        }
    }

    return (
        <>
            <div>
                {showAlert && (
                    <Alert type="error" heading="Error status" headingLevel="h4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        There was a problem updating the constants.
                    </Alert>
                )}
                {isSuccess && (
                    <Alert type="success" heading="Success status" headingLevel="h4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        Constants have been successfully updated.
                    </Alert>
                )}
                <h1>Update Tax Constants</h1>
                <p>*Please update any fields .*</p>
                <GridContainer>
                    <Grid row gap>
                        {Object.keys(initialFormData).map((key, index) => (
                            <Grid col={4} key={index}>
                                <Label htmlFor={key} className="text-bold text-underline text-info-darker">
                                {key.replace(/([A-Z])/g, ' $1') // Adds space before capital letters
                                    .replace(/(\d+)/g, ' $1') // Adds space before numbers
                                    .replace(/^./, str => str.toUpperCase()) // Capitalizes the first letter
                                    .trim()
                                }
                                </Label>
                                <TextInput
                                    id={key}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    style={{ width: "calc(100% - 16px)" }}
                                    type="number"
                                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim()}`}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button type="button" onClick={handleSubmit}>Continue</Button>
                    </div>
                </GridContainer>
            </div>
        </>
    );
}


    // const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     navigate('/personal-info-form');
    // }

    // const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();

    //     const requiredFields = ["income", "streetAddress1", "city", "state", "zip"];
    //     const isEmptyField = Object.entries(formData)
    //         .filter(([key]) => requiredFields.includes(key))
    //         .some(([, value]) => value === '');

    //     if (isEmptyField) {
    //         setShowAlert(true);
    //         setIsSuccess(false);
    //         return;
    //     }

    //     const userId: number = initialUser.userId;

    //     let requestOptions: any;
    //     const formDataToSend = {
    //         user: {
    //             userId: initialUser.userId
    //         },
    //         income: parseFloat(formData.income),
    //         socialSecurityWages: parseFloat(formData.socialSecurityWages),
    //         medicareWages: parseFloat(formData.medicareWages),
    //         socialSecurityTaxWithheld: parseFloat(formData.socialSecurityTaxWithheld),
    //         medicareTaxWithheld: parseFloat(formData.medicareTaxWithheld),
    //         federalIncomeWithheld: parseFloat(formData.federalIncomeWithheld),
    //         streetAddress1: formData.streetAddress1,
    //         streetAddress2: formData.streetAddress2,
    //         city: formData.city,
    //         state: formData.state,
    //         zip: formData.zip
    //     };

    //     if (formData.id) {
    //         requestOptions = {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(formDataToSend)
    //         };
    //     } else {
    //         requestOptions = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(formDataToSend)
    //         };
    //     }

    //     try {
    //         let url = 'http://localhost:8080/w2Forms/createW2Form';
    //         if (formData.id) {
    //             url = `http://localhost:8080/w2Forms/updateW2Form/${userId}`;
    //         }

    //         const response = await fetch(url, requestOptions);

    //         setIsSuccess(true);
    //         setShowAlert(false);
    //         navigate('/int-1099-form');
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         if (response.status === 201) {
    //             const formId = response.headers.get('Location');
    //             if (formId) {
    //                 localStorage.setItem('formId', formId);
    //             }

    //             fetchData();
    //         }
    //     } catch (error) {
    //         console.error('There was a problem with the fetch operation:', error);
    //     }
    // };