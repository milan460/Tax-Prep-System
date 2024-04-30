// import React, { useState } from 'react';
import './footerReal.css';
import { Address, Footer, Logo } from '@trussworks/react-uswds';
import { useTranslation } from 'react-i18next';

const FooterReal = () => {
  const { t } = useTranslation();

  return (
    <Footer size="slim" primary={<div className="usa-footer__primary-container grid-row">
      <div className="tablet:grid-col-4">
        <Address size="slim" items={[<a key="telephone" href="tel:1-800-555-5555">
            (800) CALL-GOVT
          </a>, 
          <a key="email" href="mailto:info@IRS.gov">
            info@IRS.gov
          </a>]} />
      </div>
      </div>} secondary={<Logo size="slim" image={<img src="https://www.irs.gov/pub/xml_bc/53478002.gif" className="usa-footer__logo-img" alt="img alt text"  />} heading={<p className="usa-footer__logo-heading">{t('bannerLabel')}</p>} />} />
  )
}

export default FooterReal;

