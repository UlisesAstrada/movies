import React, { useEffect, useState } from 'react'
import MoviesList from './MoviesList'
import './MovieLibrary.css'

import SearchBar from './SearchBar'

export default function MovieLibrary() {
  


  
  useEffect(() => {
    async function fetchData() {
      return Promise.all(
        [1, 2, 3].map((page) =>
          fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=162c5ae054cfa42b00250c979618032e&language=en-US&page=${page}`
          )
          .then((res) => res.json())
        )
      )
      .then((results) => results.flat())
      .then(results => setMovies(results
        .map(movie => movie.results)
        .flat())
      );
    }
    fetchData()    
  }, [])

  const [movies, setMovies] = useState([]);
 

  return(
    <div className="MovieLibrary">
      <header className="ML-header">
        <h1 className="ML-title">Movies Challenge</h1>
        <SearchBar movies={movies.map(movie => movie.title)} />
      </header>
      <div className="ML-intro">
        { movies && <MoviesList  movies={movies}/> }
      </div>
    </div>)
}
