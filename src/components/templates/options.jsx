const Options = () => {
  return ( 
    <>
      <div className="container-fluid bg-danger">
          <ul className="d-flex justify-content-evenly">
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
            <li className="col-4">
              <input
                type="text"
                className="bg-danger col-12"
                placeholder="Story name"
              />
            </li>
          </ul>
        </div>
    </>
   );
}
 
export default Options;