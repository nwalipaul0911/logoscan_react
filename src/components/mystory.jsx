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
    <div style={{ height: "80vh", position: "relative", background: bg_img }}>
      <Options />
      <ul className="ms-1" style={{ position: "absolute" }}>
        <li>
          <i className="fa-solid fa-camera text-light btn btn-danger py-2 my-1"></i>
        </li>
        <li>
          <i className="fa-solid fa-camera text-light btn btn-danger py-2 my-1"></i>
        </li>
      </ul>
      <ul className="ms-1" style={{ position: "absolute", top: "50vh" }}>
        <li>
          <i className="fa-solid fa-share-nodes text-light"></i>
        </li>
        <li>
          <i className="fa-solid fa-camera text-light"></i>
        </li>
        <li>
          <i className="fa-solid fa-keyboard text-light"></i>
        </li>
        <li>
          <i className="fa-solid fa-image text-light"></i>
        </li>
      </ul>
      <div className="bg-light rounded brand-name-container">
        <form onSubmit={(e) => formSubmit(e)}>
          <input
            type="file"
            name="image"
            className="rounded brand-name col-9"
            placeholder="Brand-Name"
          />
          <button
            type="submit"
            className="text-light btn btn-secondary my-1 me-2"
          >
            <i className="fa-solid fa-floppy-disk"></i>
          </button>
          <button className="btn btn-danger text-light my-1 ">
            <i className="fa-solid fa-camera"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyStory;
