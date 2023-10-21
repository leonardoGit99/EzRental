import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditingRentalForm } from '../../store/slices/editRentalFormSlice';
import { useNavigate } from 'react-router-dom';
import './editCardModalStyles.css';

function EditCardModal({ visible, onClose, idResidencia, titulo, setRefresh, closeEditModal }) {
  const isEdit = useSelector((state) => state.editRentalForm); // Acceder al estado global
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOk = () => {
    dispatch(setIsEditingRentalForm(true)); // Cambiar el estado global de editRentalFormSlice
    navigate(`/editar-anuncio/${idResidencia}`);
  }

  return (
    <>
      <Modal
        className="edit-modal"
        title={
          <>
            <ExclamationCircleTwoTone twoToneColor="#FFA709" style={{ fontSize: '1.1em' }} /> <b>Editar anuncio</b>
          </>
        }
        open={visible}
        onCancel={onClose}
        footer={[
          <Button id="boton" form="editForm" key="edit" type="primary" onClick={handleOk}>
            Ok
          </Button>,
          <Button key="cancel" onClick={onClose}>
            Cancelar
          </Button>
        ]}
        destroyOnClose="true"
      >
        <p>¿Está seguro que desea editar <span className='modal-delete-title'>"{titulo}"</span>?</p>
      </Modal>
    </>
  )
}

export default EditCardModal