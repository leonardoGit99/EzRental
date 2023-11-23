import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailTitle from '../components/DetailTitle/DetailTitle';
import DetailImgs from '../components/DetailImgs/DetailImgs';
import DetailDescription from '../components/DetailDescription/DetailDescription';
import DetailOffers from '../components/DetailOffers/DetailOffers';
import DetailCheckInOut from '../components/DetailCheckInOut/DetailCheckInOut';
import { getImagesByResidence, getOneResidence, getServicesByResidence } from '../services/residences';
import DetailsForGuestOnly from '../components/DetailsForGuestOnly/DetailsForGuestOnly';
import AddReview from '../components/AddReview/AddReview';
import ReviewsList from '../components/ReviewsList/ReviewsList';
import { getAllReviewsByResidence } from '../services/reviews';
import { getRentalsByResidence } from '../services/rentals';


function MoreInfoAds() {
  let { idAd } = useParams();
  const [detailAdd, setDetailAdd] = useState([]);
  const [detailServices, setDetailServices] = useState({});
  const [imgsResidence, setImgsResidence] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const [reviewsResidence, setReviewsResidence] = useState([]);
  const [rentals, setRentals] = useState([]);
  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  useEffect(() => {
    if (isRefresh) {
      getOneResidence(idAd).then((data) => setDetailAdd(data));
      setRefresh(false);
    }
  }, [setRefresh, isRefresh]);

  useEffect(() => {
    if (isRefresh) {
      getServicesByResidence(idAd).then((data) => setDetailServices(data))
      setRefresh(false);
    }
  }, [setRefresh, isRefresh]);

  useEffect(() => {
    if (isRefresh) {
      getImagesByResidence(idAd).then((data) => setImgsResidence(data))
      setRefresh(false);
    }
  }, [setRefresh, isRefresh]);

  useEffect(() => {
    if (isRefresh) {
      getAllReviewsByResidence(idAd).then((data) => setReviewsResidence(data));
      setRefresh(false);
    }
  }, [isRefresh])

  useEffect(() => {
    if (isRefresh) {
      getRentalsByResidence(idAd).then((data) => {
        setRentals(data);
      })
    }
  }, [isRefresh])
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '1100px', maxWidth: '1100px' }}>
        <DetailTitle
          title={detailAdd.titulo_residencia}
          city={detailAdd.ciudad_residencia}
          country={detailAdd.pais_residencia}
        >
          <DetailsForGuestOnly
            numberMaxOfGuests={detailAdd.huesped_max_residencia}
            initialDate={detailAdd.fecha_inicio_estado ? detailAdd.fecha_inicio_estado.split('T')[0].toString() : null}
            finalDate={detailAdd.fecha_fin_estado ? detailAdd.fecha_fin_estado.split('T')[0].toString() : null}
            daysMax={detailAdd.dias_max_residencia - 1}
            isRefresh={isRefresh}
            setRefresh={setRefresh}
            priceResidence={detailAdd.precio_residencia}
            idAd={idAd}
            rentals={rentals}
          />

        </DetailTitle>

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
          residenceTitle={detailAdd.titulo_residencia}
          residenceAddress={detailAdd.direccion_residencia}
          residenceUbication={detailAdd.ubicacion_residencia}
          wppNumber={detailAdd.telefono_usuario}
          daysMax={detailAdd.dias_max_residencia}
          hostName={detailAdd.nombre_usuario}
          hostPhoto={detailAdd.foto_usuario}
        />

        <DetailOffers
          services={detailServices}
        />

        <DetailCheckInOut
          checkIn={detailAdd.check_in_residencia}
          checkOut={detailAdd.check_out_residencia}
        />

        <AddReview
          idAd={idAd}
          isRefresh={isRefresh}
          setRefresh={setRefresh}
          rentals={rentals}
        />

        <ReviewsList
          detailReviews={reviewsResidence}
          averageRates={detailAdd.promedio}
        />
      </div>
    </div>
  )
}

export default MoreInfoAds;