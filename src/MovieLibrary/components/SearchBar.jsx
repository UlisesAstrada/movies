import React, {useState} from 'react';

import './SearchBar.css'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const SearchBar = ({movies}) => {

  const [searchTerm, setSearchTerm] = useState("")
  
  console.log(searchTerm)


  return (
    <div className="search">
      <Autocomplete
        onSelect={(event) => {
          setSearchTerm(event.target.value)
        }}
        className='searchBar'
        disablePortal
        id="combo-box-demo"
        options={movies}
        sx={{ width: 300}}
        renderInput={(params) => <TextField {...params} label="Search movie" />}
    />
    </div>
  );
}


export default SearchBar