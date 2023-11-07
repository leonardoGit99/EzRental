import React, { useEffect, useState } from 'react';
import { Modal, Form, DatePicker, Select, Button, Divider, message } from 'antd';
import dayjs from 'dayjs';
import ModalQRCode from '../ModalQRCode/ModalQRCode';
import './reserveModalStyles.css';

function ReserveModal({ reservationModal, closeReservationModal, numberMaxOfGuests, initialDate, finalDate, daysMin, daysMax, isRefresh, setRefresh, priceResidence }) {
  const { RangePicker } = DatePicker;
  const [isVisibleQRCode, setIsVisibleQRCode] = useState(false);
  const [paymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const setPaymentConfirmed = (status) => {
    setIsPaymentConfirmed(status);
  }
  console.log(paymentConfirmed);
  const [bodyReserve, setBodyReserve] = useState({
    huesMaxResid: 0,
    fechaIniEst: null,
    fechaFinEst: null
  });

  const openModalQR = () => {
    setIsVisibleQRCode(true);
  }

  const closeModalQR = () => {
    setIsVisibleQRCode(false);
  }

  const handleRangeDateChange = (dates) => {
    setBodyReserve((prevBodyReserve) => {
      const updatedBodyReserve = {
        ...prevBodyReserve,
        fechaIniEst: dayjs(dates[0], 'YYYY-MM-DD'),
        fechaFinEst: dayjs(dates[1], 'YYYY-MM-DD')
      }
      return updatedBodyReserve;
    })
    setSelectedStartDate(dates[0]);
    setSelectedEndDate(dates[1]);
  };


  const isDateDisabled = (current) => {
    const startDate = dayjs(initialDate);
    const endDate = dayjs(finalDate).add(1, 'day');
    const actualDate = dayjs();
    if (selectedStartDate) {
      const maxEndDate = dayjs(selectedStartDate).add(daysMax, 'day');
      if (maxEndDate <= endDate) {
        return current.isBefore(selectedStartDate) || current.isAfter(maxEndDate);
      } else {
        return current.isBefore(selectedStartDate) || current.isAfter(endDate);
      }
    }

    if (startDate && endDate) {
      if (startDate <= actualDate) {
        return current.isBefore(actualDate, 'day') || current.isAfter(endDate);
      } else {
        return current.isBefore(startDate) || current.isAfter(endDate);/* current.isAfter(endDate.subtract(complement, 'day')); */
      }
    }

    return false;
  }

  const handleSelectChange = (value, name) => {
    if (name === "huesMaxResid") {
      bodyReserve["huesMaxResid"] = value
    }
    console.log(bodyReserve);
  }

  const onFinish = async () => {
    console.log(bodyReserve);
    openModalQR();
  }

  return (
    <Modal
      className="reserve-modal"
      open={reservationModal}
      onCancel={() => closeReservationModal()}
      destroyOnClose="true"
      title={
        <>
          <h3>Realize su reserva del lugar</h3><Divider />
        </>
      }
      footer={null}
    >
      <Form
        name="reserve-form"
        onFinish={onFinish}
      >
        <h4>Llegada / Salida </h4>
        <Form.Item
          name="fechasLlegadaSalida"
          rules={[{ required: true, message: 'Por favor, seleccione las fechas de llegada y salida' }]}
        >
          <RangePicker
            className="range-picker-reserve"
            placeholder={['Fecha Llegada', 'Fecha Salida']}
            onChange={handleRangeDateChange}
            disabledDate={isDateDisabled}
            onCalendarChange={(val) => { setSelectedStartDate(val[0]); setSelectedEndDate(val[1]) }}
            onOpenChange={(open) => { if (open) { setSelectedStartDate(null); setSelectedEndDate(null) } }}
            changeOnBlur
          />
        </Form.Item>

        <h4>Huéspedes</h4>
        <Form.Item
          name="huesMaxResid"
          rules={[{ required: true, message: 'Por favor, seleccione la cantidad de huéspedes' }]}
        >
          <Select
            className="select-number-max-guests-reserve"
            placeholder="Seleccione la cantidad de huéspedes"
            options={Array.from({ length: numberMaxOfGuests }, (_, i) => ({
              label: `${i + 1} ${i + 1 > 1 ? 'Huéspedes' : 'Huésped'}`,
              value: i + 1
            }))
            }
            onChange={(value) => handleSelectChange(value, "huesMaxResid")}
          />
        </Form.Item>

        <Form.Item>
          <div className="btns-reserve-form-flex-container">
            <div>
              <Button type="primary" htmlType="submit" style={{ margin: '0' }}>
                Pagar
              </Button>
            </div>
            <div>
              <Button style={{ margin: '0' }} htmlType="button" onClick={closeReservationModal}>
                Cancelar
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>

      <ModalQRCode
        isVisibleQRCode={isVisibleQRCode}
        setIsVisibleQRCode={setIsVisibleQRCode}
        closeModalQR={closeModalQR}
        paymentConfirmed={paymentConfirmed}
        setPaymentConfirmed={setPaymentConfirmed}
        bodyReserve={bodyReserve}
        closeReservationModal={closeReservationModal}
        priceResidence={priceResidence}
        selectedStartDate={dayjs(selectedStartDate).subtract(1, 'day')}//Quito un dia por que no toma el cuenta el dia inicio, toma el siguiente
        selectedEndDate={dayjs(selectedEndDate)}
      />
    </Modal>
  )
}

export default ReserveModal;