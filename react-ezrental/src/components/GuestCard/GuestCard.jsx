import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tooltip } from 'antd';
import './guestCardStyles.css';

function GuestCard({ idResidencia, imagen, titulo, ciudad, pais, fechaIni, fechaFin, precio, setRefresh }) {
  const { Meta } = Card;

  return (
    <>
      <Link to={`/${idResidencia}`}>
        <Tooltip title={/* description */ `Clic para ver más detalles`} placement="right">
        <Card
          className="guest-card"
          hoverable
          cover={
              <img
                className="img-guest-card-carousel"
                src={/* imagen === "Sin imagen" ? defaultLogo : */imagen}
                alt="Algo salió mal..."
              />
              //  <ImgCarouselCard imagen={imagen}/> 
          }
        >
          <Meta
            title={`${ciudad}, ${pais}`}
            description={
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {titulo} <br /> {fechaIni} / {fechaFin} <br /> <span style={{fontWeight:'700'}}>Bs. {precio}</span>  noche
              </div>
            }
            />
        </Card>
            </Tooltip>
      </Link>
    </>
  );
};

export default GuestCard;