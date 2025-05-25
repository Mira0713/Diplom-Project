import "./styles.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Header from "Header";
import Footer from "Footer";
import MainPage, { routeMain as routeMainPage } from "pages/MainPage";
import Contacts, { routeMain as routeContacts } from "pages/Authentication";
import FilmsDetail, { routeMain as routeFilmsDetail } from "pages/FilmsDetail";
import FilmsListPage, {
  routeMain as routeFilmsListPage,
} from "pages/FilmsListPage";
import AdminPanelPage, {
  routeMain as routeAdminPanelPage,
} from "pages/AdminPanelPage";
import useCurrentUser from "../hooks/useCurrentUser";

const AppContent = () => {
  const { authUser } = useCurrentUser();

  useEffect(() => {
    authUser();
  }, []);

  return (
    <div className="mainWrapper">
      <Header />
      <main>
        <Routes>
          <Route path={routeMainPage()} element={<MainPage />} />
          <Route path={routeContacts()} element={<Contacts />} />
          <Route path={routeFilmsDetail()} element={<FilmsDetail />} />
          <Route path={routeFilmsListPage()} element={<FilmsListPage />} />
          <Route path={routeAdminPanelPage()} element={<AdminPanelPage />} />
          <Route path="*" element={<Navigate to={routeMainPage()} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppContent;
