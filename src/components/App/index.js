import AppContent from "AppContent";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createContext, useState } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CurrentUserContext = createContext(null);

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      <ToastContainer />
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </>
  );
};

export { CurrentUserContext };
export default App;
