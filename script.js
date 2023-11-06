

/////////////////////////// DOM SELECTORS ///////////////////////////////////////

let registerBtn = document.querySelectorAll(".register");
let signinBtn = document.querySelectorAll(".signin");
let modalReg = document.querySelector(".modal");
let comedyBtn = document.querySelector("#comedy");
let dramaBtn = document.querySelector("#drama");
let actionBtn = document.querySelector("#action");
let romanceBtn = document.querySelector("#romance");
let fantasyBtn = document.querySelector("#fantasy");
let animationBtn = document.querySelector("#animation");
let form = document.querySelector('#search_films button');
let searchInput = document.querySelector('#searchField');
let resultsSwiper = document.querySelector(".mySwiper1 .swiper-wrapper");
let resultsContainer = document.querySelector(".mySwiper1");
let resultMsg = document.querySelector(".msg_searchResult");
let recentsSwiper = document.querySelector(".mySwiper2 .swiper-wrapper");
let genresSwiper = document.querySelector(".mySwiper3 .swiper-wrapper");
let signupBtn = document.querySelector(".signup");
let loginBtn = document.querySelector(".login");
let closeModal = document.querySelector("#closePopUp");
let modalButton = document.querySelector("#modal-popup .btn-primary");



/////////////////////////// CREATE SWIPER ///////////////////////////////////////



function createSwiper(swiperNumber) {
  const swiper = new Swiper(`.mySwiper${swiperNumber}`, {

    direction: 'horizontal',
    loop: true,
    slidesPerView: '4',
    spaceBetween: '2%',
  
    navigation: {
      nextEl: `.nextEl${swiperNumber}`,
      prevEl: `.prevEl${swiperNumber}`,
    },

    preventClicks: false,
    preventClicksPropagation: false,

  });
}

/////////////////////////// MAKE SWIPER HOVERABLE ///////////////////////////////////////

function initHover(){
  document.querySelectorAll(".filmListItem").forEach(element => {
    element.addEventListener('mouseover', function (e) {
      element.querySelector(".hoverInfo").style.display = "flex";
  })
    element.addEventListener('mouseout', function (e) {
      element.querySelector(".hoverInfo").style.display = "none";
  
  })
  
  })
  
  }

/////////////////////////// MAKE SWIPER CLICKABLE ///////////////////////////////////////



/////////////////////////// REGISTER AND SIGNIN BUTTONS ///////////////////////////////////////

function disableScroll() {
  document.body.classList.add("stopScrolling"); 
} 

function enableScroll() { 
  document.body.classList.remove("stopScrolling"); 
} 

registerBtn.forEach(element => {
element.addEventListener('click', function (e) {
  e.preventDefault();
  console.log("register");
  modalReg.style.display = "block";
  disableScroll()
  modalButton.innerText = "Register";
})})

signupBtn.addEventListener('click', function (e) {
e.preventDefault();
modalButton.innerText = "Register";
})


signinBtn.forEach(element => {
element.addEventListener('click', function (e) {
  e.preventDefault();
  modalReg.style.display = "block";
  disableScroll()
  modalButton.innerText = "Login";
})})

loginBtn.addEventListener('click', function (e) {
e.preventDefault();
modalButton.innerText = "Login";
})

closeModal.addEventListener('click', function (e) {
    e.preventDefault();
    modalReg.style.display = "none";
    enableScroll()
})


/////////////////////////// DATABASE INFO ///////////////////////////////////////

const dbInfo = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTdkYjI5MjJiZjI4NWE1OTcxMmE1YzlmYzA0YTFiMyIsInN1YiI6IjY1MzI4YzhkYjI2ODFmMDBjNDRlYmY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vNIQhwWBwZrOBjG3uYaEv-7cjoyJmp2GryonJkPOGt0'
  }
};

/////////////////////////// SEARCH SWIPER  ///////////////////////////////////////


function displaySearchResults(movies) {

  if (searchInput.value === "") {
    resultMsg.style.display = "block";
    resultMsg.innerHTML = `Please enter a search term`;
    resultsContainer.style.display = "none";

  } else   if (movies.length > 0) {
    resultMsg.style.display = "block";
    resultMsg.innerHTML = `results for "${searchInput.value}"`;
    resultsContainer.style.display = "block";
    resultsSwiper.innerHTML = "";
    movies.forEach(searchInput => {
      resultsSwiper.innerHTML +=
      `
      <div class="filmListItem" id="${searchInput.id}">
        <div class="hoverInfo">
        <h1>${searchInput.title}</h1>
        <h2>${searchInput.release_date.slice(0, 4)}</h2>
        <h3>${searchInput.genre_ids}</h3>
        <img src="Vector (3).png">
        <h4>${searchInput.vote_average.toFixed(1)}</h4>
        </div>
        <div class="poster">
          <img src="http://image.tmdb.org/t/p/w185${searchInput.poster_path}" alt="${searchInput.title}">
        </div>
      `;
    });

    createSwiper(1);
    initHover();
    initSwiperLinks(1);


  }

  else {
    resultMsg.style.display = "block";
    resultMsg.innerHTML = `There are no results for "${searchInput.value}"`;
    resultsContainer.style.display = "none";
  }
}


