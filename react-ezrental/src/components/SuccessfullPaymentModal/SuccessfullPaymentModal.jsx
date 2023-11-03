import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import './successfullPaymentModalStyles.css'

function SuccessfullPaymentModal() {
  const [succesfullPaymentModal, setSuccesfullPaymentModal] = useState(false);
  const [token, setToken] = useState(0);
  const [succesfullPayment, setSuccesfullPayment] = useState(false);
  const openSuccessfullPaymentModal = () => {
    setSuccesfullPaymentModal(true);
  };

  const closePrivateInfoModal = () => {
    setSuccesfullPaymentModal(false);
  };


  const generateToken = Math.floor(Math.random() * 10) + 1;
  useEffect(()=>{
    if (generateToken>=1 && generateToken <=5){
      setSuccesfullPayment(true);
      openSuccessfullPaymentModal();
    }else if (generateToken>=6 && generateToken <= 10){
      setSuccesfullPayment(false);
      openSuccessfullPaymentModal();
    }
  },[]);

  return (
    <>
        <Modal
          width={"50%"}
          title={"Confirmación de pago"}
          open={succesfullPaymentModal}
          onCancel={closePrivateInfoModal}
          footer={null}
          destroyOnClose="true"
        >
          <div style={{fontSize:'28px', textAlign:'center'}}>
            {
              succesfullPayment === true ? (
                <>
                  <CheckCircleTwoTone twoToneColor="#2AD06D"/>    Pago realizado exitosamente!
                </>
              ): 
              <>
                 <CloseCircleTwoTone twoToneColor="#FF4040" />    Algo salió mal, vuelve a intentarlo más tarde!
              </>
            }
          </div>
        </Modal>
    </>
  )
}

export default SuccessfullPaymentModal