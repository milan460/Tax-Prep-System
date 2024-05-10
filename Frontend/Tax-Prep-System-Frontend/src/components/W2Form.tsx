import React, { useState, useEffect } from "react";
import { GridContainer, Grid, TextInput, Label, Button, Select, Alert } from '@trussworks/react-uswds';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// TypeScript interface for the props
interface ComponentProps{
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

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

const W2Form: React.FC<ComponentProps> = ({ setCurrentPage }) => {

    setCurrentPage(2);
    
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
    const { t } = useTranslation();

    // Function to fetch current user details
    const fetchCurrentUser = async () => {
        try {
            const response = await fetch('http://tyler-alex-milan-tax-system.skillstorm-congo.com:8080/currentUser', {
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

    // Function to retrieve a cookie value by name
    function getCookie(name: string | unknown[]) {
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

    // Function to fetch existing W2 form data for the user
    const fetchData = async () => {
        try {
            const response = await fetch(`http://tyler-alex-milan-tax-system.skillstorm-congo.com:8080/w2Forms/user/${initialUser.userId}`, {
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

    // Effect to fetch user and form data on component mount or user ID change
    useEffect(() => {
        fetchCurrentUser();
        fetchData();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialUser.userId]);

    // Handlers for form input changes
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

    // Navigation handler for going back
    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/personal-info-form');
    }

    // Handler for submitting the form data
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(formDataToSend)
            };
        } else {
            requestOptions = {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(formDataToSend)
            };
        }
        try {
            let url = 'http://tyler-alex-milan-tax-system.skillstorm-congo.com:8080/w2Forms/createW2Form';
            if (formData.id) {
                url = `http://tyler-alex-milan-tax-system.skillstorm-congo.com:8080/w2Forms/updateW2Form/${userId}`;
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
                        {t('formMissingContent')}
                    </Alert>
                )}
                {isSuccess && (
                    <Alert type="success" heading="Success status" headingLevel="h4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        {t('formSuccessfullyFilled')}
                    </Alert>
                )}
                <h1>{t('w2FormHeading')}</h1>
                <GridContainer>
                    <Grid row>
                        <Grid col={2} />
                        <Grid col={4}>
                            <Label htmlFor="income" className="text-bold text-underline text-info-darker">{t('incomeLabel')}</Label>
                            <TextInput
                                id="income"
                                name="income"
                                value={formData.income}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder={t('incomePlaceholder')}
                            />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="federalIncomeWithheld" className="text-bold text-underline text-info-darker">{t('federalIncomeWithheldLabel')}</Label>
                            <TextInput
                                id="federalIncomeWithheld"
                                name="federalIncomeWithheld"
                                value={formData.federalIncomeWithheld}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder={t('federalIncomeWithheldPlaceholder')}
                            />
                        </Grid>
                        <Grid col={2} />
                        <Grid col={2} />
                        <Grid col={4}>
                            <Label htmlFor="medicareWages" className="text-bold text-underline text-info-darker">{t('medicareWagesLabel')}</Label>
                            <TextInput
                                id="medicareWages"
                                name="medicareWages"
                                value={formData.medicareWages}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder={t('medicareWagesPlaceholder')}
                            />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="medicareTaxWithheld" className="text-bold text-underline text-info-darker">{t('medicareTaxWithheldLabel')}</Label>
                            <TextInput
                                id="medicareTaxWithheld"
                                name="medicareTaxWithheld"
                                value={formData.medicareTaxWithheld}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder={t('medicareTaxWithheldPlaceholder')}
                            />
                        </Grid>
                        <Grid col={2} />
                        <Grid col={2} />
                        <Grid col={4}>
                            <Label htmlFor="socialSecurityWages" className="text-bold text-underline text-info-darker">{t('socialSecurityWagesLabel')}</Label>
                            <TextInput
                                id="socialSecurityWages"
                                name="socialSecurityWages"
                                value={formData.socialSecurityWages}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder={t('socialSecurityWagesPlaceholder')}
                            />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="socialSecurityTaxWithheld" className="text-bold text-underline text-info-darker">{t('socialSecurityTaxWithheldLabel')}</Label>
                            <TextInput
                                id="socialSecurityTaxWithheld"
                                name="socialSecurityTaxWithheld"
                                value={formData.socialSecurityTaxWithheld}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder={t('socialSecurityTaxWithheldPlaceholder')}
                            />
                        </Grid>
                        <Grid col={2} />
                        <Grid col={2} />
                        <Grid col={4}>
                            <Label htmlFor="streetAddress1" className="text-bold text-underline text-info-darker">{t('employerStreetAddress1Label')}</Label>
                            <TextInput
                                id="streetAddress1"
                                name="streetAddress1"
                                value={formData.streetAddress1}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder={t('employerStreetAddress1Placeholder')}
                            />
                        </Grid>
                        <Grid col={4}>
                            <Label htmlFor="streetAddress2" className="text-bold text-underline text-info-darker">{t('employerStreetAddress2Label')} <span className="text-italic">- {t('optional')}</span></Label>
                            <TextInput
                                id="streetAddress2"
                                name="streetAddress2"
                                value={formData.streetAddress2}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder={t('employerStreetAddress2Placeholder')}
                            />
                        </Grid>
                        <Grid col={2} />
                        <Grid col={2} />
                        <Grid col={3}>
                            <Label htmlFor="city" className="text-bold text-underline text-info-darker">{t('employerCityLabel')}</Label>
                            <TextInput
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder={t('employerCityPlaceholder')}
                            />
                        </Grid>
                        <Grid col={3} className="usa-form-group">
                            <Label htmlFor="state" className="text-bold text-underline text-info-darker">{t('employerStateLabel')}</Label>
                            <Select
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleStateChange}
                                style={{ width: "calc(100% - 16px)" }}
                            >
                                <option value="">{t('statePlaceholder')}</option>
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
                                <option value="Oklahoma">Oklahoma</option>
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
                            <Label htmlFor="zip" className="text-bold text-underline text-info-darker">{t('zipLabel')}</Label>
                            <TextInput
                                id="zip" name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder={t('zipPlaceholder')}
                            />
                        </Grid>
                    </Grid>
                </GridContainer>
                <GridContainer>
                    <Grid row>
                        <Grid col={12}>
                            <Button type="button" base onClick={handleBack} style={{ marginTop: '20px', marginBottom: '20px' }}>{t('backButton')}</Button>
                            <Button type="button" onClick={handleSubmit}>{t('continueButton')}</Button>
                        </Grid>
                    </Grid>
                </GridContainer>
            </div>
        </>
    );
}

export default W2Form;