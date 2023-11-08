import React from 'react'
import { Tooltip } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';
import './detailContactUbicationStyles.css';

function DetailContactUbication({ residenceUbication, residenceTitle }) {
  let phoneNumber = `+591${78327058}`;
  const handleWppClick = () => {
    const defaultMessage = `Hola!, estoy interesado en tu anuncio *${residenceTitle}* publicado en Ez Rental`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`);
  }
  return (
    <div className="detail-contact-ubication-flex-container">
      <div className='detail-contact-ubication-container'>
        <div className='detail-contact-container'>
          <h3>Contáctame previa tu llegada! </h3>
          <Tooltip
            title={phoneNumber}
          >
            <WhatsAppOutlined
              className="wpp-icon"
              onClick={handleWppClick}
            />
          </Tooltip>
        </div>
        <div>
          <p>{`Dirección: ${residenceUbication}`} </p>
        </div>
      </div>
    </div>
  )
}

export default DetailContactUbication