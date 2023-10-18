import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditing } from '../../store/slices/editSlice';
import { useNavigate } from 'react-router-dom';
import './editCardModalStyles.css';

function EditCardModal({ visible, onClose, idResidencia, titulo, description, setRefresh, closeEditModal }) {
  const isEdit = useSelector((state) => state.edit); // Acceder al estado global
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOk = () => {
    dispatch(setIsEditing(true)); // Cambiar el estado global
    navigate(`/editar-anuncio/${idResidencia}`);
  }

  return (
    <>
      <Modal
        className="edit-modal"
        title={
          <>
            <WarningTwoTone twoToneColor="#FFA709" style={{ fontSize: '1.3em' }} /> <b>Editar anuncio</b>
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
        <p>¿Está seguro que desea editar <b>{titulo}</b>?</p>
      </Modal>
    </>
  )
}

export default EditCardModal