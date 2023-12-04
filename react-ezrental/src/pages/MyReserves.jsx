import React, { useEffect, useState } from 'react';
import { Empty, List, Spin } from 'antd';
import MyReserveCard from '../components/MyReserveCard/MyReserveCard';
import { useAuth } from '../contexts/authContext';
import { getAllRentalsByUser } from '../services/rentals';


function MyReserves() {
  const { user } = useAuth();
  const [reserves, setReserves] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const { Item } = List;
  const setRefresh = (status) => {
    setIsRefresh(status);
  }
  useEffect(() => {
    if (isRefresh) {
      getAllRentalsByUser(user.uid).then((data) => {
        setReserves(data);
      })
      setRefresh(false);
      setLoading(false);
    }
  }, [isRefresh]);


  const customEmptyMessage = {
    emptyText: (
      <>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 60,
          }}
          description={
            <span>
              No existen Reservas
            </span>
          }
        >
        </Empty>
      </>),
  };

  return (
    <Spin spinning={loading} tip="Cargando...">
      <List
        grid={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4
        }}
        pagination={{
          onChange: page => {
            console.log(page);
          }, pageSize: 12,
        }}
        locale={customEmptyMessage}
        dataSource={reserves && reserves}
        renderItem={(reserve) => (
          <Item
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }
            }
          >
            <MyReserveCard
              idResidence={reserve.id_residencia}
              country={reserve.pais_residencia}
              city={reserve.ciudad_residencia}
              titleAd={reserve.titulo_residencia}
              startReserveDate={reserve.fecha_inicio_estado ? reserve.fecha_inicio_estado.split('T')[0].toString() : 'Sin fecha'}
              endReserveDate={reserve.fecha_fin_estado ? reserve.fecha_fin_estado.split('T')[0].toString() : 'Sin fecha'}
              totalPrice={reserve.precio_residencia}
              images={reserve.imagenes[0]}
              setRefresh={setRefresh}
            />
          </Item>
        )}
      />
    </Spin>
  )
}

export default MyReserves;