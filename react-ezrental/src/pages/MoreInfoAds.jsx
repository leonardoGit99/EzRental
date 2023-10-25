import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailTitle from '../components/DetailTitle/DetailTitle';
import DetailImgs from '../components/DetailImgs/DetailImgs';
import DetailDescription from '../components/DetailDescription/DetailDescription';
import DetailOffers from '../components/DetailOffers/DetailOffers';
import DetailCheckInOut from '../components/DetailCheckInOut/DetailCheckInOut';
import { getImagesByResidence, getOneResidence, getServicesByResidence } from '../services/residences';

function MoreInfoAds() {
  let { id } = useParams();
  const [detailAdd, setDetailAdd] = useState([]);
  const [detailServices, setDetailServices] = useState({});
  const [imgsResidence, setImgsResidence] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  useEffect(() => {
    if (isRefresh) {
      getOneResidence(id).then((data) => setDetailAdd(data));
      setRefresh(false);
    }
  }, [setRefresh, isRefresh]);

  useEffect(() => {
    if (isRefresh) {
      getServicesByResidence(id).then((data) => setDetailServices(data))
      setRefresh(false);
    }
  }, [setRefresh, isRefresh]);

  useEffect(() => {
    if (isRefresh) {
      getImagesByResidence(id).then((data) => setImgsResidence(data))
      setRefresh(false);
    }
  }, [setRefresh, isRefresh]);


  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '1200px' }}>
        <DetailTitle
          title={detailAdd.titulo_residencia}
          city={detailAdd.ciudad_residencia}
          country={detailAdd.pais_residencia}
        />

        <DetailImgs
          images={imgsResidence}
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

export default MoreInfoAds;