import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import homePageEnDesarrollo from '../assets/homePageEnDesarrollo.jpg';
import HostCard from '../components/HostCard/HostCard';
import { getAllResidences } from '../services/residences';

function MyAds() {
  const [residences, setResidences] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  useEffect(() => {
    if (isRefresh) {
      getAllResidences().then((data) => setResidences(data));
      setRefresh(false);
    }
  }, [setRefresh, isRefresh]);

  const customEmptyMessage = {
    emptyText: (
      <div>
        <ExclamationCircleOutlined /><br />
        No existen residencias registradas
      </div>),
  };

  return (
    <>
      <List
        grid={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6
        }}
        pagination={{
          onChange: page => {
            console.log(page);
          }, pageSize: 15,
        }}
        locale={customEmptyMessage}
        dataSource={residences}
        renderItem={(residence) => (
          <List.Item
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }
            }>
            <HostCard
              idResidencia={residence.id_residencia}
              imagen={residence.imagen}
              titulo={residence.titulo_residencia}
              ciudad={residence.ciudad_residencia}
              pais={residence.pais_residencia}
              fechaIni={residence.fecha_inicio_estado ? residence.fecha_inicio_estado.split('T')[0].toString() : 'Pendiente...'}
              fechaFin={residence.fecha_fin_estado ? residence.fecha_fin_estado.split('T')[0].toString() : 'Pendiente...'}
              precio={residence.precio_residencia}
              estadoResidencia={residence.estado_residencia}
              isRefresh={isRefresh}
              setRefresh={setRefresh}
            />
          </List.Item >
        )}
      />
    </>
  );
};

export default MyAds;