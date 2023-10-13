import React from 'react'
import { WifiOutlined } from '@ant-design/icons';
import { Button, Divider, List } from 'antd';
import './detailOffersGuestStyles.css'

function DetailOffersGuest({ services, modCons, characteristics }) {
  return (
    <div>
      <Divider />
      <h3>Lo que este lugar ofrece</h3>
      <div className='offers-container'>
        <div className="offers-container-col-1">
          <List
            grid={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 6
            }}
          >
            <List.Item>
              <WifiOutlined /> <p> Servicio 1</p>
            </List.Item>
            <List.Item>
              <WifiOutlined /> <p> Comodidad 1</p>
            </List.Item>
            <List.Item>
              <WifiOutlined /> <p> Caracteristica 1</p>
            </List.Item>
          </List>
        </div>
        <div className="offers-container-col-2">
          <List
            grid={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 6
            }}
          >
            <List.Item>
              <WifiOutlined /> <p> Servicio 2</p>
            </List.Item>
            <List.Item>
              <WifiOutlined /> <p> Comodidad 2</p>
            </List.Item>
            <List.Item>
              <WifiOutlined /> <p> Caracteristica 2</p>
            </List.Item>
          </List>
        </div>
      </div>
      <Button type="primary">Mostrar más servicios</Button>
      <Divider />
    </div>
  )
}

export default DetailOffersGuest;