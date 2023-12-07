import React from 'react';
import { Button, Empty, Modal, Spin, Table } from 'antd';
import { EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './tableGuestReservesStyles.css';

function TableGuestReserves({ loading }) {
  const navigate = useNavigate();
  const dataReservesSimu = [
    {
      "id_residencia": 6,
      "titulo_residencia": "Casa de EVARISTO",
      "pais_residencia": "Bolivia",
      "ciudad_residencia": "Cochabamba",
      "precio_residencia": 5000,
      "ubicacion_residencia": "https://maps.app.goo.gl/eckrZvZWijSkQsU47",
      "imagenes": [
        "https://drive.google.com/uc?id=1YfQR_lfXuG_PIKJ5Uvq8ILoeAxpnAgjc",
        "https://drive.google.com/uc?id=1fHFnAmObjCMmBBGDwOghIJ6AiJEv2trD",
        "https://drive.google.com/uc?id=1Da0YG3KxBH1ccpwdWYM-Mzm7yxY_8nCH",
        "https://drive.google.com/uc?id=1q3NtwKqZ7PU8mhN9H7hl_13blOT0cL72",
        "https://drive.google.com/uc?id=1tWK6l0IpNZo8eZb2Dt5H6Ov4UjvkTcQq"
      ],
      "fecha_inicio_estado": "2023-11-29T04:00:00.000Z",
      "fecha_fin_estado": "2023-12-30T04:00:00.000Z",
      "id_reserva": 43,
      "precio_total_reserva": 15000,
      "fecha_inicio_reserva": "2023-12-08T04:00:00.000Z",
      "fecha_fin_reserva": "2023-12-10T04:00:00.000Z"
    }, {
      "id_residencia": 1,
      "titulo_residencia": "Casa de EVARISTOssss",
      "pais_residencia": "Bolivia",
      "ciudad_residencia": "Cochabamba",
      "precio_residencia": 5000,
      "ubicacion_residencia": "https://maps.app.goo.gl/eckrZvZWijSkQsU47",
      "imagenes": [
        "https://drive.google.com/uc?id=1YfQR_lfXuG_PIKJ5Uvq8ILoeAxpnAgjc",
        "https://drive.google.com/uc?id=1fHFnAmObjCMmBBGDwOghIJ6AiJEv2trD",
        "https://drive.google.com/uc?id=1Da0YG3KxBH1ccpwdWYM-Mzm7yxY_8nCH",
        "https://drive.google.com/uc?id=1q3NtwKqZ7PU8mhN9H7hl_13blOT0cL72",
        "https://drive.google.com/uc?id=1tWK6l0IpNZo8eZb2Dt5H6Ov4UjvkTcQq"
      ],
      "fecha_inicio_estado": "2023-11-29T04:00:00.000Z",
      "fecha_fin_estado": "2023-12-30T04:00:00.000Z",
      "id_reserva": 42,
      "precio_total_reserva": 15000,
      "fecha_inicio_reserva": "2023-12-08T04:00:00.000Z",
      "fecha_fin_reserva": "2023-12-10T04:00:00.000Z"
    }, {
      "id_residencia": 4,
      "titulo_residencia": "Casa de leonardo",
      "pais_residencia": "Bolivia",
      "ciudad_residencia": "Cochabamba",
      "precio_residencia": 5000,
      "ubicacion_residencia": "https://maps.app.goo.gl/eckrZvZWijSkQsU47",
      "imagenes": [
        "https://drive.google.com/uc?id=1YfQR_lfXuG_PIKJ5Uvq8ILoeAxpnAgjc",
        "https://drive.google.com/uc?id=1fHFnAmObjCMmBBGDwOghIJ6AiJEv2trD",
        "https://drive.google.com/uc?id=1Da0YG3KxBH1ccpwdWYM-Mzm7yxY_8nCH",
        "https://drive.google.com/uc?id=1q3NtwKqZ7PU8mhN9H7hl_13blOT0cL72",
        "https://drive.google.com/uc?id=1tWK6l0IpNZo8eZb2Dt5H6Ov4UjvkTcQq"
      ],
      "fecha_inicio_estado": "2023-11-29T04:00:00.000Z",
      "fecha_fin_estado": "2023-12-30T04:00:00.000Z",
      "id_reserva": 48,
      "precio_total_reserva": 15000,
      "fecha_inicio_reserva": "2023-12-08T04:00:00.000Z",
      "fecha_fin_reserva": "2023-12-10T04:00:00.000Z"
    },
    {
      "id_residencia": 4,
      "titulo_residencia": "Casa de leonardo",
      "pais_residencia": "Bolivia",
      "ciudad_residencia": "Cochabamba",
      "precio_residencia": 5000,
      "ubicacion_residencia": "https://maps.app.goo.gl/eckrZvZWijSkQsU47",
      "imagenes": [
        "https://drive.google.com/uc?id=1YfQR_lfXuG_PIKJ5Uvq8ILoeAxpnAgjc",
        "https://drive.google.com/uc?id=1fHFnAmObjCMmBBGDwOghIJ6AiJEv2trD",
        "https://drive.google.com/uc?id=1Da0YG3KxBH1ccpwdWYM-Mzm7yxY_8nCH",
        "https://drive.google.com/uc?id=1q3NtwKqZ7PU8mhN9H7hl_13blOT0cL72",
        "https://drive.google.com/uc?id=1tWK6l0IpNZo8eZb2Dt5H6Ov4UjvkTcQq"
      ],
      "fecha_inicio_estado": "2023-11-29T04:00:00.000Z",
      "fecha_fin_estado": "2023-12-30T04:00:00.000Z",
      "id_reserva": 48,
      "precio_total_reserva": 15000,
      "fecha_inicio_reserva": "2023-12-08T04:00:00.000Z",
      "fecha_fin_reserva": "2023-12-10T04:00:00.000Z"
    },
    {
      "id_residencia": 4,
      "titulo_residencia": "Casa de leonardo",
      "pais_residencia": "Bolivia",
      "ciudad_residencia": "Cochabamba",
      "precio_residencia": 5000,
      "ubicacion_residencia": "https://maps.app.goo.gl/eckrZvZWijSkQsU47",
      "imagenes": [
        "https://drive.google.com/uc?id=1YfQR_lfXuG_PIKJ5Uvq8ILoeAxpnAgjc",
        "https://drive.google.com/uc?id=1fHFnAmObjCMmBBGDwOghIJ6AiJEv2trD",
        "https://drive.google.com/uc?id=1Da0YG3KxBH1ccpwdWYM-Mzm7yxY_8nCH",
        "https://drive.google.com/uc?id=1q3NtwKqZ7PU8mhN9H7hl_13blOT0cL72",
        "https://drive.google.com/uc?id=1tWK6l0IpNZo8eZb2Dt5H6Ov4UjvkTcQq"
      ],
      "fecha_inicio_estado": "2023-11-29T04:00:00.000Z",
      "fecha_fin_estado": "2023-12-30T04:00:00.000Z",
      "id_reserva": 48,
      "precio_total_reserva": 15000,
      "fecha_inicio_reserva": "2023-12-08T04:00:00.000Z",
      "fecha_fin_reserva": "2023-12-10T04:00:00.000Z"
    },
    {
      "id_residencia": 4,
      "titulo_residencia": "Casa de leonardo",
      "pais_residencia": "Bolivia",
      "ciudad_residencia": "Cochabamba",
      "precio_residencia": 5000,
      "ubicacion_residencia": "https://maps.app.goo.gl/eckrZvZWijSkQsU47",
      "imagenes": [
        "https://drive.google.com/uc?id=1YfQR_lfXuG_PIKJ5Uvq8ILoeAxpnAgjc",
        "https://drive.google.com/uc?id=1fHFnAmObjCMmBBGDwOghIJ6AiJEv2trD",
        "https://drive.google.com/uc?id=1Da0YG3KxBH1ccpwdWYM-Mzm7yxY_8nCH",
        "https://drive.google.com/uc?id=1q3NtwKqZ7PU8mhN9H7hl_13blOT0cL72",
        "https://drive.google.com/uc?id=1tWK6l0IpNZo8eZb2Dt5H6Ov4UjvkTcQq"
      ],
      "fecha_inicio_estado": "2023-11-29T04:00:00.000Z",
      "fecha_fin_estado": "2023-12-30T04:00:00.000Z",
      "id_reserva": 48,
      "precio_total_reserva": 15000,
      "fecha_inicio_reserva": "2023-12-08T04:00:00.000Z",
      "fecha_fin_reserva": "2023-12-10T04:00:00.000Z"
    },
    {
      "id_residencia": 4,
      "titulo_residencia": "Casa de leonardo",
      "pais_residencia": "Bolivia",
      "ciudad_residencia": "Cochabamba",
      "precio_residencia": 5000,
      "ubicacion_residencia": "https://maps.app.goo.gl/eckrZvZWijSkQsU47",
      "imagenes": [
        "https://drive.google.com/uc?id=1YfQR_lfXuG_PIKJ5Uvq8ILoeAxpnAgjc",
        "https://drive.google.com/uc?id=1fHFnAmObjCMmBBGDwOghIJ6AiJEv2trD",
        "https://drive.google.com/uc?id=1Da0YG3KxBH1ccpwdWYM-Mzm7yxY_8nCH",
        "https://drive.google.com/uc?id=1q3NtwKqZ7PU8mhN9H7hl_13blOT0cL72",
        "https://drive.google.com/uc?id=1tWK6l0IpNZo8eZb2Dt5H6Ov4UjvkTcQq"
      ],
      "fecha_inicio_estado": "2023-11-29T04:00:00.000Z",
      "fecha_fin_estado": "2023-12-30T04:00:00.000Z",
      "id_reserva": 48,
      "precio_total_reserva": 15000,
      "fecha_inicio_reserva": "2023-12-08T04:00:00.000Z",
      "fecha_fin_reserva": "2023-12-10T04:00:00.000Z"
    },
    {
      "id_residencia": 4,
      "titulo_residencia": "Casa de leonardo",
      "pais_residencia": "Bolivia",
      "ciudad_residencia": "Cochabamba",
      "precio_residencia": 5000,
      "ubicacion_residencia": "https://maps.app.goo.gl/eckrZvZWijSkQsU47",
      "imagenes": [
        "https://drive.google.com/uc?id=1YfQR_lfXuG_PIKJ5Uvq8ILoeAxpnAgjc",
        "https://drive.google.com/uc?id=1fHFnAmObjCMmBBGDwOghIJ6AiJEv2trD",
        "https://drive.google.com/uc?id=1Da0YG3KxBH1ccpwdWYM-Mzm7yxY_8nCH",
        "https://drive.google.com/uc?id=1q3NtwKqZ7PU8mhN9H7hl_13blOT0cL72",
        "https://drive.google.com/uc?id=1tWK6l0IpNZo8eZb2Dt5H6Ov4UjvkTcQq"
      ],
      "fecha_inicio_estado": "2023-11-29T04:00:00.000Z",
      "fecha_fin_estado": "2023-12-30T04:00:00.000Z",
      "id_reserva": 48,
      "precio_total_reserva": 15000,
      "fecha_inicio_reserva": "2023-12-08T04:00:00.000Z",
      "fecha_fin_reserva": "2023-12-10T04:00:00.000Z"
    },
  ]

  const columnsData = [
    { title: "Id reserva", dataIndex: "id_reserva", key: "id_reserva", defaultSortOrder: "descend", sorter: (idA, idB) => idA.id_reserva - idB.id_reserva },
    {
      title: "Detalles relevantes", children: [{
        title: "Anuncio", dataIndex: "titulo_residencia", key: "titulo_residencia"
      }, {
        title: "Pais", dataIndex: "pais_residencia", key: "pais_residencia"
      }, {
        title: "Ciudad", dataIndex: "ciudad_residencia", key: "ciudad_residencia"
      }, {
        title: "Monto total pagado (Bs.)", dataIndex: "precio_total_reserva", key: "precio_total_reserva"
      }]
    },
    {
      title: "Fechas de Reserva", children: [{
        title: "Fecha inicio", dataIndex: "fecha_inicio_reserva", key: "fecha_inicio_reserva", render: (startReserveDate) => { return startReserveDate && startReserveDate.split('T')[0].toString() }
      }, {
        title: "Fecha fin", dataIndex: "fecha_fin_reserva", key: "fecha_fin_reserva", render: (endReserveDate) => { return endReserveDate && endReserveDate.split('T')[0].toString() }
      }]
    },
    { title: "Acciones", key: "acciones", render: (reserve) => (<Button type="link" onClick={() => { viewAdd(reserve) }}> <EyeTwoTone /> Ver anuncio</Button>) },
  ]

  const viewAdd = (reserve) => {
    console.log(reserve);
    if (reserve.id_residencia && reserve.id_residencia) {
      navigate(`/${reserve.id_residencia}`);
    } else {
      Modal.error({ content: "El anuncio ya no está disponible :(", okText: "Ok" });
    }
  }

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
    <>
      <Table
        className="table-my-guest-reserves"
        columns={columnsData}
        dataSource={dataReservesSimu}
        rowKey={dataReservesSimu.id_reserva}
        locale={loading ? { emptyText: (<Spin spinning={loading} tip="Cargando..." />) } : customEmptyMessage}
        pagination={{ pageSize: 7, pagination: true, position: ["bottomRight"] }}
        bordered={true}
      >
      </Table>
    </>
  )
}

export default TableGuestReserves;