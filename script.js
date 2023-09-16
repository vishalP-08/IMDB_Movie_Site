async function searchMovies() {
  const apiKey = document.getElementById('apiKeyInput').value;
  const movieTitle = document.getElementById('movieTitleInput').value;
  const moviesContainer = document.getElementById('moviesContainer');
  const loader = document.getElementById('loader');

  // Display loader
  loader.classList.remove('hidden');
  // Hide previous results
  moviesContainer.innerHTML = '';  // Clear previous results

  const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;
  
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

   // Hide loader after 3 seconds
   setTimeout(() => {
    loader.classList.add('hidden');
    // Show the results container
    moviesContainer.classList.remove('hidden');
  }, 3000); // Display spinner for 3 seconds

  if (data.Search) {
    data.Search.forEach(movie => {
      // Display movie card
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie');

      // Movie title
      const movieTitleElement = document.createElement('h3');
      movieTitleElement.innerText = `Title: ${movie.Title}`;

      // Release year
      const yearElement = document.createElement('p');
      yearElement.innerText = `Year: ${movie.Year}`;

      // Movie type
      const typeElement = document.createElement('p');
      typeElement.innerText = `Type: ${movie.Type}`;

      // IMDb link as a button
      const imdbButton = document.createElement('a');
      imdbButton.href = `https://www.imdb.com/title/${movie.imdbID}/`;
      imdbButton.innerText = 'IMDb';
      imdbButton.classList.add('imdb-button');
      imdbButton.target = '_blank';

      // Movie poster
      const posterUrl = movie.Poster === 'N/A' ? 'placeholder.png' : movie.Poster;
      const posterImage = document.createElement('img');
      posterImage.src = posterUrl;
      posterImage.alt = `${movie.Title} Poster`;

      movieDiv.appendChild(movieTitleElement);
      movieDiv.appendChild(yearElement);
      movieDiv.appendChild(typeElement);
      movieDiv.appendChild(imdbButton);
      movieDiv.appendChild(posterImage);

      moviesContainer.appendChild(movieDiv);
    });
    } else {
      alert('No movies found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}
