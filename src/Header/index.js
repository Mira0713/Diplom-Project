import "./styles.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { routeMain as routeMainPage } from "pages/MainPage";
import { routeMain as routeLogin } from "pages/Authentication";
import { routeMain as routeFilmsListPage } from "pages/FilmsListPage";
import { routeMain as routeAdminPanelPage } from "pages/AdminPanelPage";
import UserPage from "pages/UserPage";
import Avatar from "../assets/img/bob.jpg";
// import { useContext } from "react";
// import { CurrentUserContext } from "../components/App";
import useCurrentUser from "../hooks/useCurrentUser";

const Header = () => {
  // const { currentUser } = useContext(CurrentUserContext);
  const { checkPermission, isAuthenticated } = useCurrentUser();
  const [isOpen, setOpen] = useState(false);

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
              profil
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
