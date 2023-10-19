import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailTitle from '../components/DetailTitle/DetailTitle';
import DetailImgs from '../components/DetailImgs/DetailImgs';
import DetailDescription from '../components/DetailDescription/DetailDescription';
import DetailOffers from '../components/DetailOffers/DetailOffers';
import DetailCheckInOut from '../components/DetailCheckInOut/DetailCheckInOut';

function MoreInfoAds() {
  let { id } = useParams();
  const [detailAdd, setDetailAdd] = useState([]);
  const [refresh, setRefresh] = useState(true);
/*   const ad =
  {
    id: 1,
    state: "Publicado",
    title: "Residencia cerca el mar",
    residenceType: "Casa",
    spaceType: "Compartido",
    city: "Cochabamba",
    country: "Bolivia",
    address: "Plazuela sucre",
    numberOfGuests: 8,
    numberOfBeds: 4,
    numberOfRooms: 2,
    numberOfBathrooms: 3,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit laborum nam dolore harum commodi doloribus ipsum architecto repellendus. Deserunt ea commodi perspiciatis excepturi perferendis totam doloremque necessitatibus sapiente temporibus qui.Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit laborum nam dolore harum commodi doloribus ipsum architecto repellendus. Deserunt ea commodi perspiciatis excepturi perferendis totam doloremque necessitatibus sapiente temporibus qui.",
    startDate: "13 de mayo",
    endDate: "21 de mayo",
    services:{
      parqueo: true,
      parrilla: true,
      piscina: true,
      estacionamiento: true,
      terraza: true,
      refrigerador: true,
      aireAcondicionado: true,
      cocina: true,
      lavarropa: true,
      equipoEjercicio: true,
      wifi: true,
      camaraSeguridad: true,
    },
    checkIn: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aspernatur ex magnam aliquam, cum aperiam cumque voluptatibus fugiat, odit similique a, perferendis quaerat porro. Vero modi atque natus facere sapiente.",
    checkOut: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aspernatur ex magnam aliquam, cum aperiam cumque voluptatibus fugiat, odit similique a, perferendis quaerat porro. Vero modi atque natus facere sapiente.",
    price: 1500,
    images:
      [
        'https://plus.unsplash.com/premium_photo-1682377521625-c656fc1ff3e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80',
        // 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        'https://images.unsplash.com/photo-1628745277862-bc0b2d68c50c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      ],
  }; */

  const ad = {
    "id_residencia": 3,
    "titulo_residencia": "Graja de pulgas",
    "tipo_residencia": "Granja",
    "pais_residencia": "Bolivia",
    "ciudad_residencia": "Tarija",
    "direccion_residencia": "Calle tarija",//No se esta tomando en cuenta por el momento
    "cama_residencia": 2,
    "habitacion_residencia": 4,
    "banio_residencia": 2,
    "descripcion_residencia": "Para gente con buenos gustos",
    "huesped_max_residencia": 6,
    "dias_max_residencia": 5,
    "dias_min_residencia": 2,
    "precio_residencia": 199.99, //No se esta tomando en cuenta por el momento
    "regla_residencia": "Sin perros con pulgas", //Preguntar donde ubicarlo
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
    "estado_publicado": "false",
    "estado_pausado": "true",
    "estado_inactivo": "false",
    "fecha_inicio_estado": "2023-10-17T04:00:00.000Z",//No se esta tomando en cuenta por el momento
    "fecha_fin_estado": "2025-10-17T04:00:00.000Z" // No se esta tomando en cuenta por el momento
  }

  const services = {
    wifi_residencia: detailAdd.wifi_residencia,
    cocina_residencia: detailAdd.cocina_residencia,
    televisor_residencia: detailAdd.televisor_residencia,
    lavadora_residencia: detailAdd.lavadora_residencia,
    aire_acond_residencia: detailAdd.aire_acond_residencia,
    psicina_residencia: detailAdd.psicina_residencia,
    jacuzzi_residencia: detailAdd.jacuzzi_residencia,
    estacionamiento_residencia: detailAdd.estacionamiento_residencia,
    gimnasio_residencia: detailAdd.gimnasio_residencia,
    parrilla_residencia: detailAdd.parrilla_residencia,
    camaras_segurid_residencia: detailAdd.camaras_segurid_residencia,
    humo_segurid_residencia: detailAdd.humo_segurid_residencia,
  }

  function fetchStaticDataId() {
    setDetailAdd(ad);
  }

  useEffect(() => {
    fetchStaticDataId();
  }, [])

  // console.log(detailAdd);

  /*   async function fetchData() {
      //"http://localhost:8080/store/resid/${id}"
      //`${process.env.REACT_APP_SERVERURL}/store/resid/${id}`
      const response = await fetch(`localhost:8080/store/store/resid/${id}`);
      const jsonData = await response.json();
      setProducts(jsonData);
  } */

  /* useEffect(() => {
    fetchData();
  }, [setRefresh, isRefresh]); */
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '1200px' }}>
        {/* Mas info de card guest {id} */}
        <DetailTitle
          title={detailAdd.titulo_residencia}
          city={detailAdd.ciudad_residencia}
          country={detailAdd.pais_residencia}
          
        />
        <DetailImgs
          images={detailAdd.images}
          setRefresh={setRefresh}
        />
        <DetailDescription
          residenceType={detailAdd.tipo_residencia}
          spaceType={detailAdd.tipo_alojamiento}
          description={detailAdd.descripcion_residencia}
          numberOfGuests={detailAdd.huesped_max_residencia}
          numberOfRooms={detailAdd.habitacion_residencia}
          numberOfBeds={detailAdd.cama_residencia}
          numberOfBathrooms={detailAdd.banio_residencia}
        />
        <DetailOffers 
          services={services}
        />
        <DetailCheckInOut
          checkIn={detailAdd.check_in_residencia}
          checkOut={detailAdd.check_out_residencia}
        />
      </div>
    </div>
  )
}

export default MoreInfoAds;