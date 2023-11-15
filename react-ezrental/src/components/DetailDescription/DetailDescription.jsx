import React from 'react';
import { Avatar, Divider, Tooltip, message } from 'antd';
import homePageEnDesarrollo from '../../assets/homePageEnDesarrollo.jpg';
import { WhatsAppOutlined } from '@ant-design/icons';
import './detailDescriptionStyles.css';
import DetailContactUbication from '../DetailContactUbication/DetailContactUbication';

function DetailDescription({ residenceType, spaceType, description, numberOfGuests, numberOfRooms, numberOfBeds, numberOfBathrooms, residenceTitle, residenceAddress, residenceUbication, wppNumber, daysMax }) {

  return (
    <div>
      <Divider />
      <div className="detail-description-flex-container">
        <div className="description-sumary-complete">
          <div className="detail-description-summary">
            <div>
              <p>Lugar para quedarse en {residenceType} · {spaceType}  - Anfitrión: ... </p>
              <p>
                Máx. {numberOfGuests > 1 ? `${numberOfGuests} Huéspedes` : `${numberOfGuests} Huésped`} · {daysMax > 1 ? `${daysMax} Noches` : `${daysMax} Noche`} · {numberOfRooms > 1 ? `${numberOfRooms} Habitaciones` : `${numberOfRooms} Habitación`} · {numberOfBeds > 1 ? `${numberOfBeds} Camas` : `${numberOfBeds} Cama`} · {numberOfBathrooms > 1 ? `${numberOfBathrooms} Baños` : `${numberOfBathrooms} Baño`}
              </p>
            </div>
            <Avatar src={homePageEnDesarrollo} size={80} />
          </div>

          <div className="detail-description">
            <h3>Descripción</h3>
            <p>{description}</p>
          </div>
        </div>
        <DetailContactUbication
          residenceAddress={residenceAddress}
          residenceUbication={residenceUbication}
          wppNumber={wppNumber}
          residenceTitle={residenceTitle}
        />
      </div>
    </div>

  )
}

export default DetailDescription