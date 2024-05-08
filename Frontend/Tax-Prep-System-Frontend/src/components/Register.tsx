import React, { useState } from 'react';
import './register.css';
import { Button, Fieldset, Form, Grid, GridContainer, Label, Link, MediaBlockBody, TextInput } from '@trussworks/react-uswds';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const handleConsoleLog = () => {
    console.log("You pressed the login button.")
  }

  return( 
    <>
      <a className="usa-skipnav" href="#main-content">
        {t('skipToMainContent')}
      </a>
      <main id="main-content">
        <div className="bg-base-lightest">
          <GridContainer className="usa-section">
            <Grid row className="margin-x-neg-205 flex-justify-center">
              <Grid col={12} mobileLg={{
                col: 10
              }} tablet={{
                col: 8
              }} desktop={{
                col: 6
              }} className="padding-x-205 margin-bottom-4">
                <h1 className="desktop:display-none font-sans-lg margin-bottom-4 tablet:margin-top-neg-3">
                    {t('tagline')}
                </h1>
                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                  <h1 className="margin-bottom-0">{t('createAccount')}</h1>
                  <Form onSubmit={handleConsoleLog}>
                  <Fieldset legend={t('getStartedWithAnAccount')}>
                    <p>
                      <abbr title="required" className="usa-hint usa-hint--required">
                        *
                      </abbr>{' '}
                      {t('requiredField')}
                    </p>

                    <Label htmlFor="email">
                      {t('emailAddress')}{' '}
                      <abbr title="required" className="usa-label--required">
                        *
                      </abbr>
                    </Label>
                    <TextInput id="email" name="email" type="email" autoCapitalize="off" autoCorrect="off" required={true} />

                    <Label htmlFor="password-create-account">
                      {t('createPassword')}{' '}
                      <abbr title="required" className="usa-label--required">
                        *
                      </abbr>
                    </Label>
                    <TextInput id="password-create-account" name="password" type={showPassword ? 'text' : 'password'} autoCapitalize="off" autoCorrect="off" required={true} />
                    <button title="Show password" type="button" className="usa-show-password" aria-controls="password-create-account password-create-account-confirm" onClick={(): void => setShowPassword(showPassword => !showPassword)}>
                      {showPassword ? t('hidePassword') : t('showPassword')}
                    </button>

                    <Label htmlFor="password-create-account-confirm">
                      {t('retypePassword')}{' '}
                      <abbr title="required" className="usa-label--required">
                        *
                      </abbr>
                    </Label>
                    <TextInput id="password-create-account-confirm" name="password-confirm" type={showPassword ? 'text' : 'password'} autoCapitalize="off" autoCorrect="off" required={true} />
                    <Button type="submit">{t('createAccount')}</Button>
                  </Fieldset>
                  </Form>
                </div>

                <p className="text-center">
                  {t('alreadyHaveAccount')}{' '}
                  <Link href="javascript:void(0);">{t('signIn')}</Link>.
                </p>
              </Grid>

              <Grid col={12} mobileLg={{
                col: 10
              }} tablet={{
                col: 8
              }} desktop={{
                col: 6
              }} className="padding-x-205">
                  <div className="border-top border-base-lighter padding-top-4 desktop:border-0 desktop:padding-top-0">
                    <h2 className="display-none desktop:display-block">
                      {t('tagline')}
                    </h2>

                    <div className="usa-prose">
                      <p>
                          {t('longDescription')}
                      </p>
                      <section className="usa-graphic-list">
                        <div className="usa-graphic-list__row">
                          <div className="usa-media-block margin-y-2">
                              <MediaBlockBody>
                                  <p>
                                      <strong>{t('valueProposition1')}</strong>{' '}
                                      <p>{t('valueProposition1Explanation')}</p>
                                  </p>
                              </MediaBlockBody>
                              <MediaBlockBody>
                                  <p>
                                      <strong>{t('valueProposition2')}</strong>{' '}
                                      <p>{t('valueProposition2Explanation')}</p>
                                  </p>
                              </MediaBlockBody>
                              <MediaBlockBody>
                                  <p>
                                      <strong>{t('valueProposition3')}</strong>{' '}
                                      <p>{t('valueProposition3Explanation')}</p>
                                  </p>
                              </MediaBlockBody>
                            </div>
                        </div>
                      </section>
                    </div>                  
                  </div>
                </Grid>
            </Grid>
          </GridContainer>
        </div>
      </main>
    </>
  )
}

export default Register;

