import "./styles.scss";
import { NavLink } from "react-router-dom";
import { routeMain as routeMainPage } from "pages/MainPage";
import { routeMain as routeContacts } from "pages/Contacts";
import { routeMain as routeFilmsListPage } from "pages/FilmsListPage";

const Header = () => {
  return (
    <header className="mainHeader">
      <div className="title"> CinemaXL</div>
      <nav>
        <NavLink
          to={routeMainPage()}
          end
          className={({ isActive }) => (isActive ? "linkActive" : "")}
        >
          Главная
        </NavLink>
        <NavLink
          to={routeFilmsListPage()}
          end
          className={({ isActive }) => (isActive ? "linkActive" : "")}
        >
          Бюргер (все что в бургере)
        </NavLink>
        <NavLink
          to={routeContacts()}
          end
          className={({ isActive }) => (isActive ? "linkActive" : "")}
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
