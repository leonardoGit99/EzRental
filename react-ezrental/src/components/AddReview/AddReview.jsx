import React, { useState, useEffect } from 'react';
import { Rate, Form, Input, Button, message, Divider } from 'antd';
import { useForm } from 'antd/es/form/Form';
import './addReviewStyles.css';

function AddReview({ isRefresh, setRefresh, idAd }) {
  ;
  const [form] = useForm();
  const [rating, setRating] = useState(null);
  const [bodyReview, setBodyReview] = useState({
    rate: null,
    comment: "",
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
    console.log(bodyReview, idAd);
    await createCommentResidence(bodyReview, idAd);
    setRating();
    setBodyReview({ rate: null, comment: "", });
    message.success('Reseña enviada exitosamente!');
    setRefresh(true);
  }

  const onCancel = () => {
    setRating();
    setBodyReview({ rate: null, comment: "", });
  }

  useEffect(() => {
    form.setFieldsValue(bodyReview);
  }, [bodyReview]);

  return (
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
            name="rate"
            rules={[{ required: true, message: 'No olvide calificar su experiencia' }]}
          >
            <h3>Calificar</h3>
            <Rate
              name="rate"
              value={rating}
              onChange={(value) => handleRatingChange(value, "rate")}
            />
          </Form.Item>

          <div className="comment-btns-container" >
            <Form.Item
              name="comment"
              rules={[{ required: true, message: "No olvide dejar su comentario" }]}
            >
              <h3>Agregar Comentario: </h3>
              <Input.TextArea
                name="comment"
                placeholder="Ingrese un comentario acerca de su experiencia..."
                value={bodyReview.comment}
                autoSize={{ minRows: 5, maxRows: 5 }}
                maxLength={650}
                showCount
                onChange={handleInputChange}
              />
            </Form.Item>
            {
              (bodyReview.rate && bodyReview.comment) && (
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
  )
}

export default AddReview;