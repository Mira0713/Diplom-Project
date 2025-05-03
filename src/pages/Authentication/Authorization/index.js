import { registration, login } from "../../../http/userApi";
import "./styles.scss";
import { useState } from "react";

const Authorization = () => {
  const [activeTab, setActiveTab] = useState("Auth");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async (e) => {
    console.log(e);
    e.preventDefault();
    if (activeTab === "Auth") {
      const response = await login(name, email, password);
      console.log(response);
    } else {
      const response = await registration(name, email, password);
      console.log(response);
    }
  };
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
            <input
              type="text"
              id="username"
              placeholder="login*"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              id="email"
              placeholder="example@example.com*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="Password*"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button onClick={click}>
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
