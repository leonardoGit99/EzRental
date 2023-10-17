import React from 'react'
import { CarOutlined, WifiOutlined, VideoCameraOutlined, SkinOutlined,TabletOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaterLadder, faKitchenSet, faFan, faDumbbell,faUtensils, faSquareParking, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Button, Divider, List } from 'antd';
import './detailOffersStyles.css'

function DetailOffers({ services }) {

  function addServicesToArray(services) {
    const servicesArray = [];
    if (services && typeof services === 'object') {
      if (services.hasOwnProperty("parqueo") && services.parqueo) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faSquareParking} /> <p> Parqueo</p>
          </div>
        )
      } if (services.hasOwnProperty("parrilla") && services.parrilla) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faUtensils} /> <p> Parrilla</p>
          </div>
        )
      } if (services.hasOwnProperty("piscina") && services.piscina) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faWaterLadder} />  <p> Piscina</p>
          </div>
        )
      } if (services.hasOwnProperty("estacionamiento") && services.estacionamiento) {
        servicesArray.push(
          <div className="list-offer-item">
            <CarOutlined /> <p> Estacionamiento</p>
          </div>
        )
      } if (services.hasOwnProperty("terraza") && services.terraza) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faBuilding} /> <p> Terraza</p>
          </div>
        )
      } if (services.hasOwnProperty("refrigerador") && services.refrigerador) {
        servicesArray.push(
          <div className="list-offer-item">
            <TabletOutlined /> <p> Refrigerador</p>
          </div>
        )
      } if (services.hasOwnProperty("aireAcondicionado") && services.aireAcondicionado) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faFan} /> <p> Aire Acondicionado</p>
          </div>
        )
      } if (services.hasOwnProperty("cocina") && services.cocina) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faKitchenSet} /> <p> Cocina</p>
          </div>
        )
      } if (services.hasOwnProperty("lavarropa") && services.lavarropa) {
        servicesArray.push(
          <div className="list-offer-item">
            <SkinOutlined /> <p> Lava Ropa</p>
          </div>
        )
      } if (services.hasOwnProperty("equipoEjercicio") && services.equipoEjercicio) {
        servicesArray.push(
          <div className="list-offer-item">
            <FontAwesomeIcon icon={faDumbbell} /> <p> Equipo para hacer ejercicio </p>
          </div>
        )
      } if (services.hasOwnProperty("wifi") && services.wifi) {
        servicesArray.push(
          <div className="list-offer-item">
            <WifiOutlined /> <p> Wifi</p>
          </div>
        )
      } if (services.hasOwnProperty("camaraSeguridad") && services.camaraSeguridad) {
        servicesArray.push(
          <div className="list-offer-item">
            <VideoCameraOutlined /> <p> Cámara de Seguridad</p>
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