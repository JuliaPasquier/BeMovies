

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
let noResultsContainer = document.querySelector(".msg_searchResult");
let recentsSwiper = document.querySelector(".mySwiper2 .swiper-wrapper");
let genresSwiper = document.querySelector(".mySwiper3 .swiper-wrapper");
let signupBtn = document.querySelector(".signup");
let loginBtn = document.querySelector(".login");



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


  
  });
}

createSwiper(2);


/////////////////////////// SWIPER HOVER ///////////////////////////////////////

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
    noResultsContainer.style.display = "block";
    noResultsContainer.innerHTML = `Please enter a search term`;
    resultsContainer.style.display = "none";


  } else   if (movies.length > 0) {
    noResultsContainer.style.display = "none";
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
        <img src="img/star.svg">
        <h4>${searchInput.vote_average.toFixed(1)}</h4>
        </div>
        <div class="poster">
          <img src="http://image.tmdb.org/t/p/w185${searchInput.poster_path}" alt="${searchInput.title}">
        </div>
      `;
    });

    createSwiper(1);
    initHover();


  }

  else {
    noResultsContainer.style.display = "block";
    noResultsContainer.innerHTML = `There are no results for "${searchInput.value}"`;
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
  for (i = 0; i < apiData.length; i++) {
    recentsSwiper.innerHTML += `
    <div class="filmListItem" id="${apiData[i].id}">
      <div class="hoverInfo">
      <h1>${apiData[i].title}</h1>
      <h2>${apiData[i].release_date.slice(0, 4)}</h2>
      <h3>${apiData[i].genre_ids}</h3>
      <img src="img/star.svg">
      <h4>${apiData[i].vote_average.toFixed(1)}</h4>
      </div>
      <div class="poster">
        <img src="https://image.tmdb.org/t/p/original${apiData[i].poster_path}" alt="${apiData[i].title}"></div>
      </div>
      `;
}

createSwiper(2);
initSwiperLinks(2);
initHover();


}


function recentMovies() {
  fetch(`
  https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, dbInfo)
    .then(response => response.json())
    .then(data => displayRecentMovies(data.results))
    .catch(err => console.error(err));
}

recentMovies();