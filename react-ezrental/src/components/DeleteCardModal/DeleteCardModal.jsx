import React from 'react';
import { Modal, Button, message } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import './deleteCardModalStyles.css';

function DeleteCardModal({ visible, onClose, idResidencia, titulo, setRefresh, cerrarModal }) {

  const handleOk = async () => {
    // await deleteProductDB();
    deleteResidenceDBSimulation();
    cerrarModal();
    setRefresh(true);
    message.success("La residencia '" + titulo + "' ha sido eliminado exitosamente.");
  };

  function deleteResidenceDBSimulation() {
    console.log('Simulación de peticion delete');
  }
  /* const deleteResidenceDB = async () => {
    //Ruta para server en localhost: "http://localhost:8080/store/resid"
    //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/store/resid`
    const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/resid/` + idResidencia, {
      method: "DELETE"
    });
    return res;
  } */

  return (
    <>
      <Modal
        className='delete-modal'
        title={
          <>
            <WarningTwoTone  twoToneColor="#FFA709" style={{fontSize:'1.1em'}}/> <b>Eliminar anuncio</b> 
          </>
        }
        open={visible}
        onCancel={onClose}
        footer={[
          <Button id="boton" form="editForm" key="edit" danger type="primary" onClick={handleOk}>
            Ok
          </Button>,
          <Button key="cancel" onClick={onClose}>
            Cancelar
          </Button>
        ]}
        destroyOnClose="true"
      >
        <p>¿Está seguro que desea eliminar <b>{titulo}</b>?</p>
      </Modal>
    </>
  );
};


export default DeleteCardModal;