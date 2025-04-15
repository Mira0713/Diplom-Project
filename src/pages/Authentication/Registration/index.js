import "./styles.scss";
const Registration = ({ title }) => {
  return (
    <div className="authentication">
      <form className="authenticationForm">
        <div className="authenticationTitle">{title}</div>
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
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password*"
              required
            />
          </div>
        </div>
        <div className="authenticationFormButton">
          <button className="">{title}</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
