import "./styles.scss";
import FacebookImg from "assets/img/Facebook.png";
import LinkedinImg from "assets/img/Linkedin.png";
import TwitterImg from "assets/img/Twitter.png";
import InstagramImg from "assets/img/Instagram.png";
const ArticleFooter = () => {
  return (
    <div className="articleFooter">
      <div className="socialIcons">
        <a href="https://developer.mozilla.org/ru/docs/Web/CSS/border">
          <img src={FacebookImg} alt={FacebookImg} />
        </a>
        <a href="https://developer.mozilla.org/ru/docs/Web/CSS/border">
          <img src={LinkedinImg} alt={LinkedinImg} />{" "}
        </a>
        <a href="https://developer.mozilla.org/ru/docs/Web/CSS/border">
          <img src={TwitterImg} alt={TwitterImg} />{" "}
        </a>
        <a href="https://developer.mozilla.org/ru/docs/Web/CSS/border">
          <img src={InstagramImg} alt={InstagramImg} />{" "}
        </a>
      </div>
    </div>
  );
};

export default ArticleFooter;
