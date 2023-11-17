import React, { useEffect, useState } from 'react';
import { Divider, List, Empty } from 'antd';
import { ExclamationCircleOutlined, StarFilled } from '@ant-design/icons';
import ResidenceReview from '../ResidenceReview/ResidenceReview';
import './reviewsListStyles.css';

function ReviewsList({ detailReviews, isRefresh, setRefresh }) {
  const [averageRates, setAverageRates] = useState(0);
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
              No existen Reseñas
            </span>
          }
        >
        </Empty>
      </>),
  };

  const averageAllRates = () => {
    const allRates = detailReviews.map((reviewResidence) => reviewResidence.calificacion);
    if (allRates.length === 0) {
      return 0;
    }
    const sumOfRates = allRates.reduce((total, num) => total + num, 0);
    const average = parseFloat((sumOfRates / allRates.length).toFixed(1));
    setAverageRates(average);
    return average;
  }

  useEffect(() => {
    averageAllRates();
  }, [detailReviews])

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Reseñas (<StarFilled /> {averageRates} )</h2>
      <List
        grid={{
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2
        }}
        pagination={{
          onChange: page => {
            console.log(page);
          }, pageSize: 8,
        }}
        locale={customEmptyMessage}
        dataSource={detailReviews}
        renderItem={(review) => (
          <List.Item
            className="reviews-list"
          >
            <ResidenceReview
              idReview={review.id_evaluacion}
              commentResidence={review.comentario}
              rate={review.calificacion}
              reviewOwner={review.nombre_usuario}
              isRefresh={isRefresh}
              setRefresh={setRefresh}
            />
          </List.Item>
        )}
      />
      <Divider />
    </>
  )
}

export default ReviewsList;