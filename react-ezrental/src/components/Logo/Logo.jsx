import React from 'react';
import EzRentalLogo from '../../assets/EzRental Transparente v2.png';
import { Link } from 'react-router-dom';
import './logoStyles.css';

function Logo() {
  return (
    <div className='logo-container'>
      <Link to={'/'}>
        <img src={EzRentalLogo} alt="logo lizardtech S.R.L" className='logo__img' />
      </Link>

      {/* <p className='title-logo'>EZ RENTAL</p> */}
    </div>
  );
};


export default Logo;