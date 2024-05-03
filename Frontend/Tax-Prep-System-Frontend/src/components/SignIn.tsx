import React, { useState } from 'react';
import './signIn.css';
import { Button, Fieldset, Form, Grid, GridContainer, Header, Label, Link, TextInput, Title } from '@trussworks/react-uswds';
import { useTranslation } from 'react-i18next';

interface User{
    username: string;
    password: string;
}

const SignIn: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState<User>({username: "", password: ""});
    const { t } = useTranslation();


    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(user)

        
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if(response.ok){
                console.log("Login successful")
            }
            else{
                console.log("Login failed")
            }
        }).then(data => {
            console.log('success', data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }

  // const handleSingleSignOn = () => {
  //   fetch('http://localhost:8080/signin', {
  //     credentials: 'include', 
  //     method: 'GET'
  //   })
  //   .then(response => response.json())
  //   .then(user => {
  //     storeUser(user);
  //     console.log('User stored successfully', user);
  //     window.location.replace("http://localhost:8080/accessToken");  // Redirect to fetch the access token
  //   })
  //   .catch(error => {
  //     console.error('Error fetching user:', error);
  //   });
  // }
  
  // // Function to handle storing the user
  // const storeUser = (user) => {
  //     localStorage.setItem('user', JSON.stringify(user));  // Use sessionStorage if preferred
  // }
  
  
    const handleSingleSignOn = () => {
        window.location.replace("http://localhost:8080/signin");

        // //fetch the access token and store it as a cookie
        // fetch('http://localhost:8080/accessToken', {
        //     credentials: 'include', 
        //     method: 'GET'
        // })
        // .then(response => {
        //     console.log('Access token should now be stored as a cookie');
        // })
        // .then(data => {
        //   localStorage.setItem('accessToken', JSON.stringify(data));
        //   console.log('success', data);
        //   window.location.replace("http://localhost:5173/personal-info-form");
        // })
        // .catch(error => {
        //     console.error('Error fetching access token:', error);
        // });

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser: User) => ({
            ...prevUser,
            [name]: value
        }));
    }
    
  return <>
      <a className="usa-skipnav" href="#main-content">
        {t('skipToMainContent')}
      </a>
      <Header extended>
        <div className="usa-navbar">
          <Title id="extended-logo">
            <a href="/" title="Home" aria-label="Home">
              {t('federalTaxCalculator')}
            </a>
          </Title>
        </div>
      </Header>

      <main id="main-content">
        <div className="bg-base-lightest">
          <GridContainer className="usa-section">
            <Grid row={true} className="flex-justify-center">
              <Grid col={12} tablet={{
              col: 8
            }} desktop={{
              col: 6
            }}>
                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                  <h1 className="margin-bottom-0">{t('signIn')}</h1>
                  <Form onSubmit={handleLogin}>
                    <Fieldset legend={t('accessYourAccount')} legendStyle="large">
                      <Label htmlFor="username">{t('Username')}</Label>
                      <TextInput id="username" name="username" type="text" autoCorrect="off" autoCapitalize="off" required={true} onChange={handleChange}/>

                      <Label htmlFor="password-sign-in">{t('password')}</Label>
                      <TextInput id="password-sign-in" name="password" type={showPassword ? 'text' : 'password'} autoCorrect="off" autoCapitalize="off" required={true} onChange={handleChange} />

                      <button title="Show password" type="button" className="usa-show-password" aria-controls="password-sign-in" onClick={(): void => setShowPassword(showPassword => !showPassword)}>
                        {showPassword ? 'Hide password' : 'Show password'}
                      </button>

                      <Button type="submit">{t('signIn')}</Button>
                      <Button type="button" onClick={handleSingleSignOn}>{t('Sign in With Google')}</Button>

                      <p>
                        <Link href="javascript:void();">{t('forgotPassword')}</Link>
                      </p>
                    </Fieldset>
                  </Form>
                </div>

                <p className="text-center">
                  {t('dontHaveAccount')}
                  <Link href="javascript:void();">{t('createYourAccountNow')}</Link>
                  .
                </p>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
      </main>
    </>;
}

export default SignIn;

