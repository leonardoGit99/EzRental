import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailTitle from '../components/DetailTitle/DetailTitle';
import DetailImgs from '../components/DetailImgs/DetailImgs';
import DetailDescription from '../components/DetailDescription/DetailDescription';
import DetailOffers from '../components/DetailOffers/DetailOffers';
import DetailsForHostOnly from '../components/DetailsForHostOnly/DetailsForHostOnly';

function MoreInfoMyAds() {
  let { id } = useParams();
  const [detailAdd, setDetailAdd] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const ad =
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
    services:
      [
        'wifi',
        'Camara de seguridad'
      ],
    modCons:
      [
        "Aire acondicionado"
      ],
    characteristics: [
      "Ideal para familias",
      "Tranquilo",
    ],
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
  };

  function fetchStaticDataId() {
    setDetailAdd(ad);
  }

  useEffect(() => {
    fetchStaticDataId();
  }, [])

  // console.log(detailAdd);

  /*   async function fetchData() {
      //"http://localhost:8080/store/allproducts/"
      //`${process.env.REACT_APP_SERVERURL}/store/allproducts/`
      const response = await fetch(`localhost:8080/store/allproducts/${id}`);
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
          title={detailAdd.title}
          city={detailAdd.city}
          country={detailAdd.country}
        />
        <DetailImgs
          images={detailAdd.images}
          setRefresh={setRefresh}
        />
        <DetailDescription
          residenceType={detailAdd.residenceType}
          spaceType={detailAdd.spaceType}
          description={detailAdd.description}
          numberOfGuests={detailAdd.numberOfGuests}
          numberOfRooms={detailAdd.numberOfRooms}
          numberOfBeds={detailAdd.numberOfBeds}
          numberOfBathrooms={detailAdd.numberOfBathrooms}
        />
        <DetailOffers
          services={detailAdd.services}
          modCons={detailAdd.modCons}
          characteristics={detailAdd.characteristics}
        />
      </div>
    </div>
  )
}

export default MoreInfoMyAds;