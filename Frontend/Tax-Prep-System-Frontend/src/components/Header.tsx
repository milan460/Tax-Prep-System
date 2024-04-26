import React, { useState } from 'react';
import './header.css';
import  buildingIcon  from '/building-icon.svg';
import flagIcon from '/flag-icon.webp';
import lockIcon from '/lock-icon.svg';
import { Banner, BannerButton, BannerContent, BannerFlag, BannerGuidance, BannerHeader, BannerIcon, Button, Icon, MediaBlockBody } from '@trussworks/react-uswds';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Banner aria-label="Official website of the state department of the IRS">
                <BannerHeader isOpen={isOpen} flagImg={<BannerFlag src={flagIcon} aria-hidden alt="" />} headerText="This is an official website of the state department of the IRS" headerActionText="Here's how you know">
                    <BannerButton isOpen={isOpen} aria-controls="custom-banner" onClick={(): void => {
                    setIsOpen(previousIsOpen => !previousIsOpen);
                    }}>
                    Here&apos;s how you know
                    </BannerButton>
                </BannerHeader>
                <BannerContent id="custom-banner" isOpen={isOpen}>
                    <div className="grid-row grid-gap-lg">
                    <BannerGuidance className="tablet:grid-col-6">
                        <BannerIcon src={buildingIcon} alt="" />
                        <MediaBlockBody>
                            <p>
                                <strong>Official websites use .gov</strong>
                                <br />A <strong>.gov</strong> website belongs to an official
                                government organization in the United States.
                            </p>
                        </MediaBlockBody>
                    </BannerGuidance>
                    <BannerGuidance className="tablet:grid-col-6">
                        <BannerIcon src={lockIcon} alt="" />
                        <MediaBlockBody>
                        <p>
                            <strong>Secure .gov websites use HTTPS</strong>
                            <br />A{' '}
                            <strong>
                            lock (<Icon.Lock aria-label="Locked padlock icon" />)
                            </strong>{' '}
                            or <strong>https://</strong> means you&apos;ve safely connected
                            to the .gov website. Share sensitive information only on
                            official, secure websites.
                        </p>
                        </MediaBlockBody>
                    </BannerGuidance>
                    </div>
                </BannerContent>
                <Button type='button' base>Select Language</Button>
            </Banner> 
        </>
    );
}

export default Header;

