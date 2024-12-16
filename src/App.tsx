import { useState, useEffect, ChangeEvent } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import { getData } from "./utils/data.utils";
import "./App.css";

// Tipado de la respuesta
export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
};

// Lee la variable de entorno con el prefijo REACT_APP_
const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getData<{ results?: Movie[] }>(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        );

        console.log("API_KEY:", API_KEY);

        if (moviesData && Array.isArray(moviesData.results)) {
          setMovies(moviesData.results);
        } else {
          console.error("API response is invalid or results is undefined");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const newFilteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchField)
    );
    setFilteredMovies(newFilteredMovies);
  }, [movies, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Movies Rolodex</h1>
      <SearchBox
        className="movies-search-box"
        onChangeHandler={onSearchChange}
        placeholder="Search movies"
      />
      <CardList movies={filteredMovies} />
    </div>
  );
};

export default App;
