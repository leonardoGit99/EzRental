import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Tooltip } from 'antd';
const { Meta } = Card;
import ImgCarouselCard from '../ImgCarouselCard/ImgCarouselCard';
import './guestCardStyles.css';

function GuestCard({ idResidencia, imagen, titulo, ciudad, pais, fechaIni, fechaFin, precio, setRefresh }) {

  return (
    <>
    <Link to={`/${idResidencia}`}>
      <Card
        className="guest-card"
        hoverable
        cover={
          <Tooltip title={/* description */ `Clic para ver más detalles`} placement="right">
            <img
              className="img-guest-card"
              src={/* imagen === "Sin imagen" ? defaultLogo : */imagen}
              alt="Algo salió mal..."
            />
            {/* <ImgCarouselCard imagen={imagen}/> */}
          </Tooltip>
        }
      >
        <Meta title={`${ciudad}, ${pais}`} description={`${titulo} ${fechaIni} - ${fechaFin} ${precio}`} />
      </Card>
    </Link>
    </>
  );
};


export default GuestCard;