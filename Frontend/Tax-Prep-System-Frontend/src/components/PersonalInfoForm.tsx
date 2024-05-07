import React, { useState, useEffect, useCallback } from "react";
import { GridContainer, Grid, TextInput, Label, Button, Select, FormGroup, DateInputGroup, DateInput, Alert } from '@trussworks/react-uswds';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// TypeScript interface for the props
interface ComponentProps{
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

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
    password?: string;
    role?: string;
}

const PersonalInfoForm: React.FC<ComponentProps> = ({ setCurrentPage }) => {

    setCurrentPage(1);

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

    const User: User = {
        userId: 0,
        username: "",
        password: "",
        role: ""
    };


    const [formData, setFormData] = useState<PersonalInfoFormData>(initialFormData);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
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

    const fetchData = useCallback(async () => {

        try {
            const response = await fetch(`http://localhost:8080/personalForms/user/${initialUser.userId}`, {
                credentials: 'include',
                method: 'GET'
            });
            if (response.ok) {
                const data: PersonalInfoFormData = await response.json();
                setFormData(data);

                const [year, month, day] = data.dateOfBirth.split('-');
                setSelectedYear(year);
                setSelectedMonth(month);
                setSelectedDay(day);
            }
        } catch (error) {
            console.error('Error fetching personal form data:', error);
        }
    }, [initialUser.userId]);

    useEffect(() => {
        fetchCurrentUser();
        fetchData();
    }, [fetchData, initialUser.userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const [isDateOfBirthUpdated, setIsDateOfBirthUpdated] = useState(false);

    const updateDateOfBirth = () => {
        const dateOfBirth = `${selectedYear}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;
        if (!isValidInputDate(selectedYear, selectedMonth, selectedDay)) {
            console.log("Invalid Date of Birth:", dateOfBirth);
            setShowAlert(true);
            setIsSuccess(false);
            return Promise.reject("Invalid date");
        }

        setFormData(prevData => ({
            ...prevData,
            dateOfBirth: dateOfBirth
        }));
        setIsDateOfBirthUpdated(true);
    };

    useEffect(() => {
        if (isDateOfBirthUpdated) {
            handleSubmit();
            setIsDateOfBirthUpdated(false);
        }
    }, [isDateOfBirthUpdated]);

    
    
    const handleSubmit = async () => {
    
        const { streetAddress2, dependents, ...otherFields } = formData;
        const isEmptyField = Object.values(otherFields).some(value => value === '');
    
        if (isEmptyField) {
            console.log("Empty fields detected in:", otherFields);
            setShowAlert(true);
            setIsSuccess(false);
            return;
        }

        // Prepare the request options with updated formData
        const requestOptions: RequestInit = {
            credentials: 'include',
            method: formData.id ? 'PUT' : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user: { userId: initialUser.userId },
                ...formData
            })
        };

        try {
            const url = formData.id ? `http://localhost:8080/personalForms/updatePersonalInfo/${initialUser.userId}` : 'http://localhost:8080/personalForms/createPersonalForm';
            const response = await fetch(url, requestOptions);
            setIsSuccess(true);
            setShowAlert(false);
            navigate('/w2-form');

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
    

    const handleFilingStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if (value === "Married") {
            setFormData((prevData) => ({
                ...prevData,
                filingStatus: value,
            }));
        } else if (value === "Married File Separate") {
            setFormData((prevData) => ({
                ...prevData,
                filingStatus: "Married File Separate",
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                filingStatus: value,
            }));
        }
    };

    const handleHome = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/home')
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedState = e.target.value;
        setFormData(prevData => ({
            ...prevData,
            state: selectedState
        }));
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(e.target.value);
    };

    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDay(e.target.value);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedYear(e.target.value);
    };

    const isValidInputDate = (year: string, month: string, day: string) => {
        const parsedYear = parseInt(year);
        const parsedMonth = parseInt(month);
        const parsedDay = parseInt(day);

        if (
            isNaN(parsedYear) ||
            isNaN(parsedMonth) ||
            isNaN(parsedDay) ||
            parsedYear < 1000 ||
            parsedYear > 9999 ||
            parsedMonth < 1 ||
            parsedMonth > 12 ||
            parsedDay < 1 ||
            parsedDay > 31
        ) {
            return false;
        }

        return true;
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
                <h1>{t('personalInformation')}</h1>
                <GridContainer>
                    <Grid row>

                        <Grid col={4} className="usa-form-group">
                            <Label htmlFor="firstName" className="text-bold text-underline text-info-darker">{t('firstNameLabel')}</Label>
                            <TextInput
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder={t('firstNamePlaceholder')}
                            />
                        </Grid>
                        <Grid col={4} className="usa-form-group">
                            <Label htmlFor="lastName" className="text-bold text-underline text-info-darker">{t('lastNameLabel')}</Label>
                            <TextInput
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder={t('lastNamePlaceholder')}
                            />
                        </Grid>
                        <Grid col={4} className="usa-form-group">
                            <Label htmlFor="email" className="text-bold text-underline text-info-darker">{t('emailLabel')}</Label>
                            <TextInput
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="email"
                                placeholder={t('emailPlaceholder')}
                            />
                        </Grid>


                        <Grid col={6} className="usa-form-group">
                            <Label htmlFor="streetAddress1" className="text-bold text-underline text-info-darker">{t('streetAddress1Label')}</Label>
                            <TextInput
                                id="streetAddress1"
                                name="streetAddress1"
                                value={formData.streetAddress1}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder={t('streetAddress1Placeholder')}
                            />
                        </Grid>


                        <Grid col={6} className="usa-form-group">
                            <Label htmlFor="streetAddress2" className="text-bold text-underline text-info-darker">{t('streetAddress2Label')} <span className="text-italic">- {t('optional')}</span></Label>
                            <TextInput
                                id="streetAddress2"
                                name="streetAddress2"
                                value={formData.streetAddress2}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder={t('streetAddress2Placeholder')}
                            />
                        </Grid>
                        <Grid col={4} className="usa-form-group">
                            <Label htmlFor="city" className="text-bold text-underline text-info-darker">{t('cityLabel')}</Label>
                            <TextInput
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder={t('cityPlaceholder')}
                            />
                        </Grid>
                        <Grid col={4} className="usa-form-group">
                            <Label htmlFor="state" className="text-bold text-underline text-info-darker">{t('stateLabel')}</Label>
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
                        <Grid col={4} className="usa-form-group">
                            <Label htmlFor="zip" className="text-bold text-underline text-info-darker">{t('zipLabel')}</Label>
                            <TextInput
                                id="zip"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder="Ex: 12345"
                            />
                        </Grid>
                        <Grid col={4} className="usa-form-group">
                            <Label htmlFor="ssn" className="text-bold text-underline text-info-darker">{t('ssnLabel')}</Label>
                            <TextInput
                                id="ssn"
                                name="ssn"
                                value={formData.ssn}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                                placeholder="123-45-6789"
                                pattern="\d{3}-\d{2}-\d{4}"
                                maxLength={11}
                            />
                        </Grid>

                        <Grid col={4} className="usa-form-group">
                            <Label htmlFor="filingStatus" className="text-bold text-underline text-info-darker">{t('filingStatusLabel')}</Label>
                            <Select
                                id="filingStatus"
                                name="filingStatus"
                                value={formData.filingStatus}
                                onChange={handleFilingStatusChange}
                                style={{ width: "calc(100% - 16px)" }}
                            >
                                <option value="">{t('filingStatusPlaceholder')}</option>
                                <option value="Single">{t('single')}</option>
                                <option value="Married">{t('married')}</option>
                                <option value="Married File Separate">{t('marriedFileSeparate')}</option>
                            </Select>
                        </Grid>
                        <Grid col={4} className="usa-form-group">
                            <Label htmlFor="dependents" className="text-bold text-underline text-info-darker">{t('dependentsLabel')}</Label>
                            <TextInput
                                id="dependents"
                                name="dependents"
                                value={formData.dependents}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                                placeholder="Ex: 0"
                            />
                        </Grid>

                        <Grid col={6} className="usa-form-group">
                            <Label htmlFor="dateOfBirth" className="text-bold text-underline text-info-darker">{t('dateOfBirthLabel')}</Label>
                            <DateInputGroup>
                                <FormGroup className="usa-form-group--month usa-form-group--select">
                                    <Label htmlFor="month">{t('monthLabel')}</Label>
                                    <Select id="month" name="month" value={selectedMonth} onChange={handleMonthChange}>
                                        <option value="">{t('monthPlaceholder')}</option>
                                        <option value="01">{t('january')}</option>
                                        <option value="02">{t('february')}</option>
                                        <option value="03">{t('march')}</option>
                                        <option value="04">{t('april')}</option>
                                        <option value="05">{t('may')}</option>
                                        <option value="06">{t('june')}</option>
                                        <option value="07">{t('july')}</option>
                                        <option value="08">{t('august')}</option>
                                        <option value="09">{t('september')}</option>
                                        <option value="10">{t('october')}</option>
                                        <option value="11">{t('november')}</option>
                                        <option value="12">{t('december')}</option>
                                    </Select>
                                </FormGroup>
                                <DateInput id="day" name="day" label={t("dayLabel")} unit="day" maxLength={2} minLength={2} value={selectedDay} onChange={handleDayChange} style={{ marginRight: '8px' }} placeholder="Ex:7" />
                                <DateInput id="year" name="year" label={t("yearLabel")} unit="year" maxLength={4} minLength={4} value={selectedYear} onChange={handleYearChange} placeholder="Ex:2000" />
                            </DateInputGroup>
                        </Grid>
                    </Grid>

                </GridContainer>
                <GridContainer>
                    <Grid row>
                        <Grid col={12} className="usa-form-group">
                            <Button type="button" base style={{ marginBottom: '20px' }} onClick={handleHome}>{t('homeButton')}</Button>
                            <Button type="button" onClick={async (e) => {
                                e.preventDefault();
                                try {
                                    await updateDateOfBirth();
                                } catch (error) {
                                    console.error("Error updating Date of Birth:", error);
                                }
                            }}>{t('continueButton')}</Button>

                        </Grid>
                    </Grid>
                </GridContainer>
            </div>
        </>
    );

}

export default PersonalInfoForm;