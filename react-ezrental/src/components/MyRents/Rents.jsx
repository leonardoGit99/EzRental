import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, List, Popconfirm, Badge  } from 'antd';
import { useAuth } from '../../contexts/authContext';
import { getAllMyRentalsByUserHost } from '../../services/rentals';
import { Link } from 'react-router-dom';
import { format, isToday, parseISO } from 'date-fns';
import './rents.css'

const { Column, ColumnGroup } = Table;

const Rents = () => {
  
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const { Item } = List;
  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  
  useEffect(() => {
    if (isRefresh) {
      getAllMyRentalsByUserHost(user.uid).then((data) => {
        setReservas(data);
      })
      setRefresh(false);
    }
  }, [isRefresh]);

  /*De backend estoy obteniendo estos datos:
  "id_reserva": 40,
    "id_residencia": 11,
    "precio_total_reserva": 460,
    "fecha_inicio_reserva": "2023-12-08T04:00:00.000Z",
    "fecha_fin_reserva": "2023-12-09T04:00:00.000Z",
    "titulo_residencia": "Casa Maruecos",
    "tipo_residencia": "Casa",
    "pais_residencia": "Bolivia",
    "ciudad_residencia": "Cochabamba",
    "id_usuario": 9,
    "nombre_usuario": "Leonardo Fuentes Claros",
    "correo_usuario": "leonardofuentesclaros@gmail.com",
    "foto_usuario": "https://drive.google.com/uc?id=12kpAgADb25FzbH07NXnX6gIByMU5Z0td",
    "tags": [
      "Casa",
      "Bolivia",
      "Cochabamba"
    ]
  */
 //Importante aun me faltan los datos de Status y saber si en una residencia ya escribiste su receñia
  const [data, setData] = useState([]);

  useEffect(() => {
    const transformedData = reservas.map((reserva) => ({
      id_usuario: reserva.id_usuario,
      nombre_usuario: reserva.nombre_usuario,
      correo_usuario: reserva.correo_usuario,
      id_residencia: reserva.id_residencia,
      titulo_residencia: reserva.titulo_residencia,
      tags: reserva.tags,  // son los datos de r.tipo_residencia, r.pais_residencia, r.ciudad_residencia
      id_reserva: reserva.id_reserva,
      precio_total_reserva: reserva.precio_total_reserva,
      fecha_inicio_reserva: reserva.fecha_inicio_reserva,
      fecha_fin_reserva: reserva.fecha_fin_reserva,
      status: reserva.status,
      resenia: reserva.resenia,
    }));
    setData(transformedData);
  }, [reservas]);

  const handleConfirmClick = async (record) => {
    try {
      // Simulación de la petición al backend para cambiar el estado a Rentado
      const updatedData = data.map((item) =>
        item.id_usuario === record.id_usuario ? { ...item, status: 'Rentado' } : item
      );
      setData(updatedData);
    } catch (error) {
      console.error('Error al cambiar el estado a Rentado:', error);
    }
  };

  const handleWriteReviewClick = (record) => {
    // Aquí puedes "Escribir Reseña del huesped"
    console.log(`Escribir reseña para la reserva con ID: ${record.id_reserva}`);
    //abrir un modal.
  };

  const handleCancelClick = async (record) => {
    try {
      // Simulación de la petición al backend para borrar la fila
      const updatedData = data.map((item) =>
      item.id_usuario === record.id_usuario ? { ...item, status: 'Cancelado' } : item
    );

    setData(updatedData);
    } catch (error) {
      console.error('Error al borrar la fila:', error);
    }
  };

  const columns = [
    {
      title: 'Huesped',
      children: [
        {
          title: 'Nombre',
          dataIndex: 'nombre_usuario',
          key: 'nombre_usuario',
          align: 'center',
          render: (text, record) => (
            <Link to={`/usuario/${record.id_usuario}`}>{text}</Link>
          ),
        },
        { title: 'Correo', dataIndex: 'correo_usuario', key: 'correo_usuario', align: 'center', },
      ],
    },
    { title: 'Titulo Residencia', dataIndex: 'titulo_residencia', key: 'titulo_residencia', align: 'center', },
    { title: 'Precio Reserva', dataIndex: 'precio_total_reserva', key: 'precio_total_reserva', align: 'center', },
    {
      title: 'Fechas de Reserva',
      children: [
        {
          title: 'Inicio',
          dataIndex: 'fecha_inicio_reserva',
          key: 'fecha_inicio_reserva',
          align: 'center',
          style: { color: '#336699' },
          render: (text) => format(new Date(text), 'yyyy-MM-dd'),
        },
        {
          title: 'Fin',
          dataIndex: 'fecha_fin_reserva',
          key: 'fecha_fin_reserva',
          align: 'center',
          render: (text) => format(new Date(text), 'yyyy-MM-dd'),
        },
      ],
    },
    {
      title: 'Status',
      key: 'state',
      align: 'center',
      render: (_, record) => (
        <Badge
          status={record.status === 'Rentado' ? 'success' : record.status === 'Cancelado' ? 'error' : 'default'}
          text={record.status}
        />
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      align: 'center',
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag} >
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'Confirmar' && (
            <>
              <Popconfirm
                title="¿Estás seguro de confirmar la reserva?"
                onConfirm={() => handleConfirmClick(record)}
                placement="bottom"
              >
                <Button>Confirmar</Button>
              </Popconfirm>
              <Popconfirm
                title="¿Estás seguro de cancelar la reserva?"
                onConfirm={() => handleCancelClick(record)}
                placement="bottom"
              >
                <Button>Cancelar</Button>
              </Popconfirm>
            </>
          )}
          {record.status === 'Rentado' && (
            <>
              <Button disabled>Rentado</Button>
              {record.resenia === false && isToday(parseISO(record.fecha_fin_reserva)) && (
                <Button onClick={() => handleWriteReviewClick(record)}>Escribir Reseña del huesped</Button>
              )}
            </>
          )}
          {record.status === 'Cancelado' && (
            <Button disabled>Cancelado</Button>
          )}
           <Button onClick={() => handleWriteReviewClick(record)}>Escribir Reseña del huesped</Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default Rents;
