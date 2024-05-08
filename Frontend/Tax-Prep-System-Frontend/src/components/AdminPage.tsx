import React, { useEffect, useState } from 'react';
import './adminPage.css';
import { Alert, Button, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds';

// TypeScript interface for the props
interface ComponentProps{
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

// Interface for the admin form data structure
interface AdminFormData {
    id: number;
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
    [key: string]: number; // Allows for indexing by string keys
}

const AdminPage: React.FC<ComponentProps> = ({ setCurrentPage }) => {
    setCurrentPage(-1);
    // Initial state for form data
    const initialFormData: AdminFormData = {
        id: 1,
        dependentsConstant: 0,
        singleStatus: 0,
        marriedStatus: 0,
        taxBracket1: 0,
        taxBracket2: 0,
        taxBracket3: 0,
        taxBracket4: 0,
        taxBracket5: 0,
        taxBracket6: 0,
        taxBracket7: 0
    };
    
    // State hooks for form data, alert visibility, and submission success
    const [formData, setFormData] = useState<AdminFormData>(initialFormData);
    const [showAlert, setShowAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Function to retrieve a cookie value by name
    function getCookie(name: string | any[]) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')){
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                }
            }
        }
        return cookieValue;
    }

    const csrfToken = getCookie('XSRF-TOKEN');

    // Fetches initial data for the form
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/constants`, {
            credentials: "include",
            method: 'GET'
        });
            if (response.ok) {
                const data = await response.json();
                const dataObject = data[0]
                setFormData({ ...initialFormData, ...dataObject });
            }
        } catch (error) {
            console.error('Error fetching constants data:', error);
        }
    };
    
    // Effect hook to fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Handles field input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: Number(value)
        }));
    };

    // Handles form submission
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formDataToSend = {
            id: formData.id,
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
                credentials: "include",
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(formDataToSend)
            });
            setIsSuccess(true);
            console.log(response)
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
                <p>*Please update any fields that have changed*</p>
                <GridContainer>
                    <Grid row gap>
                        {Object.keys(initialFormData).map((key, index) => {
                            if (key !== "id") { // Exclude the 'id' key from rendering
                                return (
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
                                );
                            }
                            return null; 
                        })}
                    </Grid>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button type="button" id='adminSubmitChangesButton' onClick={handleSubmit}>Submit Changes</Button>
                    </div>
                </GridContainer>
            </div>
        </>
    );
}

export default AdminPage;