import React, { useState } from 'react';
import { Button, Divider, Modal } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faHouseCircleCheck } from '@fortawesome/free-solid-svg-icons';

function DetailsForHostOnly({ estadoResidencia, direccionResidencia, precioResidencia, fechaIni, fechaFin }) {
  const [privateModal, setPrivateModal] = useState(false);
  const openPrivateInfoModal = () => {
    setPrivateModal(true);
  };

  const closePrivateInfoModal = () => {
    setPrivateModal(false);
  };

  return (
    <div>
      <Button type='primary' onClick={() => openPrivateInfoModal()}> <FontAwesomeIcon icon={faLock} /> <span>Ver Info Privada</span></Button>
      <Modal
        open={privateModal}
        onCancel={() => closePrivateInfoModal()}
        footer={null}
      >
        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

          <b>Dirección (Vista por el huesped cuando reserve) <br /></b> {direccionResidencia} <Divider />
          <b>Fecha Inicio</b> <br /> {fechaIni} <Divider />
          <b>Fecha Fin</b> <br /> {fechaFin}  <Divider />
          <b>Precio</b> <br /> Bs. {precioResidencia} <Divider />
          <b>Estado del anuncio</b><br />
          {estadoResidencia === "Publicado" ? <span style={{ fontWeight: '600' }}><CheckCircleTwoTone twoToneColor="#2AD06D" /> Publicado</span> : ''}
          {estadoResidencia === "Pausado" ? <span style={{ fontWeight: '600' }}><PauseCircleTwoTone twoToneColor="#F28808" /> Pausado</span> : ''}
          {estadoResidencia === "Inactivo" ? <span style={{ fontWeight: '600' }}><CloseCircleTwoTone twoToneColor="#FF4040" /> Inactivo</span> : ''}
          {estadoResidencia === "Alquilado" ? <span style={{ fontWeight: '600' }}><FontAwesomeIcon icon={faHouseCircleCheck} /> Alquilado</span> : ''} <Divider />
        </div>
      </Modal>
    </div>
  )
}

export default DetailsForHostOnly