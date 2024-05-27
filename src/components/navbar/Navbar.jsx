import { useState } from "react";
import { useAuth } from "../../context/useAuth.js";
import PropTypes from "prop-types";
import {
  FaTh,
  FaBars,
  FaBook,
  FaRegChartBar,
  FaArchive,
  FaFileAlt,
  FaHouseUser,
} from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ children }) => {
  const { isAuthenticated, logout, user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/educations",
      name: "Educations",
      icon: <FaBook />,
    },
    {
      path: "/projects",
      name: "Projects",
      icon: <FaRegChartBar />,
    },
    {
      path: "/experiences",
      name: "Experiences",
      icon: <FaArchive />,
    },
    {
      path: "/skills",
      name: "Skills",
      icon: <FaFileAlt />,
    },
  ];
  return (
    <>
      {!isAuthenticated ? (
        <>
          <div className="display-none"></div>
        </>
      ) : (
        <>
          <header>
            <nav className="container">
              <section
                style={{ width: isOpen ? "200px" : "50px" }}
                className="sidebar"
              >
                <section className="top_section">
                  <h1
                    style={{ display: isOpen ? "block" : "none" }}
                    className="logo"
                  >
                    Admin
                  </h1>
                  <div
                    style={{ marginLeft: isOpen ? "50px" : "0px" }}
                    className="bars"
                  >
                    <FaBars onClick={toggle} />
                  </div>
                </section>
                <Link to="/" className="user">
                  <div className="icon">
                    <FaHouseUser />
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    Welcome, {user?.username}!
                  </div>
                </Link>
                {menuItem.map((item, index) => (
                  <NavLink to={item.path} key={index} className="link">
                    <div className="icon">{item.icon}</div>
                    <div
                      style={{ display: isOpen ? "block" : "none" }}
                      className="link_text"
                    >
                      {item.name}
                    </div>
                  </NavLink>
                ))}
                <Link
                  className="link link-bottom"
                  to={"/login"}
                  onClick={logout}
                >
                  <div className="icon">
                    <TbLogout2 />
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    Logout
                  </div>
                </Link>
              </section>

              <main>{children}</main>
            </nav>
          </header>
        </>
      )}
    </>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
};
export default Navbar;
