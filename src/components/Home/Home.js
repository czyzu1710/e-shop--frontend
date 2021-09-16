import { useEffect, useState } from "react";
import "./Home.scss";
import MenuItem from "../../common/HomeMenuItem/MenuItem";
import jacket from "../../images/jacket.jpg";
import trousers from "../../images/trousers.jpg";
import tshirt from "../../images/tshirt.jpg";
import AuthService from "../../services/auth";
import AdminWelcome from "../admin/AdminWelcome";
import {useLocation} from "react-router-dom";

const Home = () => {
  const [menuElements, setMenuElements] = useState({});
  const [sex, setSex] = useState({});
  const location = useLocation()
  useEffect(() => {

    const query = new URLSearchParams(location.search);
    console.log(query)
    const paramEmail = query.get("email");
    const paramAuth = query.get("authenticator");
    if (paramEmail) {
      document.cookie = `email=${paramEmail}; path=/`;
      document.cookie = `oAuth=true; path=/`;
      if (paramAuth != null) {
        document.cookie = `authenticator=${decodeURIComponent(
            paramAuth
        ).replaceAll(" ", "+")}; path=/`;
      }
      window.location.href = "/product";
    }

    console.log(paramAuth)
    console.log(paramEmail)
  }, []);

  useEffect(() => {
    setSex({
      ...sex,
      sex: [
        {
          title: "Kobiety",
          link: "/product?sex=women",
          image: "https://i.ibb.co/GCCdy8t/womens.png",
          id: 1,
          size: "large",
        },
        {
          title: "Mężczyźni",
          link: "/product?sex=men",
          image: "https://i.ibb.co/R70vBrQ/men.png",
          id: 2,
          size: "large",
        },
      ],
    });

    setMenuElements({
      ...menuElements,
      sections: [
        {
          title: "Spodnie",
          link: "/product?category=spodnie",
          image: trousers,
          id: 1,
        },
        {
          title: "t-shirt",
          link: "/product?category=t-shirt",
          image: tshirt,
          id: 2,
        },
        {
          title: "Kurtki",
          link: "/product?category=kurtki",
          image: jacket,
          id: 3,
        },
      ],
    });
  }, []); // eslint-disable-line

  return (
    <div className="homepage">
      <div className="directory-menu">
        {AuthService.getUser() && AuthService.getUser()["role"] === "ADMIN" ? (
          <div className="directory-menu-admin">
            <AdminWelcome />
          </div>
        ) : (
          <>
            {menuElements.sections ? (
              menuElements.sections.map(({ title, image, id, size, link }) => (
                <MenuItem
                  key={id}
                  title={title}
                  image={image}
                  size={size}
                  linkUrl={link}
                />
              ))
            ) : (
              <span>Loading...</span>
            )}

            {sex.sex ? (
              sex.sex.map(({ title, image, id, size, link }) => (
                <MenuItem
                  key={id}
                  title={title}
                  image={image}
                  size={size}
                  linkUrl={link}
                />
              ))
            ) : (
              <span>Loading...</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
