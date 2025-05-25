import { useState, useEffect } from "react";
import "./styles.scss";
import {
  getUserRating,
  getAverageRating,
  setRating,
  deleteRating,
} from "../../http/ratingApi";
// import routeMain from "./routes";

const Rating = ({ movieId, maxStars = 10, loadMovie = Function }) => {
  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [hover, setHover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка данных при монтировании и при изменении movieId
  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        setIsLoading(true);

        // Используем импортированные функции API
        const [userRating, averageData] = await Promise.all([
          getUserRating(movieId),
          getAverageRating(movieId),
        ]);

        setUserRating(userRating);
        setAverageRating(averageData.average);
        setRatingCount(averageData.count);
      } catch (error) {
        console.error("Ошибка загрузки рейтингов:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatingData();
  }, [movieId]);

  const handleRating = async (selectedRating) => {
    try {
      setIsLoading(true);

      if (userRating === selectedRating) {
        // Удаляем оценку
        await deleteRating(movieId);
        setUserRating(null);
      } else {
        // Устанавливаем новую оценку
        await setRating(movieId, selectedRating);
        setUserRating(selectedRating);
      }

      // Обновляем средние значения
      const { average, count } = await getAverageRating(movieId);
      setAverageRating(average);
      setRatingCount(count);

      if (typeof loadMovie === "function") loadMovie(average);
    } catch (error) {
      console.error("Ошибка сохранения рейтинга:", error);
      alert(error.response?.data?.message || "Не удалось сохранить оценку");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rating">
      <div className="stars-container">
        {[...Array(maxStars)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <button
              key={index}
              className={`star ${isLoading ? "star-loading" : ""}`}
              onClick={() => handleRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            >
              <span
                className={
                  (hover || userRating) >= ratingValue
                    ? "star-filled"
                    : "star-empty"
                }
              >
                {ratingValue <= (hover || userRating) ? "★" : "☆"}
              </span>
            </button>
          );
        })}
      </div>
      {/* <div className="rating-value">
        {userRating
          ? `Ваша оценка: ${userRating}/${maxStars}`
          : "Поставьте оценку"}
      </div> */}
      <div className="rating-info">
        {userRating ? (
          <span className="user-rating">Your rating: {userRating}</span>
        ) : (
          <span>Rate this</span>
        )}
        <br />
        <span className="average-rating">
          Average: {averageRating.toFixed(1)} ({ratingCount} votes)
        </span>
      </div>
      {isLoading && <div className="rating-loading">Loading...</div>}
    </section>
  );
};

// export { routeMain };
export default Rating;
