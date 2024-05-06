import React, { useState, useEffect } from "react";
import { Form, GridContainer, Grid, TextInput, Label, Button, Select, FormGroup, DateInputGroup, Fieldset, DatePicker, DateInput, Table, Alert } from '@trussworks/react-uswds';
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

    setCurrentPage(3);
    
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
                                <option value="Alabama">{t('alabama')}</option>
                                <option value="Alaska">{t('alaska')}</option>
                                <option value="Arizona">{t('arizona')}</option>
                                <option value="Arkansas">{t('arkansas')}</option>
                                <option value="California">{t('california')}</option>
                                <option value="Colorado">{t('colorado')}</option>
                                <option value="Connecticut">{t('connecticut')}</option>
                                <option value="Delaware">{t('delaware')}</option>
                                <option value="District Of Columbia">{t('districtOfColumbia')}</option>
                                <option value="Florida">{t('florida')}</option>
                                <option value="Georgia">{t('georgia')}</option>
                                <option value="Hawaii">{t('hawaii')}</option>
                                <option value="Idaho">{t('idaho')}</option>
                                <option value="Illinois">{t('illinois')}</option>
                                <option value="Indiana">{t('indiana')}</option>
                                <option value="Iowa">{t('iowa')}</option>
                                <option value="Kansas">{t('kansas')}</option>
                                <option value="Kentucky">{t('kentucky')}</option>
                                <option value="Louisiana">{t('louisiana')}</option>
                                <option value="Maine">{t('maine')}</option>
                                <option value="Maryland">{t('maryland')}</option>
                                <option value="Massachusetts">{t('massachusetts')}</option>
                                <option value="Michigan">{t('michigan')}</option>
                                <option value="Minnesota">{t('minnesota')}</option>
                                <option value="Mississippi">{t('mississippi')}</option>
                                <option value="Missouri">{t('missouri')}</option>
                                <option value="Montana">{t('montana')}</option>
                                <option value="Nebraska">{t('nebraska')}</option>
                                <option value="Nevada">{t('nevada')}</option>
                                <option value="New Hampshire">{t('newHampshire')}</option>
                                <option value="New Jersey">{t('newJersey')}</option>
                                <option value="New Mexico">{t('newMexico')}</option>
                                <option value="New York">{t('newYork')}</option>
                                <option value="North Carolina">{t('northCarolina')}</option>
                                <option value="North Dakota">{t('northDakota')}</option>
                                <option value="Ohio">{t('ohio')}</option>
                                <option value="Oklahoma">{t('oklahoma')}</option>
                                <option value="Oregon">{t('oregon')}</option>
                                <option value="Pennsylvania">{t('pennsylvania')}</option>
                                <option value="Rhode Island">{t('rhodeIsland')}</option>
                                <option value="South Carolina">{t('southCarolina')}</option>
                                <option value="South Dakota">{t('southDakota')}</option>
                                <option value="Tennessee">{t('tennessee')}</option>
                                <option value="Texas">{t('texas')}</option>
                                <option value="Utah">{t('utah')}</option>
                                <option value="Vermont">{t('vermont')}</option>
                                <option value="Virginia">{t('virginia')}</option>
                                <option value="Washington">{t('washington')}</option>
                                <option value="West Virginia">{t('westVirginia')}</option>
                                <option value="Wisconsin">{t('wisconsin')}</option>
                                <option value="Wyoming">{t('wyoming')}</option>

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