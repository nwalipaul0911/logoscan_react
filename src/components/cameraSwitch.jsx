import { useEffect, useState } from "react";

const CameraSwitch = () => {
  const [selectedCam, setSelectedCam] = useState(detectOperatingSystem());
  function detectOperatingSystem() {
    const platform = navigator.platform;
    if (
      platform.includes("Win") ||
      platform.includes("Mac") ||
      platform.includes("Linux")
    ) {
      return("user");
    } else if (
      platform.includes("iPhone") ||
      platform.includes("iPad") ||
      platform.includes("iPod") ||
      platform.includes("Android")
    ) {
      return("environment");
    } else {
      return("user");
    }
  }
  useEffect(()=>{
    handleSwitchCamera()
  }, [selectedCam])

  const handleSwitchCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: selectedCam },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="btn btn-sm btn-dark me-3"
      onClick={() => setSelectedCam(selectedCam == "user" ? "environment" : "user")}
      title="Switch camera"
    >
      <i className="fa-solid fa-camera-rotate"></i>
    </button>
  );
};

export default CameraSwitch;
