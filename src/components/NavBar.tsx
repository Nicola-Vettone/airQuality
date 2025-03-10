
import { Link } from 'react-router';


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/"></Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/Tools">Tools</Link>
        </li>
        <li>
          <Link to="/3D_models">3D models</Link>
        </li>
        <li>
          <Link to="/AirQuality">Air Quality</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
