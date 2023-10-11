const Login = () => {
  return (
    <div className="container-fluid form-container">
      <form action="">
        <div className="pt-4 col-12">
          <h4>Login</h4>
        </div>
        <div className="py-3 col-12">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="form-control"
          />
        </div>
        <div className="py-3 col-12">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="form-control"
          />
        </div>
        <div className="py-3 col-12">
          <input type="submit" value="Login" className="btn form-control btn-secondary" />
        </div>
      </form>
    </div>
  );
};

export default Login;
