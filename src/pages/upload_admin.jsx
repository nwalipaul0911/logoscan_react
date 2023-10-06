import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./scanlogo.css";
import { motion, useAnimation } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { modify } from "../slices/resultSlice";
import Dropdown from "../components/dropdown";
const UploadAdmin = () => {
  const url = import.meta.env.VITE_BACKEND_API_URL;
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [category, setCategory] = useState({});
  const [product, setProduct] = useState({});
  const [brand, setBrand] = useState({});
  const dispatch = useDispatch();
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleCurrentImage = (source) => {
    if (typeof source == "string") {
      setCapturedImage(source);
      setSelectedImage(source);
      return;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        setSelectedImage(imageDataURL);
      };
      reader.readAsDataURL(source);
    }
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    handleCurrentImage(imageSrc);
  };
  const clearCapture = () => {
    setCapturedImage(null);
    setSelectedImage(null);
  };

  const sendFile = async () => {
    const formData = new FormData();
    formData.append("image", capturedImage);
    formData.append("category", category?.category);
    formData.append("product", product?.product);
    formData.append("brand", brand?.brand);
    const res = await fetch(`${url}admin-upload-image/`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data.message);
  };
  const handleFileInput = () => {
    fileInputRef.current.click();
  };
  const handleDropdown = (event, func)=>{
    let {name, value} = event.target
    func({[name]: value})
  }

  return (
    <>
      <div className="bg-danger">
        <ul className="d-flex justify-content-evenly">
          <li className="col-4">
            <Dropdown
              dropdown_name="categories"
              query_params={{}}
              control={setCategory}
              value={category.category}
            />
          </li>
          <li className="col-4">
            <Dropdown
              dropdown_name="products"
              query_params={category}
              control={setProduct}
              value={product.product}
            />
          </li>
          <li className="col-4">
            <Dropdown
              dropdown_name="brands"
              query_params={product}
              control={setBrand}
              value={brand.brand}
            />
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          </div>
          <div className="col-md-6">
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={capture}
                      title="Capture"
                    >
                      Capture <i className="fa-solid mx-3 fa-camera"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-dark"
                      onClick={handleFileInput}
                      title="Gallery"
                    >
                      Gallery <i className="fa-solid mx-3 fa-image"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={sendFile}
                      title="Upload"
                    >
                      Upload <i className="fa-solid fa-upload"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      title="Recapture"
                      onClick={clearCapture}
                    >
                      Reset <i className="fa-solid mx-3 fa-arrows-rotate"></i>
                    </button>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="py-2">
                    <input
                      type="text"
                      name="category"
                      id="category"
                      placeholder="Category"
                      className="form-control"
                      onChange={e=>handleDropdown(e, setCategory)}
                      value={category?.category}
                    />
                  </div>
                  <div className="py-2">
                    <input
                      type="text"
                      name="product"
                      id="product"
                      placeholder="Product"
                      className="form-control"
                      onChange={e=>handleDropdown(e, setProduct)}
                      value={product?.product}
                    />
                  </div>
                  <div className="py-2">
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      placeholder="Brand"
                      className="form-control"
                      onChange={e=>handleDropdown(e, setBrand)}
                      value={brand?.brand}
                    />
                  </div>
                  <div className="py-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="image"
                      id="image"
                      placeholder="image"
                      className="form-control"
                      style={{ display: "none" }}
                      onChange={(e) => handleCurrentImage(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center py-3">
                <div className="col-6">
                  <img
                    src={selectedImage}
                    alt=""
                    className="img-fluid"
                    style={{ aspectRatio: 3 / 2 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadAdmin;
