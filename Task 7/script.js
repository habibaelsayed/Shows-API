// api_key
const api_key = '4c5b42201fe429bcd27dc74217b56915';
const image_path = 'https://image.tmdb.org/t/p/w500/';

// Movies api-url 'top-rated'
let movie_api = 'https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1'

// People api-url
let people_api = 'https://api.themoviedb.org/3/person/popular?api_key=<<api_key>>&language=en-US&page=1';

// tv-show api-url
let tvshow_api = 'https://api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page=1';

// getting pages url
let movies_url = form_apiUrl(api_key, movie_api);
let people_url = form_apiUrl(api_key, people_api);
let tvshow_url = form_apiUrl(api_key, tvshow_api);



/**
 * @param {string} api_key
 * @param {string} api_link
 * @return {string} api_url
*/
function form_apiUrl(api_key, api_link){
    let api_url = api_link.replace('<<api_key>>', api_key);
    return  api_url;
}


/**
 * @param {string} url
 * @return {Promise} promise
*/
function getData(url){
    let promise = fetch(url)
    .then(res=>res.json());
    return promise;
}

/////////////////////////////


async function showMovies(){

    // getting movies data from a promise
    let movies = getData(movies_url);
    movies = await movies.then(data=>data.results);
    
    // getting the div element to push movie cards
    let movie_card = document.getElementById('movies');

    // to get movies data
    movies.forEach((movie) => {

        let {title, poster_path} = movie;

        // poster path merge
        poster = image_path + poster_path;

        // element to push the movie details in
        let movieElement = document.createElement('div');

        movieElement.classList.add('container');

        movieElement.innerHTML= `
        <img src="${poster}" class="card-img-top" alt="movie">
        <div class="intro">
          <h5>${title}</h5>

        </div>`;

        // appending the movie element to the div with #movies id
        movie_card.appendChild(movieElement);
    });

}

async function showPeople(){
    // getting people data from a promise
    let people = getData(people_url);
    people = await people.then(data=>data.results);
    
    // getting the div element to push people cards
    let people_card = document.getElementById('people');

    // to get people data
    people.forEach((person) => {
        
        let {name, profile_path} = person;

        // poster path merge
        poster = image_path + profile_path;

        // element to push the person details in
        let peopleElement = document.createElement('div');

        peopleElement.classList.add('container');

        peopleElement.innerHTML= `
        <img src="${poster}" class="card-img-top" alt="movie">
        <div class="intro">
          <h5>${name}</h5>
        </div>`;

        // appending the movie element to the div with #movies id
        people_card.appendChild(peopleElement);
    });
    
}

async function showTV(){
    // getting tvshow data from a promise
    let tvshow = getData(tvshow_url);
    tvshow = await tvshow.then(data=>data.results);
    
    // getting the div element to push tvshow cards
    let tvshow_card = document.getElementById('tvshow');

    // to get tvshow data
    tvshow.forEach((show) => {
        
        let {name, poster_path} = show;

        // poster path merge
        poster = image_path + poster_path;

        // element to push the show details in
        let tvshowElement = document.createElement('div');

        tvshowElement.classList.add('container');

        tvshowElement.innerHTML= `
        <img src="${poster}" class="card-img-top" alt="movie">
        <div class="intro">
          <h5>${name}</h5>
        </div>`;
        
        // appending the movie element to the div with #movies id
        tvshow_card.appendChild(tvshowElement);
    });
    
}

showMovies();
showPeople();
showTV();