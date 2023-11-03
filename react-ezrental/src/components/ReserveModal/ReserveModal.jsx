import React, { useState } from 'react';
import { Modal, Form, DatePicker, Select, Button, Divider, message } from 'antd';
import dayjs from 'dayjs';
import ModalQRCode from '../ModalQRCode/ModalQRCode';
import './reserveModalStyles.css';

function ReserveModal({ reservationModal, closeReservationModal, numberMaxOfGuests, initialDate, finalDate, daysMin, daysMax }) {
  const { RangePicker } = DatePicker;
  const [isVisibleQRCode, setIsVisibleQRCode] = useState(false);
  const [bodyReserve, setBodyReserve] = useState({
    huesMaxResid: 0,
    fechaIniEst: null,
    fechaFinEst: null
  });
  console.log(initialDate, finalDate, daysMin, daysMax);
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
  };
  console.log(bodyReserve);

  const isDateDisabled = (current) => {
    const startDate = dayjs(initialDate);
    const endDate = dayjs(finalDate);
    if (startDate && endDate) {
      const daysDiff = endDate.diff(startDate, 'day');
      const complement = daysDiff - daysMax;
      console.log(complement);
      return current.isBefore(startDate) || current.isAfter(endDate.subtract(complement, 'day'));
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
    openModalQR();
    if (isPaymentSuccesful) {
      // await Peticion Put
      closeModalQR();
      closeReservationModal();
    }
  }

  return (
    <Modal
      className="reserve-modal"
      open={reservationModal}
      onCancel={() => closeReservationModal()}
      destroyOnClose="true"
      title={
        <>
          <h3>Realize su reserva inmediata mediante pago QR!</h3><Divider />
        </>
      }
      footer={null}
    >
      <Form
        name="reserve-form"
        onFinish={onFinish}
      >
        <h4>Llegada / Salida</h4>
        <Form.Item>
          <RangePicker
            className="range-picker-reserve"
            placeholder={['Fecha Llegada', 'Fecha Salida']}
            onChange={handleRangeDateChange}
            disabledDate={isDateDisabled}
          />
        </Form.Item>

        <h4>Huéspedes</h4>
        <Form.Item
          name="huesMaxResid"
          rules={[{ required: true, message: 'Por favor, selecciona la cantidad de huéspedes' }]}
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
                Generar QR
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
        setIsVisibleQRCode={isVisibleQRCode}
        closeModalQR={closeModalQR}
      />
    </Modal>
  )
}

export default ReserveModal;