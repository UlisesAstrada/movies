function api () {
  fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=162c5ae054cfa42b00250c979618032e&language=en-US&page=1')
    .then(res => res.json())
    .then(data => console.log(data))
} 