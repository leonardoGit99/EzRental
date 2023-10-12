import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Meta } = Card;
import './hostCardStyles.css';
import DeleteCardModal from '../DeleteCardModal/DeleteCardModal';

function HostCard({ idResidencia, imagen, titulo, ciudad, pais, fechaIni, fechaFin, precio, setRefresh }) {
  const [modalBorrar, setBorrar] = useState(false);

  const abrirModalBorrar = () => {
    setBorrar(true);
  }

  const cerrarModalBorrar = () => {
    setBorrar(false);
  }

  return (
    <>
      <Link to={`/mis-anuncios/${idResidencia}`}>
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
                alt="Algo salio mal..."
                src={/* imagen === "Sin imagen" ? defaultLogo : */ imagen}
              />
            </Tooltip>
          }

          actions={[
            <>
              <Tooltip title="Clic para eliminar" placement='bottom'>
                <Button name="modalBorrar" danger size='small' onClick={abrirModalBorrar} ><DeleteOutlined /></Button>
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

          <Meta title={`${ciudad}, ${pais}`} description={`${titulo} ${fechaIni} - ${fechaFin} ${precio}`} />
        </Card>
      </Link>
    </>
  );
};


export default HostCard;
