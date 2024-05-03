import React, { useState } from 'react';
import './header.css';
import buildingIcon from '/building-icon.svg';
import flagIcon from '/flag-icon.webp';
import lockIcon from '/lock-icon.svg';
import { Banner, BannerButton, BannerContent, BannerFlag, BannerGuidance, BannerHeader, BannerIcon, Button, GridContainer, Icon, LanguageSelector, MediaBlockBody} from '@trussworks/react-uswds';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const [currentPage, setcurrentPage] = useState(1);

    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <>
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
                          {t('actionText')}
                             <p>
                                 <strong>{t('officialWebsitesUseGov')}</strong>
                                 <br />{t('govWebsiteOwnership')}
                             </p>
                         </MediaBlockBody>
                     </BannerGuidance>
                     <BannerGuidance className="tablet:grid-col-6">
                         <BannerIcon src={lockIcon} alt="" />
                         <MediaBlockBody>
                         <p>
                             <strong>{t('secureGovWebsitesUseHttps')}</strong>
                             <br />{t('lockDescription')}
                         </p>
                         </MediaBlockBody>
                     </BannerGuidance>
                     </div>
                </BannerContent>
                <div id='containerToCenterLanguageSelectorAndLogoutButtonContainer'>
                    <div id='languageSelectorAndLogoutButtonContainer'>
                        <Button id='logoutButton' type={'button'} children={undefined}>Logout</Button>
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
                
                <h3 class="site-preview-heading">Small counters</h3>
                <div
                class="usa-step-indicator usa-step-indicator--counters-sm"
                aria-label="progress"
                >
                <ol class="usa-step-indicator__segments">
                    {/* Personal Information */}
            <li className={
                currentPage === 1
                ? "usa-step-indicator__segment usa-step-indicator__segment--current"
                : currentPage < 1
                ? "usa-step-indicator__segment"
                : "usa-step-indicator__segment usa-step-indicator__segment--complete"
            }>
                <span className="usa-step-indicator__segment-label">
                    Personal information {currentPage > 1 && <span className="usa-sr-only">completed</span>}
                </span>
            </li>

            {/* Household Status */}
            <li className={
                currentPage === 2
                ? "usa-step-indicator__segment usa-step-indicator__segment--current"
                : currentPage < 2
                ? "usa-step-indicator__segment"
                : "usa-step-indicator__segment usa-step-indicator__segment--complete"
            }>
                <span className="usa-step-indicator__segment-label">
                    Household status {currentPage > 2 && <span className="usa-sr-only">completed</span>}
                </span>
            </li>

            {/* Supporting Documents */}
            <li className={
                currentPage === 3
                ? "usa-step-indicator__segment usa-step-indicator__segment--current"
                : currentPage < 3
                ? "usa-step-indicator__segment"
                : "usa-step-indicator__segment usa-step-indicator__segment--complete"
            } aria-current={currentPage === 3 ? "true" : undefined}>
                <span className="usa-step-indicator__segment-label">
                    Supporting documents {currentPage > 3 && <span className="usa-sr-only">completed</span>}
                </span>
            </li>

            {/* Signature */}
            <li className={
                currentPage === 4
                ? "usa-step-indicator__segment usa-step-indicator__segment--current"
                : currentPage < 4
                ? "usa-step-indicator__segment"
                : "usa-step-indicator__segment usa-step-indicator__segment--complete"
            }>
                <span className="usa-step-indicator__segment-label">
                    Signature {currentPage > 4 ? <span className="usa-sr-only">completed</span> : <span className="usa-sr-only">not completed</span>}
                </span>
            </li>

            {/* Review and Submit */}
            <li className={
                currentPage === 5
                ? "usa-step-indicator__segment usa-step-indicator__segment--current"
                : currentPage < 5
                ? "usa-step-indicator__segment"
                : "usa-step-indicator__segment usa-step-indicator__segment--complete"
            }>
                <span className="usa-step-indicator__segment-label">
                    Review and submit {currentPage > 5 ? <span className="usa-sr-only">completed</span> : <span className="usa-sr-only">not completed</span>}
                </span>
            </li>
                </ol>
                </div>
            </Banner> 
        </>
    );
}

export default Header;










// import React, { useState } from 'react';
// import './header.css';
// import  buildingIcon  from '/building-icon.svg';
// import flagIcon from '/flag-icon.webp';
// import lockIcon from '/lock-icon.svg';
// import { Banner, BannerButton, BannerContent, BannerFlag, BannerGuidance, BannerHeader, BannerIcon, Button, Icon, MediaBlockBody } from '@trussworks/react-uswds';

// const Header: React.FC = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     return (
//         <>
//             <Banner aria-label="Official website of the state department of the IRS">
//                 <BannerHeader isOpen={isOpen} flagImg={<BannerFlag src={flagIcon} aria-hidden alt="" />} headerText="This is an official website of the state department of the IRS" headerActionText="Here's how you know">
//                     <BannerButton isOpen={isOpen} aria-controls="custom-banner" onClick={(): void => {
//                     setIsOpen(previousIsOpen => !previousIsOpen);
//                     }}>
//                     Here&apos;s how you know
//                     </BannerButton>
//                 </BannerHeader>
//                 <BannerContent id="custom-banner" isOpen={isOpen}>
//                     <div className="grid-row grid-gap-lg">
//                     <BannerGuidance className="tablet:grid-col-6">
//                         <BannerIcon src={buildingIcon} alt="" />
//                         <MediaBlockBody>
//                             <p>
//                                 <strong>Official websites use .gov</strong>
//                                 <br />A <strong>.gov</strong> website belongs to an official
//                                 government organization in the United States.
//                             </p>
//                         </MediaBlockBody>
//                     </BannerGuidance>
//                     <BannerGuidance className="tablet:grid-col-6">
//                         <BannerIcon src={lockIcon} alt="" />
//                         <MediaBlockBody>
//                         <p>
//                             <strong>Secure .gov websites use HTTPS</strong>
//                             <br />A{' '}
//                             <strong>
//                             lock (<Icon.Lock aria-label="Locked padlock icon" />)
//                             </strong>{' '}
//                             or <strong>https://</strong> means you&apos;ve safely connected
//                             to the .gov website. Share sensitive information only on
//                             official, secure websites.
//                         </p>
//                         </MediaBlockBody>
//                     </BannerGuidance>
//                     </div>
//                 </BannerContent>
//                 <Button type='button' base>Select Language</Button>
//             </Banner> 
//         </>
//     );
// }

// export default Header;

