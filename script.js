var newSwiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 19,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: "swiper-button-prev",
    clickable: true,
  },
  mousewheel: true,
});

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTdkYjI5MjJiZjI4NWE1OTcxMmE1YzlmYzA0YTFiMyIsInN1YiI6IjY1MzI4YzhkYjI2ODFmMDBjNDRlYmY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vNIQhwWBwZrOBjG3uYaEv-7cjoyJmp2GryonJkPOGt0'
  }
};


// ///////////////////////////////////////////////////////////////////////////////////

fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));



const form = document.getElementById('search_films');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const movie = document.getElementById('searchField').value;
  search_films(movie);
});

function search_films(search) {
  fetch(`
  https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_text_query=${search}`, options)
    .then(response => response.json())
    .then(data => displaySearchResults(data.results))
    .catch(err => console.error(err));
}

function displaySearchResults(movies) {
  const resultsContainer = document.getElementById("container_searchFilms")
  resultsContainer.innerHTML = '';

  if (movies) {
    movies.forEach(movie => {
      const template = ` 
      <div class="swiper-slide">
        <img src="http://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.id}">
      </div>
    `;
      resultsContainer.insertAdjacentHTML('beforeend', template);
    });
    createModal(movies)
  }
  else {
    resultsContainer.innerHTML = "no results found";
  }
}

// ///////////////////////// MODAL ///////////////////////////////////////////////

function createModal(movies) {
  movies.forEach(movie => {
    const template = `
      <div id="modal-${movie.id}" class="modal">
        <div class="modal_content">    
        
          <div class="img_modal">
          <img src="http://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.id}"> 
          </div>
          <div class="infos_films_modal">
          <a href="#" class="modal_close">&times;</a>
          <h1>${movie.title}</h1>
          <p>${retrieveYear(movie.release_date)}</p>
            <img src="Vector (3).png">
          <p>${movie.vote_average}</p>
          <p>${movie.genre_ids}</p>
          <p> "${movie.overview}"</p>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', template);
  });


  const moviesImages = document.querySelectorAll('#container_searchFilms img');
  moviesImages.forEach(image => {
    image.addEventListener('click', function (event) {
      event.preventDefault();
      const movieId = this.getAttribute('alt');
      openModal(movieId);
    });
  });

  const closeButtons = document.querySelectorAll('.modal_close');
  closeButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const modalId = this.closest('.modal').id;
      closeModal(modalId);
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(`modal-${modalId}`);
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error(`Modal with ID 'modal-${modalId}' not found.`);
  }
}
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

function retrieveYear(date) {
  var dateParts = date.split("-");
  var releaseYear = dateParts[0];
  return releaseYear;
}


/////////////////////////////MODAL POP UP/////////////////////////////////////////

const modalPopup = document.getElementById('register');
modalPopup.addEventListener('click', function (event) {
  event.preventDefault();
  const registerId = this.getAttribute('alt');
  openModalPopUp();
});



const closeButtons = document.getElementById('closePopUp');
closeButtons.addEventListener('click', function (event) {
  event.preventDefault();
  closeModalPopUp();
});



function openModalPopUp() {
  const modal = document.getElementById('modal-popup');
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error(`Modal with ID modal not found.`);
  }
}
function closeModalPopUp() {
  const modal = document.getElementById('modal-popup');
  modal.style.display = "none";
}