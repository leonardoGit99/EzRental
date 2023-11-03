import React from 'react';
import './modalQRCodeStyles.css';
import { Divider, Modal, QRCode } from 'antd';

function ModalQRCode({ isVisibleQRCode, setIsVisibleQRCode, closeModalQR }) {
  return (
    <Modal
      className="qr-code-modal"
      open={isVisibleQRCode}
      onCancel={closeModalQR}
      destroyOnClose="true"
      title={
        <>
          <h3>Por favor, escanee el siguiente código QR</h3>
        </>
      }
      footer={null}
    >
      <Divider />
      <div className="qr-code">
        <QRCode 
          errorLevel="H"
          type="svg" 
          value="https://www.google.com/"
          size="55%"
          bordered="true"
          />
      </div>
      <Divider style={{marginBottom:0}}/>
    </Modal>
  )
}

export default ModalQRCode;