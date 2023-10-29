import React from 'react';
import logoLizardTech from '../../assets/logoLizardTech.png';
import EzRentalLogo from '../../assets/EzRental Transparente.png'
import './logoStyles.css';

function Logo() {
    return (
        <div className='logo-container'>
            <a href='/home'>
                <img src={EzRentalLogo} alt="logo lizardtech S.R.L" className='logo__img' />
            </a>
            {/* <p className='title-logo'>EZ RENTAL</p> */}
        </div>
    );
};


export default Logo;