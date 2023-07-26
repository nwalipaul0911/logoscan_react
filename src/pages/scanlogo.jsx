import React, { useMemo, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
const ScanLogo = () => {
  const webcamRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoSource, setVideoSource] = useState(null);
  const scan = useCallback(() => {
    const mediaStream = webcamRef.current.stream;
    const recorder = new MediaRecorder(mediaStream);
    
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((...prevChunks) => [...prevChunks, event.data]);
      }
    };
    recorder.onstop = () => {
      let videoBlob = new Blob(recordedChunks, { type: "video/webm" });
      let videoUrl = URL.createObjectURL(videoBlob);
      setVideoSource(videoUrl);
      console.log(recordedChunks, videoSource);
    };
    setMediaRecorder(recorder);
    recorder.start();
    setRecording(true);

    setTimeout(() => {
      recorder.stop();
      setRecording(false);
    }, 10000);
  });

  return (
    <>
      <div className="container-fluid bg-danger">
        <ul className="d-flex justify-content-evenly">
          <li className="col-4">
            <select className="bg-danger col-12" defaultValue="Category">
              <option value="Category">Category</option>
            </select>
          </li>
          <li className="col-4">
            <select className="bg-danger col-12" defaultValue="Products">
              <option value="Products">Products</option>
            </select>
          </li>
          <li className="col-4">
            <select className="bg-danger col-12" defaultValue="Brands">
              <option value="Brands">Brands</option>
            </select>
          </li>
        </ul>
      </div>
      <div className="container-fluid pb-5">
        <div className="scan-container">
          {videoSource ? (
            <>
              <video src={videoSource} controls></video>
              <button
                className="btn col-12"
                onClick={() => {
                  setVideoSource(null);
                  setRecordedChunks([]);
                }}
              >
                Rescan <i className="fa-solid fa-reload"></i>
              </button>
            </>
          ) : (
            <>
              <Webcam ref={webcamRef} className="webcam col-12" />
              <button className="btn col-12" onClick={scan}>
                Scan
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ScanLogo;
