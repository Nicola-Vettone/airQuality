import imgLogin from "../assets/img.svg";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <img className="imgLogin" src={imgLogin} alt="Login" />

      <div className="form-section">
        <div>
          <h2>Ciao!</h2>
          <h2>Bentornato!</h2>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <p>Hai dimenticato la password?</p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
