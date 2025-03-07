import imgLogin from "../assets/img.svg";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="image-section">
        <img className="imgLogin" src={imgLogin} alt="Login" />
      </div>
      <div className="form-section">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
