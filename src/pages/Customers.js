import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUser } from "../features/cutomers/customerSlice";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  { title: "Status", dataIndex: "status" },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Customers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [id, setId] = useState("");
  const customerState = useSelector((state) => state.customer.customers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const showModal = (type, userId) => {
    if (type) {
      setTypeModal(type);
    }
    setId(userId);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    let isLocked = typeModal === "lock" ? true : false;
    dispatch(updateUser({ userId: id, isLocked: isLocked })).then(() => {
      dispatch(getUsers()).then(() => {
        setIsOpen(false);
      });
    });
  };

  const customerList = customerState.map((customer, idx) => {
    return {
      key: idx + 1,
      name: customer.name,
      email: customer.email,
      status: customer.isLocked ? "Khoá" : "Hoạt động",
      action: (
        <Button
          onClick={() =>
            showModal(customer.isLocked ? "unlock" : "lock", customer._id)
          }
        >
          {customer.isLocked ? "Mở Khoá" : "Khoá"}
        </Button>
      ),
    };
  });
  const titleModal =
    typeModal === "lock"
      ? "Bạn có muốn khoá người dùng này?"
      : "Bạn có muốn mở khoá người dùng này?";

  return (
    <>
      <CustomModal
        open={isOpen}
        hideModal={hideModal}
        onConfirm={handleConfirm}
        title={<p>{titleModal}</p>}
      />
      <div>
        <h3 className="mb-4 title">Người dùng</h3>
        <div>
          <Table columns={columns} dataSource={customerList} />
        </div>
      </div>
    </>
  );
};

export default Customers;
