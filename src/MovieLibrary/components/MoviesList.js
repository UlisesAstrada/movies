import React, { useState } from 'react'
import './MoviesList.css'

import CardAndModal from './CardAndModal';

export default function MoviesList ({ movies }){

  const [sortingType, setSortingType] = useState('')
  const handleSortingChange = event => {
    setSortingType(event.target.value)
  }

  

  return(
    <div className="movies-list">
      <div className="sorting">
        <span>Sort by:</span>
        <SortingOptions selectedOption={sortingType} onChange={handleSortingChange}/>
      </div>
      <div className="items">
        {
          movies.map((movie, index) =>
            <MovieListItem 
              key={index} 
              movie={movie} 
            />
          )
        }
      </div>
    </div>)

  
}

function MovieListItem ({movie}) {
  return(
    <div>
      <CardAndModal movie={movie} />
    </div>
  )
}

function SortingOptions ({ selectedOption, onChange }) {

  return (
    <select value={selectedOption} onChange={onChange}>
      <option value=""></option>
      <option value="name_asc">A to Z</option>
      <option value="name_desc">Z to A</option>
      <option value="rating">Rating</option>
    </select>
  )
}

