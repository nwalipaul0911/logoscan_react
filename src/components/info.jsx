import Options from "./templates/options";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


const Info = () => {
  const [results, setResults] = useState([])
  const [logo, setLogo] = useState('')
  useEffect(()=>{
    const logos = JSON.parse(localStorage.getItem('results'))
    setResults(logos)
    const logo = JSON.parse(localStorage.getItem('logourl'))
    setLogo(logo)
  }, [])
  const image = 'https://picsum.photos/200'
  
  return ( 
    <>
    <div style={{ height: "fit-content", position: "relative", backgroundColor: "rgb(0,0,0)"}}>
      <Options />

      <div className="selected-logo">
        <h2 className="text-light text-center my-4">Logo</h2>
        <img src={logo} alt="" className="img-fluid" />
      </div>
      <div className="container-fluid my-3">
        <div className="row my-5 py-5">
          <h2 className="text-light text-center mb-4">Results</h2>
          {results.map((result, index)=><div key={index} className="col-4"><img src={`${result}`} alt="" className="img-fluid" /></div>)}
        </div>
      </div>

    </div>
    
    </>
   );
}
 
export default Info;