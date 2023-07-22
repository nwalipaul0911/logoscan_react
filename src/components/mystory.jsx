import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Options from "./templates/options";
const MyStory = () => {
  const [image, setImage] = useState(null);
  const bg_img = image !== null ? `${image}` : "rgba(0,0,0)";
  const navigate = useNavigate()
  const formSubmit = async (e) => {
    e.preventDefault();
    const url = "http://100091.pythonanywhere.com/upload-logo/";
    const logoImage = e.target.image.files[0];
    var formData = new FormData();
    formData.append("image", logoImage);
    const request = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const response = await request.json();
    
    if (request.status == 201) {
      localStorage.setItem("results", JSON.stringify(response.results));
      const imageurl = URL.createObjectURL(logoImage);
      localStorage.setItem("logourl", JSON.stringify(imageurl));
      navigate('/info')
    }
  };
  return (
    <></>
  );
};

export default MyStory;
