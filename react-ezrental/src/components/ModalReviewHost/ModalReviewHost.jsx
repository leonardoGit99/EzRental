import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import AddReview from '../AddReview/AddReview';

const ModalReviewHost = ({ visible, onCancel}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal title="Escribir Reseña del Huésped" visible={visible} onCancel={onCancel} footer={null}>
      <div style={{ width: '100%' }}>
        <AddReview />
      </div>
    </Modal>
    </>
  );
};
export default ModalReviewHost;