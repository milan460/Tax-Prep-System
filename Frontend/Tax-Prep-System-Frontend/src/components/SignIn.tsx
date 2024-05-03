import React, { useState } from 'react';
import './signIn.css';
import { Button, Fieldset, Form, Grid, GridContainer, Header, Label, Link, TextInput, Title } from '@trussworks/react-uswds';
import { useTranslation } from 'react-i18next';

const SignIn: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();
    
  return <>
      <a className="usa-skipnav" href="#main-content">
        {t('skipToMainContent')}
      </a>
      <Header extended>
        <div className="usa-navbar">
          <Title id="extended-logo">
            <h3 title="Home" aria-label="Home">
              {t('federalTaxCalculator')}
            </h3>
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
                  <Form onSubmit={undefined}>
                    <Fieldset legend={t('accessYourAccount')} legendStyle="large">
                      <Label htmlFor="email">{t('emailAddress')}</Label>
                      <TextInput id="email" name="email" type="email" autoCorrect="off" autoCapitalize="off" required={true} />

                      <Label htmlFor="password-sign-in">{t('password')}</Label>
                      <TextInput id="password-sign-in" name="password" type={showPassword ? 'text' : 'password'} autoCorrect="off" autoCapitalize="off" required={true} />

                      <button title="Show password" type="button" className="usa-show-password" aria-controls="password-sign-in" onClick={(): void => setShowPassword(showPassword => !showPassword)}>
                        {showPassword ? 'Hide password' : 'Show password'}
                      </button>

                      <Button type="submit">{t('signIn')}</Button>

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

