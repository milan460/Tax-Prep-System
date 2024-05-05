import { Grid, GridContainer, MediaBlockBody } from '@trussworks/react-uswds';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/personal-info-form');
    };

    return (
        <>
            <main id="main-content">
                <section className="usa-hero" aria-label="Introduction">
                    <GridContainer>
                        <div className="usa-hero__callout" style={{ textAlign: 'left' }}>
                            <h1 className="usa-hero__heading">
                                <span className="usa-hero__heading--alt">Start Today:</span>
                                Effortless Tax Management Made Simple!
                            </h1>
                            <p>
                                Let us guide you through the tax filing process effortlessly. Start today and empower yourself with easy tax calculations.
                            </p>
                            <button className="usa-button" onClick={handleNavigate}>
                                Get Started Now
                            </button>
                        </div>
                    </GridContainer>
                </section>

                <section className="grid-container usa-section">
                    <Grid row gap>
                        <Grid tablet={{ col: 4 }}>
                            <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
                                Simplify Your Tax Planning
                            </h2>
                        </Grid>
                        <Grid tablet={{ col: 8 }} className="usa-prose" style={{ textAlign: 'left' }}>
                            <p>
                                Take the complexity out of tax planning with our innovative tax calculator. Our
                                tool streamlines the process, providing you with accurate tax estimates and
                                empowering you to make informed financial decisions.
                            </p>
                            <p>
                                Our mission is to demystify taxes and give you the confidence to manage your
                                finances effectively. Explore our tax calculator's features to see how it can
                                benefit your financial journey.
                            </p>
                        </Grid>
                    </Grid>
                </section>

                <section className="usa-graphic-list usa-section usa-section--dark">
                    <GridContainer>
                        <Grid row gap className="usa-graphic-list__row">
                            <Grid tablet={{ col: true }} className="usa-media-block">
                                <MediaBlockBody>
                                    <h2 className="usa-graphic-list__heading">
                                        Streamline Tax Returns with W2 and 1099-INT Forms
                                    </h2>
                                    <p>
                                        Leverage the power of W2 and 1099-INT forms for accurate and efficient tax calculations. Simplify your tax management process with our comprehensive guide.
                                    </p>
                                </MediaBlockBody>
                            </Grid>
                            <Grid tablet={{ col: true }} className="usa-media-block">
                                <MediaBlockBody>
                                    <h2 className="usa-graphic-list__heading">
                                        Stay Informed and Organized
                                    </h2>
                                    <p>
                                        Gain valuable insights into tax planning strategies using W2 and 1099-INT forms. Stay informed, organized, and confident in managing your tax returns effectively.
                                    </p>
                                </MediaBlockBody>
                            </Grid>
                        </Grid>
                        <Grid row gap className="usa-graphic-list__row">
                            <Grid tablet={{ col: true }} className="usa-media-block">
                                <MediaBlockBody>
                                    <h2 className="usa-graphic-list__heading">
                                        Maximize Tax Deductions and Credits
                                    </h2>
                                    <p>
                                        Unlock potential tax deductions and credits with expert guidance on using W2 and 1099-INT forms. Optimize your tax returns and minimize liabilities today.
                                    </p>
                                </MediaBlockBody>
                            </Grid>
                            <Grid tablet={{ col: true }} className="usa-media-block">
                                <MediaBlockBody>
                                    <h2 className="usa-graphic-list__heading">
                                        Empower Your Financial Journey
                                    </h2>
                                    <p>
                                        Empower yourself with essential knowledge and tools to navigate tax season smoothly. Our platform is designed to simplify tax calculations and enhance your financial well-being.
                                    </p>
                                </MediaBlockBody>
                            </Grid>
                        </Grid>
                    </GridContainer>
                </section>
            </main>
        </>
    )
}