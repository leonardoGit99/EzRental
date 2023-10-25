import React, { useEffect, useState } from 'react';
import { Carousel, Image } from 'antd';
import './detailImgsStyles.css';

function DetailImgs({ images }) {
  console.log(images);
  return (
    <div className="img-flex-container">
      <div className="img-container">
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          <Carousel
            className="carousel-detail-img"
            autoplay
            effect="fade"
          >
            {images && images.map((image) => (
              <div>
                <Image
                  className="carousel-detail__img"
                  src={image}
                  alt="Algo salió mal..." 
                />
              </div>
            ))}
          </Carousel>
        </Image.PreviewGroup>
      </div>
    </div>
  )
}

export default DetailImgs;