import React, { useEffect, useState, useRef, useMemo } from 'react'
import MoviesList from './MoviesList'
import './MovieLibrary.css'

import SearchBar from './SearchBar'
import { current } from '@reduxjs/toolkit'

export default function MovieLibrary() {
  
  const firstPages = [1]

  const [newPage, setNewPage] = useState(4)

  const targetRef = useRef(null)

  const [isVisible, setIsVisible] = useState(false)

  const callBackFn = entries => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    }
  }, [])


  useEffect(() => {
    const observer = new IntersectionObserver(callBackFn, options)
    const currTarget = targetRef.current
    if(currTarget) observer.observe(currTarget);
    
    return () => {
      if(currTarget) observer.unobserve(currTarget)
    }
  }, [targetRef, options])

    async function getMoreMovies () {
      const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=162c5ae054cfa42b00250c979618032e&language=en-US&page=${newPage}`)
      let data = await res.json()
      data = data.results.map(movie => movie)
      setMovies([...movies, ...data])
      setNewPage(newPage + 1)
    } 
 
    if(isVisible) {
      getMoreMovies()
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
        <div ref={targetRef}>More movies</div>
      </div>
    </div>)
}
