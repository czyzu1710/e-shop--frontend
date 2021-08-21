import React from "react";
import "./MenuItem.scss";
import { useHistory } from "react-router-dom";

const MenuItem = ({ title, image, size, linkUrl, store = true }) => {
  const history = useHistory();
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => history.push(`${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        {store ? <span className="subtitle">KUPUJ</span> : ""}
      </div>
    </div>
  );
};

export default MenuItem;
