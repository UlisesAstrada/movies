import React, { useEffect, useState } from 'react'
import MoviesList from './MoviesList'
import './MovieLibrary.css'

import SearchBar from './SearchBar'

export default function MovieLibrary() {
  
  const firstPages = [1]

  const [newPage, setNewPage] = useState(4)



    async function getMoreMovies () {
      const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=162c5ae054cfa42b00250c979618032e&language=en-US&page=${newPage}`)
      let data = await res.json()
      data = data.results.map(movie => movie)
      setMovies([...movies, ...data])
      setNewPage(newPage + 1)
    } 
 
  useEffect(() => {
    async function fetchData() {
      return Promise.all(
        firstPages.map((page) =>
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

  const [searchTerm, setSearchTerm] = useState('')
 

  return(
    <div className="MovieLibrary">
      <header className="ML-header">
        <h1 className="ML-title">Movies Challenge</h1>
        <SearchBar setSearchTerm={setSearchTerm} movies={movies.map(movie => movie.title)} />
      </header>
      <div className="ML-intro">
        { movies && <MoviesList searchTerm={searchTerm} movies={movies}/> }
        <button onClick={() => getMoreMovies()}>Load more movies!</button>
      </div>
    </div>)
}
