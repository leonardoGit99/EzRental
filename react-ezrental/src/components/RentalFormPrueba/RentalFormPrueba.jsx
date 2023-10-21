import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditingRentalForm } from '../../store/slices/editRentalFormSlice';
import { getOneResidence, updateResidence } from "../../services/residences";

function RentalFormPrueba() {
  let { id } = useParams();
  const isEdit = useSelector((state) => state.editRentalForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [body, setBody] = useState({});
  const [dataAd, setDataAd] = useState([]);

  //Adjunta nombre, valor de los inputs
  const handleBodyChange = (evt) => {
    setBody({
      ...body,
      [evt.target.name]: evt.target.value
    })
  };

  function fetchStaticDataAdId() {
    setDataAd(ad);
  }

  isEdit ? (
    useEffect(() => {
      fetchStaticDataAdId();
      // getOneResidence(id).then((data)=>setDataAd(data);
    }, []),

    useEffect(() => {
      // Cambiar el estado global a falso cuando se presiona el botón atrás del navegador
      window.addEventListener('popstate', () => {
        dispatch(setIsEditingRentalForm(false));
      });
      // Limpiar el evento cuando el componente se desmonte
      return () => {
        window.removeEventListener('popstate', () => {
        });
      };
    }, [dispatch])
  ) : null

  const handleSubmit = () => {
    const formData = new FormData(); //body para enviar a backend
    isEdit ? (
      formData.append("nombre", body.nombre),
      formData.append("descripcion", body.descripcion),
      console.log("Simulando Peticion Put"),
      // updateResidence(body, id);
      console.log(body),
      dispatch(setIsEditingRentalForm(false)),
      navigate("/mis-anuncios"),
      message.success("Modificación exitosa!")
    ) :
      (
        console.log("Peticion Post")
      )
  };

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


  return (
    <>
      <Form layout="vertical">
        <Form.Item label="Titulo">
          <Input name="titulo" value={dataAd.titulo_residencia} disabled={isEdit} onChange={handleBodyChange} />
        </Form.Item>
        <Form.Item label="Descripción">
          <Input name="descripcion" value={body.descripcion} onChange={handleBodyChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RentalFormPrueba;