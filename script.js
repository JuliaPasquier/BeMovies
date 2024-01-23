
// // ////// création de mes 3 swipers //////////

const swiper1 = new Swiper('.swiper1', {

  direction: 'horizontal',
  loop: true,
  slidesPerView: '4',
  spaceBetween: '2%',

  navigation: {
    nextEl: '.nextEl1',
    prevEl: '.prevEl1',
  },

});

const swiper2 = new Swiper('.swiper2', {

  direction: 'horizontal',
  loop: true,
  slidesPerView: '4',
  spaceBetween: '2%',

  navigation: {
    nextEl: '.nextEl2',
    prevEl: '.prevEl2',
  },

});

const swiper3 = new Swiper('.swiper3', {

  direction: 'horizontal',
  loop: true,
  slidesPerView: '4',
  spaceBetween: '2%',

  navigation: {
    nextEl: '.nextEl3',
    prevEl: '.prevEl3',
  },

});

// /////////////////////////////////////////////////////////////////

let registerBtn = document.querySelectorAll(".register");
let signinBtn = document.querySelectorAll(".signin");
let searchBtn = document.querySelectorAll(".search");
let latestBtn = document.querySelectorAll(".latest");
let genresBtn = document.querySelectorAll(".genres");
let modalReg = document.querySelector(".modalReg");
let greyOut = document.querySelectorAll(".greyOut");
let modalInfo = document.querySelector(".modalInfo");
let movie = document.querySelectorAll(".swiper-slide");

/////////////////////// Désactiver / activer le scroll ////////////////////////////////////////////

function disableScroll() {
  document.body.classList.add("stopScrolling");
}

function enableScroll() {
  document.body.classList.remove("stopScrolling");
}

// ////////////////////////// écoute d'event > click //////////////////////////

registerBtn.forEach(element => {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    modalReg.style.display = "block";
    disableScroll()
  })
})

signinBtn.forEach(element => {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    modalReg.style.display = "block";
    disableScroll()
  })
})

movie.forEach(element => {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    modalInfo.style.display = "block";
    disableScroll()
  })
})

greyOut.forEach(element => {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    modalReg.style.display = "none";
    modalInfo.style.display = "none";
    enableScroll()
  })
})


// /////////////////////////// AUORISATION ////////////////////////////////////////


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTdkYjI5MjJiZjI4NWE1OTcxMmE1YzlmYzA0YTFiMyIsInN1YiI6IjY1MzI4YzhkYjI2ODFmMDBjNDRlYmY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vNIQhwWBwZrOBjG3uYaEv-7cjoyJmp2GryonJkPOGt0'
  }
};


/////////////////////////////////////RECHERCHES//////////////////////////////////////////////////////

const form = document.getElementById('searchBar');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const movie = document.getElementById('searchInput').value;
  searchResults(movie);
});

function searchResults(search) {
  let div = 'searchResult'
  fetch(`
  https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_text_query=${search}`, options)
    .then(response => response.json())
    .then(data => displaySearchResults(data.results, div))
    .then(() => {
      const moviesImages = document.querySelectorAll(`#${div} img`);
      moviesImages.forEach(image => {
        image.addEventListener('click', function (event) {
          event.preventDefault();
          const movieId = this.getAttribute('alt');
          openModal(movieId);
        });
      });
    })
    .catch(err => console.error(err));
}


let template = document.getElementById("searchInput");
let templateContent = template.content;

// //////////////////////// MODAL INFOS ///////////////////////////////

function createModal(movies) {
  movies.forEach(movie => {
    const template = `
      <section class="modalInfo" id="modal-${movie.id}">
      <div class="container">
      <a href="#" class="modal_close">&times;</a>
          <div class="poster"><img src="http://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.id}"></div>
          <div class="info">
              <h1>${movie.title}</h1>
              <h2>${retrieveYear(movie.release_date)}</h2>
              <h3><img src="img/star.svg" alt="">${movie.vote_average}</h3>
              <h4>${movie.genre_ids}</h4>
              <p class="summary">${movie.overview}</p>
              <div class="cast">
                  <h4>cast:</h4>
              </div>
          </div>
      </div>
      <div class="greyOut"></div>
  </section>
    `;
    document.body.insertAdjacentHTML('beforeend', template);
  });
}

// ///////////////////////////// Fermer Modal ////////////////////////////////
const close = document.querySelectorAll('.modal_close');
close.forEach(button => {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    const modalId = this.closest('.modal').id;
    closeModal(modalId);
  });
});


