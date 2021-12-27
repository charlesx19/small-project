const container = document.getElementsByClassName('container')[0];
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        if(searchInput.value){
            getSearching()
        }
    }
})

let movies;
const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const imgUrl = 'https://image.tmdb.org/t/p/w1280'
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&page=1&query='

getPopMovies()

async function getPopMovies(){
    const data = await fetch(url).then(res => res.json());
    movies = data.results
    init(movies)
}

async function getSearching(){
    container.innerHTML = '';
    const str = searchInput.value;
    // 用正規表達式把空格(\s)置換成"+"，後面的g是代表整段句子都替換
    const keyWord = str.replace(/\s/g, '+');

    const data = await fetch(searchUrl + keyWord).then(res => res.json());
    movies = data.results
    init(movies)
    searchInput.value = '';
}

function init(popData){
    popData.forEach(item => {

        const movieItem = document.createElement('div');
        movieItem.classList.add('movieBox');
        let voteColor = '';

        if(parseInt(item.vote_average) >= 8) {
            voteColor = 'green'
        } else if (parseInt(item.vote_average) >= 5) {
            voteColor = 'orange'
        } else {
            voteColor = 'red'
        }

        movieItem.innerHTML = `
        <div class="imgBox">
            <img src="${imgUrl + item.poster_path}" alt="photo">
        </div>
        <div class="infoBox">
            <div class="title">${item.title}</div>
            <div class="vote ${voteColor}">${item.vote_average}</div>
        </div>
        <div class="overview">
            <p>
                overview:<br/><br/>
                ${item.overview}
            </p>
        </div>
        `

        container.appendChild(movieItem)
    });

}

