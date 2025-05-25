import "./styles.scss";
import { registration, login } from "../../../http/userApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeMain as routeMainPage } from "pages/MainPage";
import { toast, Bounce } from "react-toastify";
import useCurrentUser from "../../../hooks/useCurrentUser";

const Authorization = () => {
  const [activeTab, setActiveTab] = useState("Auth");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setCurrentUser } = useCurrentUser();
  const navigateToMain = useNavigate();
  const notify = (message) => toast(message);

  const click = async (e) => {
    console.log(e);
    e.preventDefault();

    if (activeTab === "Auth") {
      const response = await login(name, email, password);
      if (!response.success) return;

      setCurrentUser(response.data);
      toast.success("Successful authorization!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      //notify("Successful authorization!");
      console.log(response);
    } else {
      const response = await registration(name, email, password);
      if (!response.success) return;

      setCurrentUser(response.data);

      toast.success("Successful registration!");

      console.log(response);
    }
    navigateToMain(routeMainPage());
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
