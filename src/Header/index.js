import "./styles.scss";
import { NavLink } from "react-router-dom";
import { routeMain as routeMainPage } from "pages/MainPage";
import { routeMain as routeLogin } from "pages/Authentication";
import { routeMain as routeFilmsListPage } from "pages/FilmsListPage";
import { routeMain as routeAdminPanelPage } from "pages/AdminPanelPage";

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
          to={routeLogin()}
          end
          className={({ isActive }) => (isActive ? "linkActive" : "")}
        >
          Login
        </NavLink>
        <NavLink // TODO ДОБАВИТЬ ФУНКЦИЮ ПРОВЕРКИ РОЛИ ЮЗЕРА И ЧТОБЫ ЮЗЕР ПО РОУТУ ТОЖЕ НЕ СМОГ ЗАЙТИ
          to={routeAdminPanelPage()}
          end
          className={({ isActive }) => (isActive ? "linkActive" : "")}
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
