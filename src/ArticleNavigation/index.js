import "./styles.scss";
import Description from "ArticlePages/Description";
import Comments from "ArticlePages/Comments";
import { useState } from "react";

const ArticleNavigation = ({ movie, loadMovie = Function }) => {
  const [activeTab, setActiveTab] = useState("Description");
  //console.log(movie);
  return (
    <section className="articleNav">
      <div className="tabs">
        <div
          onClick={() => setActiveTab("Description")}
          className={activeTab === "Description" ? "activeTab" : "tab"}
        >
          Description
        </div>
        <div
          onClick={() => setActiveTab("Comments")}
          className={activeTab === "Comments" ? "activeTab" : "tab"}
        >
          Comments
        </div>
      </div>
      {activeTab === "Description" ? (
        <Description movie={movie} />
      ) : (
        <Comments loadMovie={loadMovie} />
      )}
    </section>
  );
};

export default ArticleNavigation;
