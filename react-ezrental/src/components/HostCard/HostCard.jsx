import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Meta } = Card;
import './hostCardStyles.css';
import DeleteCardModal from '../DeleteCardModal/DeleteCardModal';

function HostCard({ idResidencia, imagen, titulo, ciudad, pais, fechaIni, fechaFin, precio, setRefresh }) {
  const navigate = useNavigate();
  const [modalBorrar, setBorrar] = useState(false);

  const abrirModalBorrar = () => {
    setBorrar(true);
  }

  const cerrarModalBorrar = () => {
    setBorrar(false);
  }

  const redirectToMoreInfo = () => {
    navigate('/misAnuncios/:detalleAnuncio');
  }

  return (
    <>
      <Card
        // style={{
        //   width: 210,
        //   // textAlign: 'center'
        // }}
        className='host-card'
        hoverable
        cover={
          <Tooltip title={/* descripcion */`Clic para más detalles`} placement="right">
            <img
              className='img-host-card'
              onClick={redirectToMoreInfo}
              alt="Algo salio mal..."
              src={/* imagen === "Sin imagen" ? defaultLogo : */ imagen}
            />
          </Tooltip>

        }

        actions={[
          <>
            <Tooltip title="Clic para eliminar" placement='bottom'>
              <Button danger name="modalBorrar" onClick={abrirModalBorrar} ><DeleteOutlined /></Button>
            </Tooltip>
            <DeleteCardModal
              visible={modalBorrar}
              onClose={cerrarModalBorrar}
              idResidencia={idResidencia}
              titulo={titulo}
              setRefresh={setRefresh}
              cerrarModal={cerrarModalBorrar}
            />
          </>
        ]}

      >

        <Meta onClick={redirectToMoreInfo} title={`${ciudad}, ${pais}`} description={`${titulo} ${fechaIni} - ${fechaFin} ${precio}`} />
      </Card>
    </>
  );
};


export default HostCard;
