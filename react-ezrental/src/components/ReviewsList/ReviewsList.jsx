import React from 'react';
import { Divider, List } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ResidenceReview from '../ResidenceReview/ResidenceReview';
import './reviewsListStyles.css';

function ReviewsList({ detailReviews, isRefresh, setRefresh }) {
  const customEmptyMessage = {
    emptyText: (
      <div>
        <ExclamationCircleOutlined /><br />
        No existen comentarios
      </div>),
  };

  console.log(detailReviews);
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Reseñas</h2>
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
        dataSource={detailReviews && detailReviews.review}
        renderItem={(review) => (
          <List.Item
            className="reviews-list"
          >
              <ResidenceReview
                idReview={review.idReview}
                commentResidence={review.comment}
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