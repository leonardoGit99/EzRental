import React, { useState } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import ReserveModal from '../ReserveModal/ReserveModal';
import './detailsForGuestOnlyStyles.css';

function DetailsForGuestOnly({ numberMaxOfGuests, initialDate, finalDate, daysMin, daysMax, isRefresh, setRefresh, priceResidence }) {
  const [reservationModal, setReservationModal] = useState(false);
  const openReservationModal = () => {
    setReservationModal(true);
  };

  const closeReservationModal = () => {
    setReservationModal(false);
  };



  return (
    <div>
      <Button className="button-detail-for-guest-only" type='primary' onClick={() => openReservationModal()}> <FontAwesomeIcon icon={faCalendarCheck} /> <span>{`Reserva`}</span></Button>
      <ReserveModal
        numberMaxOfGuests={numberMaxOfGuests}
        reservationModal={reservationModal}
        closeReservationModal={closeReservationModal}
        initialDate={initialDate}
        finalDate={finalDate}
        daysMin={daysMin}
        daysMax={daysMax}
        isRefresh={isRefresh}
        setRefresh={setRefresh}
        priceResidence={priceResidence}
      />
    </div>
  )
}

export default DetailsForGuestOnly;