import { Movie } from "../../App";

import "./card.styles.css";

type CardProps = {
  movie: Movie;
};

const Card = ({ movie }: CardProps) => {
  const { title, poster_path, release_date, vote_average } = movie;

  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="card-container">
      <img alt={`Movie ${title}`} src={posterUrl} />
      <h2>{title}</h2>
      <p>Release Date: {release_date}</p>
      <p>Rating: {vote_average}</p>
    </div>
  );
};

export default Card;
