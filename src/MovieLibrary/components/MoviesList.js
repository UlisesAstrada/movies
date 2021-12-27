import React, { useState } from 'react'
import './MoviesList.css'

import CardAndModal from './CardAndModal';

export default function MoviesList ({ movies, searchTerm }){
  
  const [sortingType, setSortingType] = useState('')
  const handleSortingChange = event => {
    setSortingType(event.target.value)
  }

 if(sortingType === 'name_asc') {
   movies.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1)
} 
  else if(sortingType === 'name_desc') {
    movies.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? -1 : 1)
  }
  else if(sortingType === 'rating') {
    movies.sort((a,b) => (a.vote_average > b.vote_average) ? -1 : 1)
  }

  return(
    <div className="movies-list">
      <div>
        <span>Sort by:</span>
        <SortingOptions selectedOption={sortingType} onChange={handleSortingChange}/>
      </div>
      
      <div className="items">
        {
          movies.filter((val) => {
            if(searchTerm === '') {
              return val
            } else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          }).map((movie, index) =>
            <MovieListItem 
              key={index} 
              movie={movie} 
            />
          )
        }
      </div>
     
    </div>

    
    
    )

  
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
      <option value="default"></option>
      <option value="name_asc">A to Z</option>
      <option value="name_desc">Z to A</option>
      <option value="rating">Rating</option>
    </select>
  )
}

