import React, { useState, useEffect } from 'react';
import { Rate, Form, Input, Button, message, Divider } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { createReviewResidence } from '../../services/reviews';
import { useAuth } from "../../contexts/authContext";
import dayjs from 'dayjs';
import './addReviewStyles.css';

function AddReview({ isRefresh, setRefresh, idAd, rentals, sevenDaysCompleted }) {
  const { user } = useAuth();
  const [form] = useForm();
  const [ratingCleaning, setRatingCleaning] = useState(null);
  const [ratingPromise, setRatingPromise] = useState(null);
  const [ratingComunication, setRatingComunication] = useState(null);
  const [bodyReview, setBodyReview] = useState({
    limpieza: null,
    exactitud: null,
    comunicacion: null,
    comentario: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBodyReview((prevBodyReview) => ({
      ...prevBodyReview, [name]: value,
    }));
  }

  const handleRatingChange = (value, name) => {
    if (name==="limpieza"){
      setRatingCleaning(value);
    } else if (name === "exactitud") {
      setRatingPromise(value);
    } else {
      setRatingComunication(value);
    }
    setBodyReview((prevBodyReview) => ({
      ...prevBodyReview, [name]: value,
    }))
  }

  //limpieza
  //exactitud
  //comunicacion
  //comentario
  // console.log(bodyReview);
  const onFinish = async () => {
    await createReviewResidence(bodyReview, idAd, user.uid);
    setRatingCleaning();
    setRatingPromise();
    setRatingComunication();
    setBodyReview({ limpieza: null, exactitud:null, comunicacion:null, comentario: "", });
    message.success('Reseña enviada exitosamente!');
    setRefresh(true);
  }

  const onCancel = () => {
    setRatingCleaning();
    setRatingPromise();
    setRatingComunication();
    setBodyReview({ limpieza: null, exactitud:null, comunicacion:null, comentario: "", });
  }

  useEffect(() => {
    form.setFieldsValue(bodyReview);
  }, [bodyReview]);

  return (
    <>
      {
        /* rentals && rentals.some((rental) => {
          return (rental.nombre_usuario === user.displayName) && (dayjs(rental.fecha_fin_reserva).isBefore(dayjs(rental.fecha_fin_reserva).add(1, 'days')))
        }) */
        sevenDaysCompleted === true
          ?
          <>
            <div className="review-form-container">
              <Form
                name="review-form"
                autoComplete="off"
                form={form}
                onFinish={onFinish}
              >
                <h2>Cuéntanos sobre tu experiencia!</h2>
                <Form.Item
                  name="limpieza"
                  rules={[{ required: true, message: 'No olvide calificar su experiencia' }]}
                >
                  <h3>Limpieza</h3>
                  <Rate
                    name="limpieza"
                    value={ratingCleaning}
                    onChange={(value) => handleRatingChange(value, "limpieza")}
                  />
                </Form.Item>

                <Form.Item
                  name="exactitud"
                  rules={[{ required: true, message: 'No olvide calificar su experiencia' }]}
                >
                  <h3>Exactitud de lo ofrecido con lo encontrado</h3>
                  <Rate
                    name="exactitud"
                    value={ratingPromise}
                    onChange={(value) => handleRatingChange(value, "exactitud")}
                  />
                </Form.Item>

                <Form.Item
                  name="comunicacion"
                  rules={[{ required: true, message: 'No olvide calificar su experiencia' }]}
                >
                  <h3>Comunicación</h3>
                  <Rate
                    name="comunicacion"
                    value={ratingComunication}
                    onChange={(value) => handleRatingChange(value, "comunicacion")}
                  />
                </Form.Item>

                <div className="comment-btns-container" >
                  <Form.Item
                    name="comentario"
                    rules={[{ required: true, message: "No olvide dejar su comentario" }]}
                  >
                    <h3>Agregar Comentario: </h3>
                    <Input.TextArea
                      name="comentario"
                      placeholder="Ingrese un comentario acerca de su experiencia..."
                      value={bodyReview.comentario}
                      autoSize={{ minRows: 5, maxRows: 5 }}
                      maxLength={200}
                      showCount
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  {
                    (bodyReview.limpieza && bodyReview.exactitud && bodyReview.comunicacion && bodyReview.comentario) && (
                      <Form.Item>
                        <div className="btns-container">
                          <div>
                            <Button type="primary" htmlType="submit" style={{ margin: '0' }}>
                              Enviar Reseña
                            </Button>
                          </div>
                          <div>
                            <Button htmlType="button" onClick={onCancel} style={{ margin: '0' }}>
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </Form.Item>
                    )
                  }
                </div>
              </Form>
            </div>
            <Divider />
          </>
          : null
      }

    </>
  )
}

export default AddReview;