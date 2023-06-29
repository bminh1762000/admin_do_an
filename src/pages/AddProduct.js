import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createProducts,
  resetState,
  updateProduct,
  getProducts,
} from "../features/product/productSlice";

import "./ProductForm.scss";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  category: yup.string().required("Category is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const ROOT = "product-form";

const ProductForm = ({ mode, initialValues, onSubmit }) => {
  const dispatch = useDispatch();
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success(
        `${
          mode === "create" ? "Product Added" : "Product Updated"
        } Successfully!`
      );
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, mode]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      price: initialValues?.price || "",
      category: initialValues?.category || "",
      quantity: initialValues?.quantity ?? 0,
      imageUrl: initialValues?.imageUrl || "",
      ship: initialValues?.ship || false,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (mode === "create") {
        await dispatch(createProducts(values));
      } else {
        await dispatch(
          updateProduct({ product: values, id: initialValues._id })
        );
      }
      onSubmit();
      dispatch(resetState());
      dispatch(getProducts());
    },
  });

  useEffect(() => {
    if (imgState.length > 0) {
      setValues({
        ...formik.values,
        imageUrl: imgState[0].url,
      });
    }
  }, [imgState]);

  const getImgId = (imageUrl) => {
    const imgId = imageUrl.split("/").pop().split(".")[0];
    return imgId;
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = formik;

  const isDisabled = mode === "detail";

  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex gap-2 flex-column">
        <CustomInput
          type="text"
          label="Tên sản phẩm"
          name="title"
          onChange={handleChange("title")}
          onBlr={handleBlur("title")}
          value={values.title}
          error={touched.title && errors.title}
          disabled={isDisabled}
        />
        <CustomInput
          type="textarea"
          label="Mô tả"
          name="description"
          onChange={handleChange("description")}
          onBlr={handleBlur("description")}
          value={values.description}
          error={touched.description && errors.description}
          disabled={isDisabled}
        />
        <div>
          <label>Danh mục</label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChange("category")}
            value={values.category}
            disabled={isDisabled}
          >
            <option>Chọn danh mục</option>
            <option value="hp">HP</option>
            <option value="lenovo">Lenovo</option>
            <option value="dell">Dell</option>
          </select>
        </div>
        <CustomInput
          type="number"
          label="Giá"
          name="price"
          onChange={handleChange("price")}
          onBlr={handleBlur("price")}
          value={values.price}
          error={touched.price && errors.price}
          disabled={isDisabled}
        />
        <CustomInput
          type="number"
          label="Số lượng"
          name="quantity"
          onChange={handleChange("quantity")}
          onBlr={handleBlur("quantity")}
          value={values.quantity}
          error={touched.quantity && errors.quantity}
          disabled={isDisabled}
        />
        {isDisabled && (
          <div className={`${ROOT}-image`}>
            {" "}
            <img src={values.imageUrl} alt="" width={200} height={200} />
          </div>
        )}
        {!isDisabled && (
          <>
            {!values.imageUrl && (
              <div className="border border-secondary border-1 p-5 text-center">
                <Dropzone
                  onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                  maxFiles={1}
                  multiple={false}
                  accept="image/*"
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            )}

            {values.imageUrl && (
              <div className="showimages d-flex flex-wrap gap-2">
                <div className=" position-relative">
                  <button
                    type="button"
                    onClick={() => {
                      setValues({
                        ...formik.values,
                        imageUrl: "",
                      });
                      dispatch(delImg(getImgId(values.imageUrl)));
                    }}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={values.imageUrl} alt="" width={200} height={200} />
                </div>
              </div>
            )}
          </>
        )}
        {!isDisabled && (
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Lưu
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
