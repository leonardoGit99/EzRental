import React, { useState } from 'react';
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
      <Card
        // style={{
        //   width: 210,
        //   // textAlign: 'center'
        // }}
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

        <Link to={`/mis-anuncios/${idResidencia}`}>
          <Tooltip title={/* descripcion */`Clic para más detalles`} placement="right">
            <Meta
              title={`${ciudad}, ${pais}`}
              description={`${titulo} ${fechaIni} - ${fechaFin} ${precio}`}
            />
          </Tooltip>
        </Link>
      </Card>
    </>
  );
};


export default HostCard;
