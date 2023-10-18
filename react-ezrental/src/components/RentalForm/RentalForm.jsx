import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditing } from '../../store/slices/editSlice';
import './rentalFormStyles.css';

function RentalForm() {
  let { id } = useParams();
  const isEdit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  // const [isEdit, setIsEdit] = useState(false);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleSubmit = () => {
    isEdit ? (
      console.log("Simulando Peticion Put"),
      dispatch(setIsEditing(false)),
      navigate("/mis-anuncios"),
      message.success("Modificación exitosa!")
    ) :
      (
        axios.post("/api/guardarDatos", { nombre, descripcion })
          .then((response) => {
            // Manejar la respuesta del servidor aquí
            console.log(response.data);
          })
          .catch((error) => {
            // Manejar errores aquí
            console.error(error);
          })
      )
  };




  return (
    <>
      <Form layout="vertical">
        <Form.Item label="Nombre">
          <Input value={isEdit ? id : nombre} onChange={handleNombreChange} />
        </Form.Item>
        <Form.Item label="Descripción">
          <Input value={descripcion} onChange={handleDescripcionChange} />
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

export default RentalForm;