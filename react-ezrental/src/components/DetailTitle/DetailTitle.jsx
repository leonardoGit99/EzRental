import React from 'react';
import { Divider } from 'antd';
import DetailsForHostOnly from '../DetailsForHostOnly/DetailsForHostOnly';
import './detailTitleStyles.css';

function DetailTitle({ children, title, city, country }) {
  return (
    <div className="title-city-country-container">
      <div className="flex-container">
        <div>
          <h2>{title}</h2>
          <p> {city}, {country}</p>
        </div>
        <div>
          {children}
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default DetailTitle