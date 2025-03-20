import "./styles.scss";
import routeMain from "./routes";
import SamiraImg from "assets/img/samirik.jpg";
const Contacts = () => {
  return (
    <div className="contactsPage">
      <div className="info">
        <div className="phone">
          <a href="tel:+380986156704"> +38 098 615 67 04 </a>
        </div>
        <div className="name">Samirik</div>
        <div className="mail">
          <a href="mailto:miraholmes13@gmail.com"> miraholmes13@gmail.com </a>
        </div>
        <div className="position">Shkila</div>
        <div className="technologies">JS HTML CSS React</div>
      </div>
      <div className="image">
        <img src={SamiraImg} alt={SamiraImg} />
      </div>
    </div>
  );
};

export { routeMain };
export default Contacts;
