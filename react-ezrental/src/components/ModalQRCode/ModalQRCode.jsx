import React from 'react';
import { Button, Divider, Modal, QRCode, message } from 'antd';
import { createResidence } from '../../services/residences';
import { createRental } from '../../services/rentals';
import { useAuth } from "../../contexts/authContext";
import './modalQRCodeStyles.css';

function ModalQRCode({ isVisibleQRCode, setIsVisibleQRCode, closeModalQR, bodyReserve, setBodyReserve, closeReservationModal, priceResidence, selectedStartDate, selectedEndDate, idAd, isRefresh, setRefresh }) {
  const { user } = useAuth(); 
  const daysDiff = selectedEndDate.diff(selectedStartDate, 'day');
  const totalPrice = priceResidence * daysDiff;
  bodyReserve["precio"] = totalPrice;
  
  const onFinish = async () => {
    try {
      await createRental(bodyReserve, idAd, user.uid);
      setRefresh(true);
      closeReservationModal();
      closeModalQR();
      message.success("Reservación exitosa!. Disfrute de su estadia");
    } catch (error) {
      message.error("Algo salió mal. Inténtelo más tarde");
    }
  }



  return (
    <Modal
      className="qr-code-modal"
      open={isVisibleQRCode}
      onCancel={closeModalQR}
      destroyOnClose="true"
      title={
        <>
          {/* <h3>Por favor, escanee el siguiente código QR</h3> */}
          <h2>Confirmación del Pago</h2>
        </>
      }
      footer={null}
    >
      <Divider />
      {/* <div className="qr-code">
        <QRCode 
          errorLevel="H"
          type="svg" 
          value="https://www.google.com/"
          size="55%"
          bordered="true"
          />
      </div> */}
      <div className="payment-confirmation-content">
        <p style={{ fontWeight: '600' }}>Monto total </p>
        <p>{priceResidence} Bs. x {daysDiff} Noche(s) = <span style={{ fontWeight: '500' }}>{totalPrice} Bs.</span></p>
      </div>

      <div className="btns-payment-confirmation-modal">
        <div>
          <Button type='primary' htmlType='submit' style={{ margin: '0 10px' }} onClick={onFinish}>Confirmar Pago</Button>
        </div>
        <div>
          <Button htmlType='button' style={{ margin: '0 10px' }} onClick={closeModalQR}>No Confirmar Pago</Button>
        </div>
      </div>
      <Divider style={{ marginBottom: 0 }} />
    </Modal>
  )
}

export default ModalQRCode;