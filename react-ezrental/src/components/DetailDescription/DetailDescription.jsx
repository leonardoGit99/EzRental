import React from 'react';
import { Avatar, Divider } from 'antd';
import homePageEnDesarrollo from '../../assets/homePageEnDesarrollo.jpg';
import './detailDescriptionStyles.css';

function DetailDescription({residenceType, spaceType, description, numberOfGuests, numberOfRooms, numberOfBeds, numberOfBathrooms }) {
  return (
    <div>
      <Divider />
      <div className="detail-description-summary">
        <div>
          <p>Lugar para quedarse en {residenceType} · {spaceType}  - Anfitrión: ... </p>
          <p>
            Máx. {numberOfGuests>1? `${numberOfGuests} Huéspedes`:`${numberOfGuests} Huésped`} · {numberOfRooms>1? `${numberOfRooms} Habitaciones`:`${numberOfRooms} Habitación`} · {numberOfBeds>1? `${numberOfBeds} Camas`:`${numberOfBeds} Cama`} · {numberOfBathrooms>1? `${numberOfBathrooms} Baños`:`${numberOfBathrooms} Baño`}
          </p>
        </div>
        <Avatar src={homePageEnDesarrollo} size={89} />
      </div>

      <div className="detail-description">
        <h3>Descripción</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default DetailDescription