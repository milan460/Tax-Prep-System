import React, { useState } from 'react';
import './register.css';
import { Button, Checkbox, Fieldset, Form, Grid, GridContainer, Header, Label, Link, MediaBlockBody, TextInput, Title } from '@trussworks/react-uswds';

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
  return <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <Header extended>
        <div className="usa-navbar">
          <Title id="extended-logo">
            <a href="/" title="Home" aria-label="Home">
              Federal Tax Calculator
            </a>
          </Title>
        </div>
      </Header>

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
                  A tagline that explains the benefit of creating an account.
                </h1>

                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                  <h1 className="margin-bottom-0">Create account</h1>
                  <Form onSubmit={undefined}>
                    <Fieldset legend="Get started with an account.">
                      <p>
                        <abbr title="required" className="usa-hint usa-hint--required">
                          *
                        </abbr>{' '}
                        indicates a required field.
                      </p>

                      <Label htmlFor="email">
                        Email address{' '}
                        <abbr title="required" className="usa-label--required">
                          *
                        </abbr>
                      </Label>
                      <TextInput id="email" name="email" type="email" autoCapitalize="off" autoCorrect="off" required={true} />

                      <Label htmlFor="password-create-account">
                        Create password{' '}
                        <abbr title="required" className="usa-label--required">
                          *
                        </abbr>
                      </Label>
                      <TextInput id="password-create-account" name="password" type={showPassword ? 'text' : 'password'} autoCapitalize="off" autoCorrect="off" required={true} />

                      <button title="Show password" type="button" className="usa-show-password" aria-controls="password-create-account password-create-account-confirm" onClick={(): void => setShowPassword(showPassword => !showPassword)}>
                        {showPassword ? 'Hide password' : 'Show password'}
                      </button>

                      <Label htmlFor="password-create-account-confirm">
                        Re-type password{' '}
                        <abbr title="required" className="usa-label--required">
                          *
                        </abbr>
                      </Label>
                      <TextInput id="password-create-account-confirm" name="password-confirm" type={showPassword ? 'text' : 'password'} autoCapitalize="off" autoCorrect="off" required={true} />

                      {/* <Checkbox id="terms-and-conditions" name="terms-and-conditions" className="margin-y-3" required={true} label={checkboxLabel} /> */}

                      <Button type="submit">Create account</Button>
                    </Fieldset>
                  </Form>
                </div>

                <p className="text-center">
                  Already have an account?{' '}
                  <Link href="javascript:void(0);">Sign in</Link>.
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
                    A tagline that explains the benefit of creating an account.
                  </h2>

                  <div className="usa-prose">
                    <p>
                      Here’s space for a longer description to introduce 3-5
                      easily scannable bullet points. Note that on mobile, this
                      text block will bump below the Create Account form.
                    </p>
                    <section className="usa-graphic-list">
                      <div className="usa-graphic-list__row">
                        {Array.from(Array(3), (_, idx) => <div className="usa-media-block margin-y-2" key={idx}>
                            {/* <img className="usa-media-block__img height-7 width-7" src={circleSvg} alt="Alt text" /> */}
                            <MediaBlockBody>
                              <p>
                                <strong>Value proposition {idx + 1}:</strong>{' '}
                                Vivamus nec velit sed leo scelerisque laoreet
                                vestibulum.
                              </p>
                            </MediaBlockBody>
                          </div>)}
                      </div>
                    </section>
                  </div>                  
                </div>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
      </main>
    </>;
}

export default Register;

