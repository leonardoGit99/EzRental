import React, { useEffect } from 'react';
import { Modal, Button, message } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import './deleteCardModalStyles.css';
import { deleteResidence } from '../../services/residences';

function DeleteCardModal({ visible, onClose, idResidencia, titulo, isRefresh, setRefresh, cerrarModal }) {
  const handleOk = async () => {
    await deleteResidence(idResidencia);
    cerrarModal();
    setRefresh(true);
    // window.location.reload();//Otra forma de recargar la pagina
    message.success("La residencia '" + titulo + "' ha sido eliminado exitosamente.");
  };

/*   const deleteResidenceDB = async () => {
    //Ruta para server en localhost: `http://localhost:4000/resid/${idResidencia}` 
    //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/${idResidencia}`
    const res = await fetch(`http://localhost:4000/resid/${idResidencia}`, {
      method: "DELETE"
    });
    return res;
  }
 */

  return (
    <>
      <Modal
        className='delete-modal'
        title={
          <>
            <WarningTwoTone twoToneColor="#FFA709" style={{ fontSize: '1.1em' }} /> <b>Eliminar anuncio</b>
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
        <p>¿Está seguro que desea eliminar <span className="modal-delete-title">"{titulo}"</span>?</p>
      </Modal>
    </>
  );
};

export default DeleteCardModal;