const { default: axios } = require('axios');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {

  let url = 'https://api.themoviedb.org/3/movie/950387?api_key=41f047fd89d501a909b1f3354191ed87';
  axios.get(url)
    .then(response => {
      console.log(response.data.title);
      let data = response.data;
      let releaseDate = new Date(data.release_date).getFullYear();
      let genres = '';

      data.genres.forEach(genre => {
        genres = genres + `${genre.name}, `;
      });

      let genresUpdated = genres.slice(0, -2) + '.';
      moviePoster = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;
      console.log(genresUpdated);
      let currentYear = new Date().getFullYear();
      res.render('index', { movieData: data, releaseDate: releaseDate, genres: genresUpdated, poster: moviePoster, year: currentYear });
    });
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running');
});