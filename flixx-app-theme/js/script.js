const global ={
    currentPage: window.location.pathname,
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
              <small class="text-muted">Release: ${movie.release_data}</small>
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
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
        case '/movie-details.html':
            console.log('Movie details');
            break;
        case '/tv-details.html':
            console.log('Tv details');
            break;
        case '/search.html':
            console.log('search');
            break;
    }
    highLightLinkActive();

}
document.addEventListener('DOMContentLoaded', init);