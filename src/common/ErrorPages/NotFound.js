import { Link } from "react-router-dom";
import "./Error.css";

const NotFound = () => (
  <div className="error-wrapper">
    <div className="error-wrapper-center">
      <span>
        <h1>404 - Not Found!</h1>
        <Link to="/" className="error-link">
          Go Home
        </Link>
      </span>
    </div>
  </div>
);

export default NotFound;
