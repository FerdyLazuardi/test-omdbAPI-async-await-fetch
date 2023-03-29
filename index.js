function dataMovies(inputKeyword) {
  if(!inputKeyword.value) {
    throw new Error('Please enter a keyword')
  }
  return fetch('http://www.omdbapi.com/?apikey=96c0e150&s=' + inputKeyword.value)

    .then(respone => {
      if(!respone.ok){
        throw new Error(response.statusText)
      }
      return respone.json()
    })
    
    .then(respone => {
      if(respone.Respone === "False"){
        throw new Error(respone.Error)
      }
      return respone.Search
    })
}

function showUiMovies(movies) {
  let cards = '';
  movies.forEach(m => cards += showMovie(m));
  const movieContainer = document.querySelector('.movies-container');
  movieContainer.innerHTML = cards;
}

function dataModalMovies(imdbid) {
  return fetch('http://www.omdbapi.com/?apikey=96c0e150&i=' + imdbid)
    .then(respone => respone.json())
    .then(respone => respone)
}

function showUiModal(dataModal) {
  const modalDetail = showMovieDetail(dataModal);
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = modalDetail
}

function showMovie(x) {
  return `<div class="col-md-3 my-3">
        <div class="card">
            <img src="${x.Poster}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${x.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${x.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail" data-bs-toggle="modal" 
                    data-bs-target="#detailMovie" data-imdbid="${x.imdbID}">Selengkapnya</a>
            </div>
        </div>
    </div>`
}

function showMovieDetail(x) {
  return `
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="detailMovieLabel">Score : ${x.imdbRating}/10</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <img src="${x.Poster}" class="img-fluid">
            </div>
            <div class="col-md-9">
              <ul class="list-group">
                <li class="list-group-item">
                  <h4>${x.Title}</h4>
                </li>
                <li class="list-group-item">
                  <strong>Director :</strong> ${x.Director}
                </li>
                <li class="list-group-item">
                  <strong>Seiyu :</strong> ${x.Actors}
                </li>
                <li class="list-group-item">
                  <strong>Writer :</strong> ${x.Writer}
                </li>
                <li class="list-group-item">
                  <strong>Plot :</strong> ${x.Plot}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>`;
}

const searchButton = document.querySelector('.search-button')
const inputKeyword = document.querySelector('.input-keyword')

searchButton.addEventListener('click', async function () {
  try {
    const movies = await dataMovies(inputKeyword)
    showUiMovies(movies)
  }
catch(err){
    if (err.message === 'Please enter a keyword') {
      const movieContainer = document.querySelector('.movies-container');
      movieContainer.innerHTML = `<div class="col-12 alert alert-danger">Please Enter a Keyword!</div>`;
    }
    else {
      const movieContainer = document.querySelector('.movies-container');
      movieContainer.innerHTML = `<div class="col alert alert-danger">No Movies Found!</div>`;
    }
  }
})

// event binding
document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-detail')) {
    const imdbid = e.target.dataset.imdbid
    const dataModal = await dataModalMovies(imdbid)
    showUiModal(dataModal)
  }
})