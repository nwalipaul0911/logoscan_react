import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./scanlogo.css";
import { motion, useAnimation } from "framer-motion";
const ScanLogo = () => {
  const webcamRef = useRef(null);
  const constrainRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState(null);
  const [videoSource, setVideoSource] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const url = import.meta.env.VITE_BACKEND_API_URL;
  const [maskShape, setmaskShape] = useState("square");
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [axiss, setAxiss] = useState(false);
  const [preview, setPreview] = useState(false);
  const scanControls = useAnimation();
  const mask_styles = {
    square: {
      padding: `${x}px`,
      aspectRatio: 1 / 1,
    },
    circle: {
      padding: `${x}px`,
      borderRadius: "50%",
      aspectRatio: 1 / 1,
    },
    ellipse: {
      padding: `${y}px ${x}px`,
      height: `${y}px`,
      minpadding: "100px",
      minHeight: "100px",
      borderRadius: "50%",
    },
  };

  useEffect(() => {
    getDropdownData();
  }, []);
  const getDropdownData = async () => {
    let res = await fetch(`${url}/dropdown-menu-data`);
    if (res.status == 200) {
      let data = await res.json();
      setCategories(data.categories);
      setProducts(data.products);
      setBrands(data.brands);
    }
  };
  useEffect(() => {
    if (recordedChunks) {
      let videoBlob = new Blob(recordedChunks, { type: "video/webm" });
      let videoUrl = URL.createObjectURL(videoBlob);
      setVideoSource(videoUrl);
      sendFile();
    }
  }, [recordedChunks]);
  const scan = () => {
    const mediaStream = webcamRef.current.stream;
    const recorder = new MediaRecorder(mediaStream);
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks([event.data]);
      }
    };
    setMediaRecorder(recorder);
    recorder.start();
    setRecording(true);
    scanControls.start("animated");

    setTimeout(() => {
      recorder.stop();
      setRecording(false);
      scanControls.start("normal");
    }, 10000);
  };
  const stopScanning = () => {
    mediaRecorder.stop();
  };
  const sendFile = async () => {
    const formData = new FormData();
    formData.append("video", recordedChunks[0]);
    const res = await fetch(`${url}/VideoUploadView/?video`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div className="bg-danger">
        <ul className="d-flex justify-content-evenly">
          <li className="col-4">
            <select className="bg-danger col-12" defaultValue="Category">
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </li>
          <li className="col-4">
            <select className="bg-danger col-12" defaultValue="Products">
              {products.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </li>
          <li className="col-4">
            <select className="bg-danger col-12" defaultValue="Brands">
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
      <div className="container" style={{ height: "fit-content" }}>
        <div className="row g-0">
          <div className="col-md-6">
            <div
              className="position-relative view-container mx-auto bg-dark"
              ref={constrainRef}
            >
              {preview ? (
                <video src={videoSource} controls></video>
              ) : (
                <>
                  <Webcam ref={webcamRef} />
                  <motion.i
                    drag
                    dragConstraints={constrainRef}
                    dragElastic={0}
                    dragMomentum={false}
                    className="mask fa-solid fa-plus axis-center"
                    style={mask_styles[maskShape]}
                  ></motion.i>
                </>
              )}
            </div>
          </div>
          <div className="mx-auto controls-container col-md-6">
            <div className="row">
              <div className="col">
                <ul>
                  <button
                    className={`btn btn-${recording ? "info" : "success"}`}
                    onClick={() => scan()}
                    title="Scan"
                  >
                    <motion.i
                      variants={{
                        animated: {
                          scale: [1, 0.7, 1, 0.7, 1, 0.7, 1, 0.7, 1],
                        },
                        normal: { scale: 1 },
                      }}
                      animate={scanControls}
                      initial={{ scale: 1 }}
                      transition={{ type: "tween", duration: 10 }}
                      className="fa-solid fa-magnifying-glass"
                    ></motion.i>
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setPreview(false);
                      setRecordedChunks(null);
                    }}
                    title="Rescan"
                  >
                    <i className="fa-solid fa-arrows-rotate"></i>
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      videoSource ? setPreview(true) : setPreview(false)
                    }
                    title="Preview"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </ul>
              </div>
              <div className="col-10">
                <div className="row g-0">
                  <div className="col">
                    <label htmlFor="shapes">Shapes:</label>
                  </div>
                  <div className="col-9">
                    <select
                      name="shapes"
                      id="shapes"
                      value={maskShape}
                      onChange={(e) => setmaskShape(e.target.value)}
                    >
                      <option value="square">Square</option>
                      <option value="circle">Circle</option>
                      <option value="ellipse">Eclipse</option>
                    </select>
                    <div className="col-12 my-2">
                      <div className="div">
                        <label htmlFor="x_axis">X-axis</label>
                      </div>
                      <div className="div">
                        <input
                          type="range"
                          name="x_axis"
                          id="x_axis"
                          className="col-6"
                          value={x}
                          min={50}
                          max={130}
                          onMouseDown={() => setAxiss(true)}
                          onMouseUp={() => setAxiss(false)}
                          onChange={(e) => {
                            setX(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      {maskShape == "ellipse" && (
                        <>
                          <div className="div">
                            <label htmlFor="y_axis">Y-axis</label>
                          </div>
                          <div className="div">
                            <input
                              type="range"
                              name="y_axis"
                              id="y_axis"
                              className="col-6"
                              value={y}
                              min={50}
                              max={130}
                              onChange={(e) => setY(e.target.value)}
                              onMouseDown={() => setAxiss(true)}
                              // onMouseUp={() => setAxiss(false)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScanLogo;
