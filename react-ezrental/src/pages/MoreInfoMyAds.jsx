import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailTitle from '../components/DetailTitle/DetailTitle';
import DetailImgs from '../components/DetailImgs/DetailImgs';
import DetailDescription from '../components/DetailDescription/DetailDescription';
import DetailOffers from '../components/DetailOffers/DetailOffers';
import DetailCheckInOut from '../components/DetailCheckInOut/DetailCheckInOut';
import DetailsForHostOnly from '../components/DetailsForHostOnly/DetailsForHostOnly';
import { getOneResidence, getServicesByResidence } from '../services/residences';

function MoreInfoMyAds() {
  let { id } = useParams();
  const [detailAdd, setDetailAdd] = useState([]);
  const [detailServices, setDetailServices] = useState({});
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  }

/*   async function fetchResidenceByIdAndUser() {
    //`http://localhost:4000/resid/${id}`
    //`${process.env.REACT_APP_SERVERURL}/resid/${id}`
    const response = await fetch(`http://localhost:4000/resid/${id}`);
    const jsonData = await response.json();
    setDetailAdd(jsonData);
  } */

  useEffect(() => {
    if (isRefresh) {
      getOneResidence(id).then((data) => setDetailAdd(data));
      setRefresh(false);
    }
  }, [setRefresh, isRefresh]);

/*   async function fetchServicesByIdAndUser() {
    //`http://localhost:4000/resid/${id}`
    //`${process.env.REACT_APP_SERVERURL}/resid/${id}`
    const response = await fetch(`http://localhost:4000/serv/${id}`);
    const jsonData = await response.json();
    setDetailServices(jsonData);
  } */

  useEffect(() => {
    if (isRefresh) {
      getServicesByResidence(id).then((data)=>setDetailServices(data));
      setRefresh(false);
    }
  }, [setRefresh, isRefresh]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '1200px' }}>
        {/* Mas info de card guest {id} */}
        <DetailTitle
          title={detailAdd.titulo_residencia}
          city={detailAdd.ciudad_residencia}
          country={detailAdd.pais_residencia}
        >
          <DetailsForHostOnly
            estadoPublicado={detailAdd.estado_publicado}
            estadoPausado={detailAdd.estado_pausado}
            estadoInactivo={detailAdd.estado_inactivo}
            direccionResidencia={detailAdd.direccion_residencia}
            precioResidencia={detailAdd.precio_residencia}
            fechaIni={detailAdd.fecha_inicio_estado ? detailAdd.fecha_inicio_estado.split('T')[0].toString() : 'Fecha inicio'}
            fechaFin={detailAdd.fecha_fin_estado ? detailAdd.fecha_fin_estado.split('T')[0].toString() : 'Fecha fin'}
          />
        </DetailTitle>
        <DetailImgs
          images={detailAdd.images}
          setRefresh={setRefresh}
        />
        <DetailDescription
          residenceType={detailAdd.tipo_residencia}
          spaceType={detailAdd.tipo_alojamiento}
          description={detailAdd.descripcion_residencia}
          numberOfGuests={detailAdd.huesped_max_residencia}
          numberOfRooms={detailAdd.habitacion_residencia}
          numberOfBeds={detailAdd.cama_residencia}
          numberOfBathrooms={detailAdd.banio_residencia}
        />
        <DetailOffers
          services={detailServices}
        />
        <DetailCheckInOut
          checkIn={detailAdd.check_in_residencia}
          checkOut={detailAdd.check_out_residencia}
        />
      </div>
    </div>
  )
}

export default MoreInfoMyAds;