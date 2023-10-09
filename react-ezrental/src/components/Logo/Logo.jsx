import React from 'react';
import logoLizardTech from '../../assets/logoLizardTech.png';
import './logoStyles.css';

function Logo() {
    return (
        <div className='logo-container'>
            <a href='/homeHost'>
                <img src={logoLizardTech} alt="logo lizardtech S.R.L" className='logo__img' />
            </a>
            <p className='title-logo'>EZ RENTAL</p>
        </div>
    );
};


export default Logo;