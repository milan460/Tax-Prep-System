import { Grid, GridContainer, MediaBlockBody } from '@trussworks/react-uswds';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// TypeScript interface for the props
interface ComponentProps{
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Home: React.FC<ComponentProps> = ({ setCurrentPage }) => {

    setCurrentPage(1);

    const navigate = useNavigate();
    const { t } = useTranslation();

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
                        <span className="usa-hero__heading--alt">{t('startToday')}</span>
                        {t('effortlessTaxManagement')}
                    </h1>
                    <p>
                        {t('guideTaxFiling')}
                    </p>
                    <button className="usa-button" onClick={handleNavigate}>
                        {t('getStartedNow')}
                    </button>
                </div>
            </GridContainer>
        </section>

        <section className="grid-container usa-section">
            <Grid row gap>
                <Grid tablet={{ col: 4 }}>
                    <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
                        {t('simplifyTaxPlanning')}
                    </h2>
                </Grid>
                <Grid tablet={{ col: 8 }} className="usa-prose" style={{ textAlign: 'left' }}>
                    <p>
                        {t('takeComplexityOut')}
                    </p>
                    <p>
                        {t('demystifyTaxes')}
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
                                {t('streamlineTaxReturns')}
                            </h2>
                            <p>
                                {t('leveragePower')}
                            </p>
                        </MediaBlockBody>
                    </Grid>
                    <Grid tablet={{ col: true }} className="usa-media-block">
                        <MediaBlockBody>
                            <h2 className="usa-graphic-list__heading">
                                {t('stayInformed')}
                            </h2>
                            <p>
                                {t('gainValuableInsights')}
                            </p>
                        </MediaBlockBody>
                    </Grid>
                </Grid>
                <Grid row gap className="usa-graphic-list__row">
                    <Grid tablet={{ col: true }} className="usa-media-block">
                        <MediaBlockBody>
                            <h2 className="usa-graphic-list__heading">
                                {t('maximizeTaxDeductions')}
                            </h2>
                            <p>
                                {t('unlockPotential')}
                            </p>
                        </MediaBlockBody>
                    </Grid>
                    <Grid tablet={{ col: true }} className="usa-media-block">
                        <MediaBlockBody>
                            <h2 className="usa-graphic-list__heading">
                                {t('empowerYourJourney')}
                            </h2>
                            <p>
                                {t('empowerYourself')}
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

export default Home;