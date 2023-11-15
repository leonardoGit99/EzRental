import React, { useRef, useEffect, useState } from 'react';
import './residenceReviewStyles.css';
import { Card, Popover, Rate } from 'antd';
import Meta from 'antd/es/card/Meta';


function ResidenceReview({ commentResidence, idReview, rate, reviewOwner }) {
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
            title={`Reseña de ${reviewOwner}`}
            description=
            {
              <>
                <Rate
                  style={{}}
                  disabled
                  defaultValue={rate}
                />
                <p>{commentResidence}</p>
              </>
            }
          />
        </Card>
      </Popover>

    </>
  )
}

export default ResidenceReview;