import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <img src={logo} alt="test" />
        </Link>

        <div>
          <span>
            <Link to="/comics">COMICS</Link>
          </span>
          <span>
            <Link to="/">PERSONNAGES</Link>
          </span>
          <span>
            <Link to="/favoris">FAVORIS</Link>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

<nav>
  <p>logo</p>
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/comics">Comics</Link>
    </li>{" "}
    <li>
      <Link to="/favoris">Favoris</Link>
    </li>
  </ul>
</nav>;
