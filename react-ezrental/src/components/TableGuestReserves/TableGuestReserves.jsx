import React from 'react';
import { Button, Empty, Modal, Spin, Table } from 'antd';
import { EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './tableGuestReservesStyles.css';

function TableGuestReserves({ loading, reserves }) {
  const navigate = useNavigate();
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
        dataSource={reserves}
        rowKey={record=>record.id_reserva}
        locale={loading ? { emptyText: (<Spin spinning={loading} tip="Cargando..." > &nbsp; </Spin>) } : customEmptyMessage}
        pagination={{ pageSize: 7, pagination: true, position: ["bottomRight"] }}
        bordered={true}
      >
      </Table>
    </>
  )
}

export default TableGuestReserves;