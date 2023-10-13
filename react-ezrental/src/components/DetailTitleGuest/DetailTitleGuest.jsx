import { Divider } from 'antd';
import React from 'react';
import './detailTitleGuestStyles.css';

function DetailTitleGuest({title, city, country}) {
  return (
    <div className="title-city-country-container">
      <h2>{title}</h2>
      <p> {city}, {country}</p>
      <Divider />
    </div>
  )
}

export default DetailTitleGuest