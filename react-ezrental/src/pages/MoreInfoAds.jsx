import React from 'react';
import { useParams } from 'react-router-dom';
import homePageEnDesarrollo from '../assets/homePageEnDesarrollo.jpg';

function MoreInfoAds() {
    let {id} = useParams();
    const ads = [
      {
        id: "1",
        imagen: homePageEnDesarrollo,
        title: "Residencia cerca el rio!",
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
      },
    ]
    let residenceSelected = ads.find(residence => residence.id === id)
  return (
    <div>Mas info de card guest {id} y el titulo es: {residenceSelected.title}</div>
  )
}

export default MoreInfoAds;