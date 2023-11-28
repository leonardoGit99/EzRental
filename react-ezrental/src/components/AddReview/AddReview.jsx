import React, { useState, useEffect } from 'react';
import { Rate, Form, Input, Button, message, Divider } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { createReviewResidence } from '../../services/reviews';
import { useAuth } from "../../contexts/authContext";
import dayjs from 'dayjs';
import './addReviewStyles.css';

function AddReview({ isRefresh, setRefresh, idAd, rentals }) {
  const { user } = useAuth();
  const [form] = useForm();
  const [rating, setRating] = useState(null);
  const [bodyReview, setBodyReview] = useState({
    calificacionLimpieza: null,
    comentario: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBodyReview((prevBodyReview) => ({
      ...prevBodyReview, [name]: value,
    }));
  }

  const handleRatingChange = (value, name) => {
    setRating(value);
    setBodyReview((prevBodyReview) => ({
      ...prevBodyReview, [name]: value,
    }))
  }
  const onFinish = async () => {
    await createReviewResidence(bodyReview, idAd, user.uid);
    setRating();
    setBodyReview({ calificacion: null, comentario: "", });
    message.success('Reseña enviada exitosamente!');
    setRefresh(true);
  }

  const onCancel = () => {
    setRating();
    setBodyReview({ calificacion: null, comentario: "", });
  }

  useEffect(() => {
    form.setFieldsValue(bodyReview);
  }, [bodyReview]);

  return (
    <>
      {
        rentals && rentals.some((rental) => {
          return (rental.nombre_usuario === user.displayName) && (dayjs(rental.fecha_fin_reserva).isBefore(dayjs(rental.fecha_fin_reserva).add(1, 'days')))
        })
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
                  name="calificacion"
                  rules={[{ required: true, message: 'No olvide calificar su experiencia' }]}
                >
                  <h3>Calificar</h3>
                  <Rate
                    name="calificacion"
                    value={rating}
                    onChange={(value) => handleRatingChange(value, "calificacion")}
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
                      maxLength={650}
                      showCount
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  {
                    (bodyReview.calificacion && bodyReview.comentario) && (
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