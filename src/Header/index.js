import "./styles.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { routeMain as routeMainPage } from "pages/MainPage";
import { routeMain as routeMoviesPage } from "pages/MoviesPage";
import { routeMain as routeLogin } from "pages/Authentication";
import { routeMain as routeFilmsListPage } from "pages/FilmsListPage";
import { routeMain as routeAdminPanelPage } from "pages/AdminPanelPage";
import UserPage from "pages/UserPage";

import useCurrentUser from "../hooks/useCurrentUser";

const Header = () => {
  const { checkPermission, isAuthenticated } = useCurrentUser();
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="mainHeader">
      <div className="title">
        <NavLink to={routeMainPage()} end className="title">
          CinemaXL
        </NavLink>
      </div>
      <nav>
        <NavLink
          to={routeMainPage()}
          end
          className={({ isActive }) => (isActive ? "linkActive" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to={routeMoviesPage()}
          end
          className={({ isActive }) => (isActive ? "linkActive" : "")}
        >
          Movies
        </NavLink>
        {/* <NavLink
          to={routeFilmsListPage()}
          end
          className={({ isActive }) => (isActive ? "linkActive" : "")}
        >
          Бюргер (все что в бургере)
        </NavLink> */}

        {/* TODO ДОБАВИТЬ ФУНКЦИЮ ПРОВЕРКИ РОЛИ ЮЗЕРА И ЧТОБЫ ЮЗЕР ПО РОУТУ ТОЖЕ НЕ СМОГ ЗАЙТИ */}
        {/* currentUser?.role === "ADMIN" */}
        {checkPermission("admin") ? (
          <NavLink
            to={routeAdminPanelPage()}
            end
            className={({ isActive }) => (isActive ? "linkActive" : "")}
          >
            Admin
          </NavLink>
        ) : null}
        {!isAuthenticated() ? (
          <NavLink
            to={routeLogin()}
            end
            className={({ isActive }) => (isActive ? "linkActive" : "")}
          >
            Login
          </NavLink>
        ) : (
          <div className="profile-container">
            <div className="profilBurger" onClick={() => setOpen(!isOpen)}>
              Profil
            </div>
            {/* <div className={`profil ${isOpen ? "active" : ""}`}>
              <UserPage />
            </div> */}
            {isOpen && (
              <div className="profile-dropdown">
                <UserPage />
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
