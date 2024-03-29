const global ={
    currentPage: window.location.pathname,
    search:{
        term: '',
        type:'',
        page:1,
        totalPages:1
    }
};
//most popular movies
async function displayPopularMovies(){
const { results }= await fetchApiData('movie/popular');
    results.forEach(movie=>{
        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`
          <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
            ? `  <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
          : `
          <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"
        />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;

          document.querySelector('#popular-movies').appendChild(div);
    });
}

//most popular tv shows
async function displayPopularShows(){
    const { results }= await fetchApiData('tv/popular');
        results.forEach(show=>{
            const div=document.createElement('div');
            div.classList.add('card');
            div.innerHTML=`
              <a href="tv-details.html?id=${show.id}">
              ${
                show.poster_path
                ? `  <img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
              />`
              : `
              <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
              }
              </a>
              <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                  <small class="text-muted">Air Date: ${show.first_air_date}</small>
                </p>
              </div>`;
    
              document.querySelector('#popular-shows').appendChild(div);
        });
    }
// display movie details
    async function displayMovieDetails(){
        const movieID=window.location.search.split('=')[1];
        const movie = await fetchApiData(`movie/${movieID}`);

        //display background
    displayBackground('movie', movie.backdrop_path);

        const div=document.createElement('div');
        div.innerHTML= `
        <div class="details-top">
          <div>
          ${
            movie.poster_path
            ? `  <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
          : `
          <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"
        />`
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
             ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre)=>`<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${movie.budget}</li>
            <li><span class="text-secondary">Revenue:</span> ${movie.revenue}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company)=>`<span>${company.name}</span>`).join('')}</div>
        </div>
        `;

        document.querySelector('#movie-details').appendChild(div);
    }

    // display show details
    async function displayShowDetails(){
        const showID=window.location.search.split('=')[1];
        const show = await fetchApiData(`tv/${showID}`);

        //display background
    displayBackground('tv', show.backdrop_path);

        const div=document.createElement('div');
        div.innerHTML= `
        <div class="details-top">
          <div>
          ${
            show.poster_path
            ? `  <img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
          : `
          <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
          }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Day: ${show.last_air_date}</p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre)=>`<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visitshow Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Number of episode:</span> ${show.number_of_episodes}</li>
            <li><span class="text-secondary">Last Episode to air:</span> ${show.last_episode_to_air}</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company)=>`<span>${company.name}</span>`).join('')}</div>
        </div>
        `;

        document.querySelector('#show-details').appendChild(div);
    }

    /// SearchBar 

   async function search(){
        const queryString=window.location.search;
        const urlParams=new URLSearchParams(queryString);
    }

    //// displayBackground Function

    function displayBackground(type, background_path){
        const overLap=document.createElement('div');

        overLap.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${background_path})`;

        if (type==='movie'){
            document.querySelector('#movie-details').appendChild(overLap);
        } else {
            
            document.querySelector('#show-details').appendChild(overLap);
        }

    }


// display slider
async function displaySlider(){
    const { results } =await fetchApiData('movie/now_playing');
    results.forEach((movie)=>{
        const div=document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML=`
        <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
        `;

        document.querySelector('.swiper-wrapper').appendChild(div);

        initSwiper();
    });
}

function initSwiper(){
    const swiper= new Swiper('.swiper', {
        slidesPerview: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay:{
            delay: 4000,
            disableOnIteraction:false
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }

    })
}

//fetch data from TMDB

async function fetchApiData(endpoint){
    const API_KEY='db82d3c61ea2732f3eaaf743723e8be7';
    const API_url='https://api.themoviedb.org/3/';

        showSpinner();
    const response= await fetch(`${API_url}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data= await response.json();

        hideSpinner();

    return data;
}
 
function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}
function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

//activelinkColor
function highLightLinkActive(){
    const links=document.querySelectorAll('.nav-link');
    links.forEach((link)=>{
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    }
    );
}


//initialization
function init(){
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displaySlider();
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            search();
            break;
    }
    highLightLinkActive();

}
document.addEventListener('DOMContentLoaded', init);