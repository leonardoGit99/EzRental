import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import homePageEnDesarrollo from '../assets/homePageEnDesarrollo.jpg';
import HostCard from '../components/HostCard/HostCard';

function MyAds() {
  const [residences, setResidences] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const ads = [
    {
      id: "1",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    }, {
      id: "2",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    }, {
      id: "3",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    }, {
      id: "4",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    }, {
      id: "5",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    }, {
      id: "6",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },{
      id: "7",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },{
      id: "8",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },{
      id: "9",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },{
      id: "10",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },{
      id: "11",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },{
      id: "12",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },{
      id: "13",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },{
      id: "14",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },{
      id: "15",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },{
      id: "16",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca la playa!",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },
  ];

  function fetchStaticData() {
    setResidences(ads);
  }

  useEffect(() => {
    fetchStaticData();
  }, []);

  const customEmptyMessage = {
    emptyText: (
      <div>
        <ExclamationCircleOutlined /><br />
        No existen residencias registradas
      </div>),
  };

  /*   async function fetchData() {
      //"http://localhost:8080/store/allproducts/"
      //`${process.env.REACT_APP_SERVERURL}/store/allproducts/`
      const response = await fetch(`localhost:8080/store/allproducts/`);
      const jsonData = await response.json();
      setProducts(jsonData);
  } */

  /* useEffect(() => {
    fetchData();
  }, [setRefresh, isRefresh]); */

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
              idResidencia={residence.id}
              imagen={residence.imagen}
              titulo={residence.title}
              ciudad={residence.city}
              pais={residence.country}
              fechaIni={residence.startDate}
              fechaFin={residence.endDate}
              precio={residence.price}
              setRefresh={setRefresh}
            />
          </List.Item >
        )}
      />
    </>
  );
};

export default MyAds;