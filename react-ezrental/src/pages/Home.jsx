import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import homePageEnDesarrollo from '../assets/homePageEnDesarrollo.jpg';
import GuestCard from '../components/GuestCard/GuestCard';

function Home() {
  const [residences, setResidences] = useState([]);
  const [refresh, setRefresh] = useState(true);
  /* const ads = [
    {
      id: "1",
      imagen: homePageEnDesarrollo,
      title: "Residencia cerca el rio  !",
      city: "Cochabamba",
      country: "Bolivia",
      startDate: "13 de mayo",
      endDate: "21 de mayo",
      price: "Bs. 1500"
    },
  ] */
  const ads = [
    {
      "id_residencia": 3,
      "titulo_residencia": "Graja de pulgas",
      "tipo_residencia": "Granja",
      "pais_residencia": "Bolivia",
      "ciudad_residencia": "Tarija",
      "direccion_residencia": "Calle tarija",
      "cama_residencia": 2,
      "habitacion_residencia": 4,
      "banio_residencia": 2,
      "descripcion_residencia": "Para gente con buenos gustos",
      "huesped_max_residencia": 6,
      "dias_max_residencia": 5,
      "dias_min_residencia": 2,
      "precio_residencia": 199.99,
      "regla_residencia": "Sin perros con pulgas",
      "check_in_residencia": "Nada",
      "check_out_residencia": "Nada",
      "tipo_alojamiento": "Compartido",
      "id_servicio": 3,
      "wifi_residencia": "true",
      "cocina_residencia": "false",
      "televisor_residencia": "true",
      "lavadora_residencia": "true",
      "aire_acond_residencia": "false",
      "psicina_residencia": "false",
      "jacuzzi_residencia": "true",
      "estacionamiento_residencia": "false",
      "gimnasio_residencia": "true",
      "parrilla_residencia": "true",
      "camaras_segurid_residencia": "true",
      "humo_segurid_residencia": "false",
      "id_estado": 4,
      "estado_publicado": "true",
      "estado_pausado": "false",
      "estado_inactivo": "false",
      "fecha_inicio_estado": "2023-10-17T04:00:00.000Z",
      "fecha_fin_estado": "2025-10-17T04:00:00.000Z"
    },
    {
      "id_residencia": 4,
      "titulo_residencia": "Graja de cerdos",
      "tipo_residencia": "Granja",
      "pais_residencia": "Bolivia",
      "ciudad_residencia": "Tarija",
      "direccion_residencia": "Calle tarija",
      "cama_residencia": 2,
      "habitacion_residencia": 4,
      "banio_residencia": 2,
      "descripcion_residencia": "Para gente con buenos gustos",
      "huesped_max_residencia": 6,
      "dias_max_residencia": 5,
      "dias_min_residencia": 2,
      "precio_residencia": 199.99,
      "regla_residencia": "Sin perros",
      "check_in_residencia": "Nada",
      "check_out_residencia": "Nada",
      "tipo_alojamiento": "Compartido",
      "id_servicio": 4,
      "wifi_residencia": "true",
      "cocina_residencia": "false",
      "televisor_residencia": "true",
      "lavadora_residencia": "true",
      "aire_acond_residencia": "false",
      "psicina_residencia": "false",
      "jacuzzi_residencia": "true",
      "estacionamiento_residencia": "false",
      "gimnasio_residencia": "true",
      "parrilla_residencia": "true",
      "camaras_segurid_residencia": "true",
      "humo_segurid_residencia": "false",
      "id_estado": 5,
      "estado_publicado": "false",
      "estado_pausado": "false",
      "estado_inactivo": "true",
      "fecha_inicio_estado": null,
      "fecha_fin_estado": null
    }
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
        No existen residencias
      </div>),
  };



 /*   async function fetchData() {
      //"http://localhost:8080/store/resid"
      //`${process.env.REACT_APP_SERVERURL}/store/resid`
      const response = await fetch(`localhost:8080/store/store/resid`);
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
            }
          >
            {
              residence.estado_publicado === 'true' ?
                <GuestCard
                  idResidencia={residence.id_residencia}
                  imagen={residence.imagen}
                  titulo={residence.titulo_residencia}
                  ciudad={residence.ciudad_residencia}
                  pais={residence.pais_residencia}
                  fechaIni={residence.fecha_inicio_estado ? residence.fecha_inicio_estado.split('T')[0].toString() : 'Fecha inicio'}
                  fechaFin={residence.fecha_fin_estado ? residence.fecha_fin_estado.split('T')[0].toString() : 'Fecha fin'}
                  precio={residence.precio_residencia}
                  setRefresh={setRefresh}
                /> : null
            }
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;