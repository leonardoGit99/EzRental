import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tooltip } from 'antd';
import ImgCarouselCard from '../ImgCarouselCard/ImgCarouselCard';
import './guestCardStyles.css';

function GuestCard({ idResidencia, imagen, titulo, ciudad, pais, fechaIni, fechaFin, precio, setRefresh }) {
  const { Meta } = Card;

  return (
    <>
      <Link to={`/${idResidencia}`}>
        <Card
          className="guest-card"
          hoverable
          cover={
            <Tooltip title={/* description */ `Clic para ver más detalles`} placement="right">
              <img
                className="img-guest-card-carousel"
                src={/* imagen === "Sin imagen" ? defaultLogo : */imagen}
                alt="Algo salió mal..."
              />
              {/* <ImgCarouselCard imagen={imagen}/> */}
            </Tooltip>
          }
        >
          <Meta
            title={`${ciudad}, ${pais}`}
            description={
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {titulo} <br /> {fechaIni} / {fechaFin} <br /> Bs. {precio}
              </div>
            }
          />
        </Card>
      </Link>
    </>
  );
};

export default GuestCard;