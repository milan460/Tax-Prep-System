import React, { useState, useEffect } from "react";
import { Form, GridContainer, Grid, TextInput, Label, Button, Select, FormGroup, DateInputGroup, Fieldset, DatePicker, DateInput } from '@trussworks/react-uswds';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');



    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/personalForms/user/${initialUser.userId}`);
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


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const dateOfBirth = `${selectedYear}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;

        const isValidDate = isValidInputDate(selectedYear, selectedMonth, selectedDay);
        if (!isValidDate) {
            toast.error('Please enter a valid date.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

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
            dateOfBirth: dateOfBirth,
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

    const handleFilingStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            filingStatus: value
        }));
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
        <h1>Personal Information</h1>
            <GridContainer>
                <Grid row>
                    <Grid col={3} className="usa-form-group">
                        <Label htmlFor="firstName" className="text-bold text-underline text-info-darker">First Name</Label>
                        <TextInput
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            style={{ width: "calc(100% - 16px)" }}
                            type="text"
                        />
                    </Grid>

                    <Grid col={3} className="usa-form-group">
                        <Label htmlFor="lastName" className="text-bold text-underline text-info-darker">Last Name</Label>
                        <TextInput
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            style={{ width: "calc(100% - 16px)" }}
                            type="text"
                        />
                    </Grid>

                    <Grid col={3} className="usa-form-group">
                        <Label htmlFor="email" className="text-bold text-underline text-info-darker">Email</Label>
                        <TextInput
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: "calc(100% - 16px)" }}
                            type="email"
                        />
                    </Grid>

                    <Grid col={3} className="usa-form-group">
                        <Label htmlFor="ssn" className="text-bold text-underline text-info-darker">Social Security Number</Label>
                        <TextInput
                            id="ssn"
                            name="ssn"
                            value={formData.ssn}
                            onChange={handleChange}
                            style={{ width: "calc(100% - 16px)" }}
                            type="text"
                        />
                    </Grid>

                    <Grid col={3} className="usa-form-group">
                        <Label htmlFor="streetAddress1" className="text-bold text-underline text-info-darker">Street Address 1</Label>
                        <TextInput
                            id="streetAddress1"
                            name="streetAddress1"
                            value={formData.streetAddress1}
                            onChange={handleChange}
                            style={{ width: "calc(100% - 16px)" }}
                            type="text"
                        />
                    </Grid>

                    <Grid col={3} className="usa-form-group">
                        <Label htmlFor="streetAddress2" className="text-bold text-underline text-info-darker">Street Address 2</Label>
                        <TextInput
                            id="streetAddress2"
                            name="streetAddress2"
                            value={formData.streetAddress2}
                            onChange={handleChange}
                            style={{ width: "calc(100% - 16px)" }}
                            type="text"
                        />
                    </Grid>

                    <Grid col={3} className="usa-form-group">
                        <Label htmlFor="city" className="text-bold text-underline text-info-darker">City</Label>
                        <TextInput
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            style={{ width: "calc(100% - 16px)" }}
                            type="text"
                        />
                    </Grid>

                    <Grid col={3} className="usa-form-group">
                        <Label htmlFor="state" className="text-bold text-underline text-info-darker">State</Label>
                        <Select
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleStateChange}
                            style={{ width: "calc(100% - 16px)" }}
                        >
                            <option value="">- Select -</option>
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
                            <option value="OklahomaK">Oklahoma</option>
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

                        <Grid col={3} className="usa-form-group">
                            <Label htmlFor="zip" className="text-bold text-underline text-info-darker">ZIP Code</Label>
                            <TextInput
                                id="zip"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="text"
                            />
                        </Grid>
                        <Grid col={3} className="usa-form-group">
                            <Label htmlFor="filingStatus" className="text-bold text-underline text-info-darker">Filing Status</Label>
                            <Select
                                id="filingStatus"
                                name="filingStatus"
                                value={formData.filingStatus}
                                onChange={handleFilingStatusChange}
                                style={{ width: "calc(100% - 16px)" }}
                            >
                                <option value="">- Select -</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </Select>
                        </Grid>

                        <Grid col={3} className="usa-form-group">
                            <Label htmlFor="dependents" className="text-bold text-underline text-info-darker">Dependents</Label>
                            <TextInput
                                id="dependents"
                                name="dependents"
                                value={formData.dependents}
                                onChange={handleChange}
                                style={{ width: "calc(100% - 16px)" }}
                                type="number"
                            />
                        </Grid>
                    </Grid>

                    <Label htmlFor="dateOfBirth" className="text-bold text-underline text-info-darker">Date of Birth</Label>
                    <DateInputGroup>
                        <FormGroup className="usa-form-group--month usa-form-group--select">
                            <Label htmlFor="month">Month</Label>
                            <Select id="month" name="month" value={selectedMonth} onChange={handleMonthChange}>
                                <option value="">- Select -</option>
                                <option value="01">01 - January</option>
                                <option value="02">02 - February</option>
                                <option value="03">03 - March</option>
                                <option value="04">04 - April</option>
                                <option value="05">05 - May</option>
                                <option value="06">06 - June</option>
                                <option value="07">07 - July</option>
                                <option value="08">08 - August</option>
                                <option value="09">09 - September</option>
                                <option value="10">10 - October</option>
                                <option value="11">11 - November</option>
                                <option value="12">12 - December</option>
                            </Select>
                        </FormGroup>
                        <DateInput id="day" name="day" label="Day" unit="day" maxLength={2} minLength={2} value={selectedDay} onChange={handleDayChange} style={{ marginRight: '8px' }} />
                        <DateInput id="year" name="year" label="Year" unit="year" maxLength={4} minLength={4} value={selectedYear} onChange={handleYearChange} />
                    </DateInputGroup>
                    <div style={{ marginTop: '20px' }}>
                        <Grid row>
                            <Grid col={12}>
                                <Button type="button" base>Back</Button>
                                <Button type="button" onClick={handleSubmit}>Continue</Button>
                            </Grid>
                        </Grid>
                    </div>
            </GridContainer>
        </>
    );

}