import React from "react";
import { Button, Modal } from "antd";

const CustomModal = ({
  open,
  hideModal,
  onConfirm,
  title,
  children,
  confirmText,
  showFooter = true,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={hideModal}
      footer={
        showFooter
          ? [
              <Button key="back" onClick={hideModal}>
                {"Huỷ"}
              </Button>,
              <Button type="primary" onClick={onConfirm}>
                {confirmText || "Xác nhận"}
              </Button>,
            ]
          : null
      }
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
