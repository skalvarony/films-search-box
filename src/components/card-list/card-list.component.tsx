import { Movie } from "../../App";
import Card from "../card/card.component";
import "./card-list.styles.css";

type CardListProps = {
  movies: Movie[];
};

const CardList = ({ movies }: CardListProps) => (
  <div className="card-list">
    {movies.map((movie) => {
      return <Card key={movie.id} movie={movie} />;
    })}
  </div>
);

export default CardList;
