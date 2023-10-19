import React from 'react'
import { CarOutlined, WifiOutlined, VideoCameraOutlined, SkinOutlined, TabletOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaterLadder, faKitchenSet, faFan, faDumbbell, faUtensils, faBuilding, faTv, faHotTubPerson, faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { Button, Divider, List } from 'antd';
import './detailOffersStyles.css'

function DetailOffers({ services }) {

  function addServicesToArray(services) {
    const servicesArray = [];
    if (services && typeof services === 'object') {
      if (services.hasOwnProperty("wifi_residencia") && services.wifi_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <WifiOutlined /> <p> Wifi </p>
          </div>
        )
      } if (services.hasOwnProperty("cocina_residencia") && services.cocina_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faKitchenSet} /> <p> Cocina</p>
          </div>
        )
      } if (services.hasOwnProperty("televisor_residencia") && services.televisor_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faTv} />  <p> Televisor </p>
          </div>
        )
      } if (services.hasOwnProperty("lavadora_residencia") && services.lavadora_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <SkinOutlined /> <p> Lavadora </p>
          </div>
        )
      } if (services.hasOwnProperty("aire_acond_residencia") && services.aire_acond_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faFan} /> <p> Aire acondicionado</p>
          </div>
        )
      } if (services.hasOwnProperty("psicina_residencia") && services.psicina_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faWaterLadder} /> <p> Psicina </p>
          </div>
        )
      } if (services.hasOwnProperty("jacuzzi_residencia") && services.jacuzzi_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faHotTubPerson} /> <p> Jacuzzi </p>
          </div>
        )
      } if (services.hasOwnProperty("estacionamiento_residencia") && services.estacionamiento_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <CarOutlined /> <p> Estacionamiento </p>
          </div>
        )
      } if (services.hasOwnProperty("gimnasio_residencia") && services.gimnasio_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faDumbbell} /> <p> Gimnasio </p>
          </div>
        )
      } if (services.hasOwnProperty("parrilla_residencia") && services.parrilla_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faUtensils} /> <p> Parrilla </p>
          </div>
        )
      } if (services.hasOwnProperty("camaras_segurid_residencia") && services.camaras_segurid_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <VideoCameraOutlined /> <p> Cámara de seguridad </p>
          </div>
        )
      } if (services.hasOwnProperty("humo_segurid_residencia") && services.humo_segurid_residencia) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faFireFlameCurved} /> <p> Sistema contra incendios </p>
          </div>
        )
      }
    }
    return servicesArray;
  }

  const renderedServices = addServicesToArray(services);

  // console.log(renderedServices);
  return (
    <div>
      <Divider />
      <h3>Lo que este lugar ofrece</h3>
      <div className='offers-container'>
        <List
          grid={{
            gutter: 16,
            column: 4,
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={renderedServices}
          renderItem={(item, index) => (
            <List.Item key={index}>
              {item}
            </List.Item>
          )}
        >
        </List>
      </div>
      <Divider />
    </div>
  )
}

export default DetailOffers;