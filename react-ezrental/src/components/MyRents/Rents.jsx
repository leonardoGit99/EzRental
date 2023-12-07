import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, List, Popconfirm, Badge  } from 'antd';
import { useAuth } from '../../contexts/authContext';
import { getAllMyRentalsByUserHost, updateRentalHost } from '../../services/rentals';
import { Link } from 'react-router-dom';
import { format, isToday, parseISO } from 'date-fns';
import './rents.css'
import ModalReviewHost from '../ModalReviewHost/ModalReviewHost'; 

const { Column, ColumnGroup } = Table;

const Rents = () => {
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const { Item } = List;
  const setRefresh = (estado_reserva) => {
    setIsRefresh(estado_reserva);
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
  {
    "id_reserva": 21,
    "id_residencia": 3,
    "precio_total_reserva": 123,
    "fecha_inicio_reserva": "2023-12-08T04:00:00.000Z",
    "fecha_fin_reserva": "2023-12-08T04:00:00.000Z",
    "estado_reserva": "pendiente",
    "titulo_residencia": "Hotel Ecoresort La Colina",
    "tipo_residencia": "Hotel",
    "pais_residencia": "Bolivia",
    "ciudad_residencia": "Cochabamba",
    "id_usuario": 4,
    "nombre_usuario": "Jose Montaño",
    "correo_usuario": "alejomont25@gmail.com",
    "foto_usuario": "https://drive.google.com/uc?id=1Lxk93YjzhtZ-ad7gdGcZBFwbk0TUEoha",
    "tags": [
      "Hotel",
      "Bolivia",
      "Cochabamba"
    ]
  },
  */
 //Importante aun me faltan los datos de estado_reserva y saber si en una residencia ya escribiste su receñia
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
      estado_reserva: reserva.estado_reserva,
      resenia: reserva.resenia,
    }));
    setData(transformedData);
  }, [reservas]);

  const updateRentalestado_reserva = async (record, newestado_reserva) => {
    try {
      const updatedData = {
        estado: newestado_reserva,
        // ... otros campos
      };
      await updateRentalHost(updatedData, record.id_reserva, record.id_residencia);
      console.log(`Estado cambiado a ${newestado_reserva} exitosamente`); //solo para pruebas UwU
      //para incrementar algo mas luego de actualizar como redireccionar o mostrar un mensaje
    } catch (error) {
      console.error(`Error al cambiar el estado a ${newestado_reserva}:`, error);
    }
  };

  const handleConfirmClick = (record) => {
    updateRentalestado_reserva(record, 'alquilado');
  };

  const handleCancelClick = (record) => {
    updateRentalestado_reserva(record, 'cancelado');
  };

  const handleWriteReviewClick = (record) => {
    // Aquí puedes "Escribir Reseña del huesped"
    console.log(`Escribir reseña para la reserva con ID: ${record.id_reserva}`);
    // abrir un modal.
    setSelectedReservation(record);
    setIsReviewModalOpen(true);
  };

  const shouldShowWriteReview = (record) => {
    const today = new Date();
    const endDate = parseISO(record.fecha_fin_reserva);
    if (endDate < today) {
      const daysDifference = Math.floor((today - endDate) / (24 * 60 * 60 * 1000));
      return daysDifference <= 7;
    }
  
    return false;
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
      key: 'estado_reserva',
      align: 'center',
      render: (_, record) => (
        <Badge
      status={
        record.estado_reserva === 'alquilado'
          ? 'success'
          : record.estado_reserva === 'cancelado'
          ? 'error'
          : 'default'
      }
      text={record.estado_reserva}
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
          {record.estado_reserva === 'pendiente' && (
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
          {record.estado_reserva === 'cancelado' && (
            <Button disabled>Cancelado</Button>
          )}
          {record.estado_reserva === 'alquilado' && shouldShowWriteReview(record) && (
        <Button onClick={() => handleWriteReviewClick(record)}>Escribir Reseña del huésped</Button>
          )}          
        </Space>
      ),
    },
  ];
  
  return (
    <div>
    <Table className="table-my-host-rents" dataSource={data} columns={columns} />
    {selectedReservation && (
      <ModalReviewHost
        visible={isReviewModalOpen}
        onCancel={() => setIsReviewModalOpen(false)}
      />
    )}
  </div>
  );
};

export default Rents;