/////////////////////////// FETCH DATA FOR SEARCH SWIPER  ///////////////////////////////////////

function searchMovies(search) {
  fetch(`
  https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_text_query=${search}`, dbInfo)
    .then(response => response.json())
    .then(data => displaySearchResults(data.results))
    .catch(err => console.error(err));
}

/////////////////////////// SEARCH CLICK ///////////////////////////////////////

form.addEventListener('click', function (event) {
  event.preventDefault();
  console.log(searchInput.value);
  searchMovies(searchInput.value);
});



/////////////////////////// RECENTS SWIPER  ///////////////////////////////////////


function displayRecentMovies(apiData) {
  
  recentsSwiper.innerHTML = "";
  for (i = 0; i < apiData.length; i++) {
    recentsSwiper.innerHTML += `
    <div class="filmListItem" id="${apiData[i].id}">
      <div class="hoverInfo">
        <h1>${apiData[i].title}</h1>
        <h2>${apiData[i].release_date.slice(0, 4)}</h2>
        <h3>${apiData[i].genre_ids}</h3>
        <img src="Vector (3).png">
        <h4>${apiData[i].vote_average.toFixed(1)}</h4>
      </div>
      <div class="poster">
        <img src="https://image.tmdb.org/t/p/original${apiData[i].poster_path}" alt="${apiData[i].title}">
      </div>
    </div>
      `;
}

createSwiper(2);
initSwiperLinks(2);
initHover();


}

/////////////////////////// FETCH DATA FOR RECENTS SWIPER  ///////////////////////////////////////


function recentMovies() {
  fetch(`
  https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, dbInfo)
    .then(response => response.json())
    .then(data => displayRecentMovies(data.results))
    .catch(err => console.error(err));
}

recentMovies();



/////////////////////////// GENRES SWIPER  ///////////////////////////////////////

function displayMoviesByGenre(apiData) {
  genresSwiper.innerHTML = "";
  for (i = 0; i < apiData.length; i++) {
    genresSwiper.innerHTML += `<div class="swiper-slide">
    <div class="filmListItem" id="${apiData[i].id}">
      <div class="hoverInfo">
        <h1>${apiData[i].title}</h1>
        <h2>${apiData[i].release_date.slice(0, 4)}</h2>
        <h3>${apiData[i].genre_ids}</h3>
        <img src="Vector (3).png">
        <h4>${apiData[i].vote_average.toFixed(1)}</h4>
      </div>
      <div class="poster">
        <img src="https://image.tmdb.org/t/p/original${apiData[i].poster_path}" alt="${apiData[i].title}">
      </div>
    </div>`;
}

createSwiper(3);
initHover();
initSwiperLinks(3);

}


/////////////////////////// FETCH DATA FOR GENRES SWIPER  ///////////////////////////////////////


function moviesByGenre(genre) {
  fetch(`
  https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`, dbInfo)
    .then(response => response.json())
    .then(data => displayMoviesByGenre(data.results))
    .catch(err => console.error(err));
}


moviesByGenre(`35`);



/////////////////////////// GENRE BUTTONS  ///////////////////////////////////////


function resetGenreButtons() {
  comedyBtn.classList.remove("activeGenre");
  dramaBtn.classList.remove("activeGenre");
  actionBtn.classList.remove("activeGenre");
  romanceBtn.classList.remove("activeGenre");
  fantasyBtn.classList.remove("activeGenre");
  animationBtn.classList.remove("activeGenre");
}

comedyBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`35`);
  resetGenreButtons()
  comedyBtn.classList.add("activeGenre");
})

dramaBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`18`);
  resetGenreButtons()
  dramaBtn.classList.add("activeGenre");
})

actionBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`28`);
  resetGenreButtons()
  actionBtn.classList.add("activeGenre");
})

romanceBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`10749`);
  resetGenreButtons()
  romanceBtn.classList.add("activeGenre");
})

fantasyBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`14`);
  resetGenreButtons()
  fantasyBtn.classList.add("activeGenre");
})

animationBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`16`);
  resetGenreButtons()
  animationBtn.classList.add("activeGenre");
})