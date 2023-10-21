import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CheckCircleTwoTone, CloseCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons';
import DeleteCardModal from '../DeleteCardModal/DeleteCardModal';
import EditCardModal from '../EditCardModal/EditCardModal';
import './hostCardStyles.css';

function HostCard({ idResidencia, imagen, titulo, ciudad, pais, fechaIni, fechaFin, precio, estadoPublicado, estadoPausado, estadoInactivo, isRefresh, setRefresh }) {
  const [deteleModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { Meta } = Card;
  // console.log(isRefresh);
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const openEditModal = () => {
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };


  return (
    <>
      <Card
        className='host-card'
        hoverable
        cover={
          <img
            className='img-host-card'
            alt="Algo salio mal..."
            src={/* imagen === "Sin imagen" ? defaultLogo : */ imagen}
          />
        }
        actions={[
          <>
            <Tooltip title="Clic para modificar" placement='bottom'>
              <Button name='modalEditar' type='default' size='small' onClick={openEditModal}><EditOutlined /></Button>
            </Tooltip>
            <EditCardModal
              visible={editModal}
              onClose={closeEditModal}
              idResidencia={idResidencia}
              titulo={titulo}
              setRefresh={setRefresh}
              closeEditModal={closeEditModal}
            />
          </>,
          <>
            <Tooltip title="Clic para eliminar" placement='bottom'>
              <Button name="modalBorrar" danger size='small' onClick={openDeleteModal} ><DeleteOutlined /></Button>
            </Tooltip>
            <DeleteCardModal
              visible={deteleModal}
              onClose={closeDeleteModal}
              idResidencia={idResidencia}
              titulo={titulo}
              isRefresh={isRefresh}
              setRefresh={setRefresh}
              cerrarModal={closeDeleteModal}
            />
          </>
        ]}

      >
        <Link to={`/mis-anuncios/${idResidencia}`}>
          <Tooltip title={/* descripcion */`Clic para más detalles`} placement="right">
            <Meta
              title={`${ciudad}, ${pais}`}
              description={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {titulo} <br /> {fechaIni} / {fechaFin} <br /> Bs. {precio} <br />
                  {estadoPublicado === 'true' ? <span style={{ fontWeight: '700' }}><CheckCircleTwoTone twoToneColor="#2AD06D" /> Publicado</span> : ''}
                  {estadoPausado === 'true' ? <span style={{ fontWeight: '700' }}><PauseCircleTwoTone twoToneColor="#F28808" /> Pausado</span> : ''}
                  {estadoInactivo === 'true' ? <span style={{ fontWeight: '700' }}><CloseCircleTwoTone twoToneColor="#FF4040" /> Inactivo</span> : ''}
                </div>
              }
            />
          </Tooltip>
        </Link>
      </Card>
    </>
  );
};

export default HostCard;
