import "./styles.scss";
import routeMain from "./routes";

import Authorization from "./Authorization";

const Authentication = () => {
  return (
    <div className="loginModalWindow">
      <div className="loginContent">
        {" "}
        <Authorization title="Authorization" />
      </div>
    </div>
  );
};

export { routeMain };
export default Authentication;
