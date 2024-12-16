import { useState, useEffect, ChangeEvent } from "react";
import { getData } from "./utils/data.utils";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
};

// 1. QUITA POR COMPLETO:
// const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // 2. USA LA FUNCIÓN SERVERLESS:
        // En lugar de la URL de TMDb con la KEY, llamas a tu función Netlify:
        const moviesData = await getData<{ results?: Movie[] }>(
          "/.netlify/functions/getMovies"
        );

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

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
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
