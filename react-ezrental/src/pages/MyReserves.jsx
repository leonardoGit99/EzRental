import React, { useEffect, useState } from 'react';
import { Empty, List } from 'antd';
import MyReserveCard from '../components/MyReserveCard/MyReserveCard';
import { useAuth } from '../contexts/authContext';
import { getAllRentalsByUser } from '../services/rentals';


function MyReserves() {
  const { user } = useAuth();
  const [reserves, setReserves] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const { Item } = List;
  const setRefresh = (status) => {
    setIsRefresh(status);
  }
console.log(user.uid);
  useEffect(() => {
    if (isRefresh) {
      getAllRentalsByUser(user.uid).then((data) => {
        setReserves(data);
      })
      setRefresh(false);
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

  const reservesJsonSim = [
    {
      idResidence: "2",
      country: "Bolivia",
      city: "Cochabamba",
      titleAd: "titulo del anuncio",
      startReserveDate: "2023-11-11",
      endReserveDate: "2023-11-15",
      totalPrice: 1900,
      images: [
        "https://hospitecnia.com/sites/default/files/styles/node_teaser/public/2020-06/cabecera-vitaller-residencias-03.jpg?itok=LkIifrPr",
      ]
    }, {
      idResidence: "3",
      country: "Chile",
      city: "Santiago de Chile",
      titleAd: "titulo del anuncio 2",
      startReserveDate: "2023-11-15",
      endReserveDate: "2023-11-19",
      totalPrice: 2500,
      images: [
        "https://realestatemarket.com.mx/images/2019/05-Mayo/1005/arquitectura_dia_madres_g.jpg",
      ]
    }
  ]
  return (
    <>
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
        dataSource={reserves && reserves  /* reservesJsonSim */}
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
              startReserveDate={reserve.fecha_inicio_estado ? reserve.fecha_inicio_estado .split('T')[0].toString() : 'Sin fecha'}
              endReserveDate={reserve.fecha_fin_estado ? reserve.fecha_fin_estado.split('T')[0].toString() : 'Sin fecha'}
              totalPrice={reserve.precio_residencia}
              images={reserve.imagenes[0]}
              setRefresh={setRefresh}
            />
          </Item>
        )}
      />
    </>
  )
}

export default MyReserves;