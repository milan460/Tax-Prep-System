import React, { useState } from 'react';
import './header.css';
import buildingIcon from '/building-icon.svg';
import flagIcon from '/flag-icon.webp';
import lockIcon from '/lock-icon.svg';
import { Banner, BannerButton, BannerContent, BannerFlag, BannerGuidance, BannerHeader, BannerIcon, Button, LanguageSelector, MediaBlockBody, Title} from '@trussworks/react-uswds';
import { useTranslation } from 'react-i18next';


// TypeScript interface for the props
interface ComponentProps {
    currentPage: number;
}

const Header: React.FC<ComponentProps> = ({ currentPage }) => {

    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    
    // Function to change the language of the application
    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
    };

    // Function to handle user logout
    const handleLogout = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        window.location.replace("http://localhost:8080/logout");
    }
    

    return (
        <div id='headerDiv'>
            <Banner aria-label={t('bannerLabel')}>
                <BannerHeader isOpen={isOpen} flagImg={<BannerFlag src={flagIcon} aria-hidden alt="" />} headerText={t('headerText')} headerActionText={t('actionText')}>
                    <BannerButton isOpen={isOpen} aria-controls="custom-banner" onClick={(): void => {
                        setIsOpen(previousIsOpen => !previousIsOpen);
                    }}>
                    {t('actionText')}
                    </BannerButton>
                </BannerHeader>
                <BannerContent id="custom-banner" isOpen={isOpen}>
                    <div className="grid-row grid-gap-lg">
                        <BannerGuidance className="tablet:grid-col-6">
                            <BannerIcon src={buildingIcon} alt="" />
                            <MediaBlockBody>
                                <p>
                                    {t('actionText')}
                                    {t('officialWebsitesUseGov')}
                                    {t('govWebsiteOwnership')}
                                </p>
                            </MediaBlockBody>
                        </BannerGuidance>
                        <BannerGuidance className="tablet:grid-col-6">
                            <BannerIcon src={lockIcon} alt="" />
                            <MediaBlockBody>
                                <p>
                                    {t('secureGovWebsitesUseHttps')}
                                    {t('lockDescription')}
                                </p>
                            </MediaBlockBody>
                        </BannerGuidance>
                    </div>
                </BannerContent>
                <div id='containerToCenterLanguageSelectorAndLogoutButtonContainer'>
                    <div id='languageSelectorAndLogoutButtonContainer'>
                        {currentPage == 0 ? "" : (<Button id='logoutButton' type={'button'} onClick={handleLogout}>{t('logout')}</Button>)}
                        <LanguageSelector
                            langs={[
                                {
                                    attr: 'es',
                                    label: 'Español',
                                    label_local: 'Spanish',
                                    on_click: () => handleLanguageChange('es')
                                },
                                {
                                    attr: 'en',
                                    label: 'English',
                                    on_click: () => handleLanguageChange('en')
                                }
                            ]}
                        />
                    </div>
                </div>
                <div className="usa-navbar">
                    <Title id="extended-logo">
                        <h1 id='federalTaxCalculator' title="Home" aria-label="Home">
                            {t('federalTaxCalculator')}
                        </h1>
                    </Title>
                </div>
                {currentPage < 1 ? "" : (
                    <div
                        className="usa-step-indicator usa-step-indicator--counters-sm"
                        aria-label="progress"
                    >
                        {/* Step indicator */}
                        <ol className="usa-step-indicator__segments">
                            
                            {/* Personal Info */}
                            <li className={
                                currentPage === 1
                                ? "usa-step-indicator__segment usa-step-indicator__segment--current"
                                : currentPage < 1
                                ? "usa-step-indicator__segment"
                                : "usa-step-indicator__segment usa-step-indicator__segment--complete"
                            }>
                                <span className="usa-step-indicator__segment-label">
                                    {t('personalInfo')} {currentPage > 1 && <span className="usa-sr-only">completed</span>}
                                </span>
                            </li>

                            {/* W2 */}
                            <li className={
                                currentPage === 2
                                ? "usa-step-indicator__segment usa-step-indicator__segment--current"
                                : currentPage < 2
                                ? "usa-step-indicator__segment"
                                : "usa-step-indicator__segment usa-step-indicator__segment--complete"
                            }>
                                <span className="usa-step-indicator__segment-label">
                                    W2 {currentPage > 2 && <span className="usa-sr-only">completed</span>}
                                </span>
                            </li>

                            {/* 1099 */}
                            <li className={
                                currentPage === 3
                                ? "usa-step-indicator__segment usa-step-indicator__segment--current"
                                : currentPage < 3
                                ? "usa-step-indicator__segment"
                                : "usa-step-indicator__segment usa-step-indicator__segment--complete"
                            } aria-current={currentPage === 3 ? "true" : undefined}>
                                <span className="usa-step-indicator__segment-label">
                                    1099 {currentPage > 3 && <span className="usa-sr-only">completed</span>}
                                </span>
                            </li>

                            {/* Review */}
                            <li className={
                                currentPage === 4
                                ? "usa-step-indicator__segment usa-step-indicator__segment--current"
                                : currentPage < 4
                                ? "usa-step-indicator__segment"
                                : "usa-step-indicator__segment usa-step-indicator__segment--complete"
                            }>
                                <span className="usa-step-indicator__segment-label">
                                    {t('review')} {currentPage > 4 ? <span className="usa-sr-only">completed</span> : <span className="usa-sr-only">not completed</span>}
                                </span>
                            </li>

                            {/* Results*/}
                            <li className={
                                currentPage === 5
                                ? "usa-step-indicator__segment usa-step-indicator__segment--current"
                                : currentPage < 5
                                ? "usa-step-indicator__segment"
                                : "usa-step-indicator__segment usa-step-indicator__segment--complete"
                            }>
                                <span className="usa-step-indicator__segment-label">
                                    {t('results')} {currentPage > 5 ? <span className="usa-sr-only">completed</span> : <span className="usa-sr-only">not completed</span>}
                                </span>
                            </li>

                        </ol>
                    </div>
                )}
            </Banner> 
        </div>
    );
}

export default Header;