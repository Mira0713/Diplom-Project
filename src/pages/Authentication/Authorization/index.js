import "./styles.scss";
import { useState } from "react";

const Authorization = ({ title }) => {
  const [activeTab, setActiveTab] = useState("Auth");
  return (
    <div className="authentication">
      <form className="authenticationForm">
        <div className="authenticationTitle">
          {activeTab === "Auth" ? "Authorization" : "Registration"}
        </div>
        <div>
          <div className="authenticationDescription">
            Required fields are marked *
          </div>
          <div className="usersInputs">
            <input type="text" id="username" placeholder="login*" />
            <input type="email" id="email" placeholder="example@example.com*" />
            <input
              type="password"
              id="password"
              placeholder="Password*"
              required
            />
            {activeTab === "Registr" ? (
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password*"
                required
              />
            ) : null}
          </div>
        </div>
        <div className="authenticationFormButton">
          <button className="">
            {activeTab === "Auth" ? "Authorization" : "Registration"}
          </button>
        </div>
        {activeTab === "Auth" ? (
          <div onClick={() => setActiveTab("Registr")} className="activeTab">
            No account yet
          </div>
        ) : (
          <div onClick={() => setActiveTab("Auth")} className="activeTab">
            Have already account
          </div>
        )}
      </form>
    </div>
  );
};

export default Authorization;
