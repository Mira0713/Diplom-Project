import "./styles.scss";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "Header";
import Footer from "Footer";
import MainPage, { routeMain as routeMainPage } from "pages/MainPage";
import Contacts, { routeMain as routeContacts } from "pages/Contacts";
import FilmsDetail, { routeMain as routeFilmsDetail } from "pages/FilmsDetail";
import FilmsListPage, {
  routeMain as routeFilmsListPage,
} from "pages/FilmsListPage";

const AppContent = () => {
  return (
    <div className="mainWrapper">
      <Header />
      <main>
        <Routes>
          <Route path={routeMainPage()} element={<MainPage />} />
          <Route path={routeContacts()} element={<Contacts />} />
          <Route path={routeFilmsDetail()} element={<FilmsDetail />} />
          <Route path={routeFilmsListPage()} element={<FilmsListPage />} />
          <Route path="*" element={<Navigate to={routeMainPage()} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppContent;
