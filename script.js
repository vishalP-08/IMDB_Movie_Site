async function searchMovies() {
  const apiKey = document.getElementById('apiKeyInput').value;
  const movieTitle = document.getElementById('movieTitleInput').value;
  const moviesContainer = document.getElementById('moviesContainer');
  const loader = document.getElementById('loader');

  // Clear previous results
  moviesContainer.innerHTML = '';
  
  // Display loader
  loader.classList.remove('hidden');
  
  const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Hide loader
    loader.classList.add('hidden');

    if (data.Search) {
      data.Search.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const movieTitle = document.createElement('h3');
        movieTitle.innerText = movie.Title;

        const movieYear = document.createElement('p');
        movieYear.innerText = `Year: ${movie.Year}`;

        const movieType = document.createElement('p');
        movieType.innerText = `Type: ${movie.Type}`;

        const moviePoster = document.createElement('img');
        moviePoster.src = movie.Poster;
        moviePoster.alt = `${movie.Title} Poster`;

        movieDiv.appendChild(movieTitle);
        movieDiv.appendChild(movieYear);
        movieDiv.appendChild(movieType);
        movieDiv.appendChild(moviePoster);

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
