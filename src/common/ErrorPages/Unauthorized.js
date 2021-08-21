import { Link } from "react-router-dom";
import "./Error.css";

const Unauthorized = () => (
  <div className="error-wrapper un-error">
    <div className="error-wrapper-center">
      <span>
        <h1>401 - Unauthorized!</h1>
        <Link to="/" className="error-link">
          Go Home
        </Link>
      </span>
    </div>
  </div>
);

export default Unauthorized;