function displaySearchResults(movies, div) {
  const resultsContainer = document.getElementById(div)
  resultsContainer.innerHTML = '';

  if (movies) {
    movies.forEach(movie => {
      const template = `
      <div class="swiper-slide">
        <div class="poster">
          <img src="http://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.id}">
        </div>
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

// /////////////////////////////////// LATEST_RELEASES ///////////////////////////////////////////////////////


function latestRelease() {
  // Fetch the current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedCurrentDate = `${year}-${month}-${day}`;

  // Fetch one month in the past
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const yearAgo = oneMonthAgo.getFullYear();
  const monthAgo = String(oneMonthAgo.getMonth() + 1).padStart(2, '0');
  const dayAgo = String(oneMonthAgo.getDate()).padStart(2, '0');
  const formattedOneMonthAgo = `${yearAgo}-${monthAgo}-${dayAgo}`;


  let div = 'latestRelease'
  fetch(`
    https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=${formattedOneMonthAgo}&release_date.lte=${formattedCurrentDate}&sort_by=popularity.desc`, options)
    .then(response => response.json())
    .then(data => displaySearchResults(data.results, div))
    .then(() => {
      const moviesImages = document.querySelectorAll(`#${div} img`);
      moviesImages.forEach(image => {
        image.addEventListener('click', function (event) {
          event.preventDefault();
          const movieId = this.getAttribute('alt');
          openModal(movieId);
        });
      });
    })
    .catch(err => console.error(err));
}

latestRelease();


// ////////////////////////////////////////// GENRES ///////////////////////////////////////////////

// Phase 1 : On fait un call api pour récup la lsite à jour des Genres

let genresList;

const btnGenresListes = document.getElementById('genreNav');
btnGenresListes.addEventListener('click', function (event) {
  event.preventDefault();

  const genre = event.target.innerText;
  console.log("Valeur du bouton cliqué : "+ genre)
  fetchGenres(genre).then(idGenre => {
    genreListe(idGenre);
  });
});

async function fetchGenres(genre) {
  try {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const data = await response.json();
    genresList = data.genres;
    return trouverIdGenre(genre);
  } catch (err) {
    console.error(err);
  }
}

function trouverIdGenre(genreRecu) {
  const genre = genresList.find(genre => genre.name === genreRecu);
  if (genre) {
    return genre.id;
  }
  return null;
}


// Phase 2 : selon ce que l'user appuie sur le bouton, on va comparer la valeur du bouton (Comedy,ect....)...On compare cette valeur à notre liste
// ️
// On récup le bon ID
// ️
// Puis on utilise cet ID dans notre call API pour créer la liste de film par genre

function genreListe(id){

console.log("Id du genre cherché : "+id);

  let div = 'genre'
fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`, options)
  .then(response => response.json())
  .then(data => displaySearchResults(data.results, div))
.then(() => {
  const genre = document.querySelectorAll(`#${div} img`);
  genre.forEach(movies_comedy => {
    movies_comedy.addEventListener('click', function (event) {
      event.preventDefault();
      const movieId = this.getAttribute('alt');
      openModal(movieId);
    });
  });
})
.catch(err => console.error(err));
}
genreListe(35)


 //////////////////////////// HOVER /////////////////////////////////////



// document.getElementById("myImage").onmouseover = function() {
//   this.src = "http://image.tmdb.org/t/p/w185${movie.poster_path}";
//  }

// function hover(movies) {
//   movies.forEach(movie => {
//     const template = `
//           <div class="hover">
//               <h1>${movie.title}</h1>
//               <h2>${retrieveYear(movie.release_date)}</h2>
//               <h4>${movie.genre_ids}</h4>
//               <h3><img src="img/star.svg" alt="">${movie.vote_average}</h3>
//               <p class="summary">${movie.overview}</p>
//           </div>
//     `;
//     document.body.insertAdjacentHTML('beforeend', template);
//   });
// }

// let posters = document.querySelectorAll(".poster");
// posters.forEach(poster => {
//   poster.addEventListener('mouseover', function (e) {
//    // Créer un nouvel élément HTML pour afficher les informations
//    let info = document.createElement("div");
//    info.innerHTML = `
//      <h1>${this.alt}</h1>
//      <p>${this.src}</p>
//    `;
 
//    // Ajouter le nouvel élément à la page
//    document.body.appendChild(info);
//   });
 
//   poster.addEventListener('mouseout', function (e) {
//    // Supprimer le nouvel élément lorsque l'utilisateur arrête de survoler l'élément
//    document.body.removeChild(document.body.lastChild);
//   });
//  });
 