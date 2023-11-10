import React, { useRef, useEffect, useState } from 'react';
import './residenceReviewStyles.css';
import { Card, Popover } from 'antd';
import Meta from 'antd/es/card/Meta';


function ResidenceReview({ commentResidence, idReview }) {
  const cardRef = useRef(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const isOverflowedValue = cardRef.current.scrollHeight > 150;
      setIsOverflowed(isOverflowedValue);
    }
  }, [commentResidence]);

  return (
    <>
      <Popover
        content={commentResidence}
        trigger={isOverflowed ? "hover" : ""}
      >
        <Card
          className={`review-card ${isOverflowed ? "overflowed" : ""}`}
          ref={cardRef}
        >
          <Meta
            title={`Comentario ${idReview}`}
            description={`${commentResidence}`}
          />
        </Card>
      </Popover>

    </>
  )
}

export default ResidenceReview;