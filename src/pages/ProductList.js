import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetail,
  getProducts,
  deleteProducts,
} from "../features/product/productSlice";
import CustomModal from "../components/CustomModal";
import AddProduct from "./AddProduct";

import "./ProductList.scss";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.itemPrice - b.itemPrice,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ROOT = "product-list";

const ProductList = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const productDetail = useSelector((state) => state.product.productDetail);

  const showModal = (type) => {
    if (type) {
      setTypeModal(type);
    }
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (typeModal === "delete") {
      dispatch(deleteProducts(productDetail._id));
    }
  };

  const onSubmit = () => {
    hideModal();
    setTypeModal("");
  };

  const handleClickDetailButton = (event) => (productId) => {
    event.stopPropagation();
    dispatch(getProductDetail(productId)).then(() => showModal("update"));
  };

  const productList = productState.map((product, idx) => {
    return {
      key: idx + 1,
      title: product.title,
      category: product.category.toUpperCase(),
      price: Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(product.price),
      itemPrice: product.price,
      productId: product._id,
      action: (
        <>
          <Button
            onClick={(event) => handleClickDetailButton(event)(product._id)}
          >
            <BiEdit />
          </Button>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              showModal("delete");
            }}
            className="mx-3 d-inline-block"
          >
            <AiFillDelete />
          </Button>
        </>
      ),
    };
  });

  const getTitleModal = () => {
    switch (typeModal) {
      case "create":
        return "Thêm sản phẩm";
      case "update":
        return "Cập nhật sản phẩm";
      case "delete":
        return "Xoá sản phẩm";
      case "detail":
        return "Chi tiết sản phẩm";
      default:
        return "";
    }
  };

  return (
    <>
      <CustomModal
        title={getTitleModal()}
        open={isOpen}
        hideModal={hideModal}
        onConfirm={handleConfirm}
        showFooter={typeModal === "delete"}
      >
        {["create", "update", "detail"].includes(typeModal) ? (
          <AddProduct
            mode={typeModal}
            onSubmit={onSubmit}
            initialValues={typeModal === "create" ? {} : productDetail}
          />
        ) : (
          <p>Bạn có muốn xoá sản phẩm?</p>
        )}
      </CustomModal>
      <div>
        <div className={`${ROOT}-header`}>
          <h3 className="mb-4 title">Danh sách sản phẩm</h3>
          <Button onClick={() => showModal("create")} type="primary">
            Thêm sản phẩm
          </Button>
        </div>
        <div>
          <Table
            columns={columns}
            onRow={(record) => {
              return {
                onClick: () => {
                  dispatch(getProductDetail(record.productId)).then(() =>
                    showModal("detail")
                  );
                },
              };
            }}
            dataSource={productList}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
