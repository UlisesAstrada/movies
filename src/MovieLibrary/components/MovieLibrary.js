import React, { useEffect, useState } from 'react'
import MoviesList from './MoviesList'
import './MovieLibrary.css'

export default function MovieLibrary() {
  
  
  

  const [movies, setMovies] = useState([]);
  console.log(movies)

  return(
    <div className="MovieLibrary">
      <header className="ML-header">
        <h1 className="ML-title">Movies Challenge</h1>
      </header>
      <div className="ML-intro">
        { movies && <MoviesList movies={movies}/> }
      </div>
    </div>)
}
