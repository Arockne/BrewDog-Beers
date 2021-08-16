function getBeers(page = 1, name) {
  const url = name ? `https://api.punkapi.com/v2/beers?page=${page}&per_page=20&beer_name=${name}` : `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`;
  fetch(url)
  .then(resp => resp.json())
  .then(renderBeers)
}

function renderBeers(beers) {
  beers.forEach(createBeerCard)
}

function createBeerCard(beer) {
  const img = document.createElement('img');
  img.src = beer.image_url;
  
  const name = document.createElement('h3');
  name.textContent = beer.name;
  
  const card = document.createElement('div')
  card.className = 'card';
  card.append(img, name);

  document.querySelector('#item-container').appendChild(card)
}

function getBeersFromSearch() {
  const searchForm = document.querySelector('#beer-search')
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    removeChildren(document.querySelector('#item-container'));
    const name = searchForm.querySelector('#beer-name').value;
    getBeers(1, name);
  })
}

//might need to use this function to supply page number and name of the search
function getMoreBeer() {
  let page = 1;
  const items = document.querySelector('#item-container');
  const less = document.querySelector('#less');
  less.addEventListener('click', () => {
    page -= 1;
    if (page === 0) {
      page = 1;
      return;
    }
    removeChildren(items);
    getBeers(page);
  })
  const more = document.querySelector('#more');
  more.addEventListener('click', () => {
    page += 1;
    removeChildren(items);
    getBeers(page);
  })
}

function removeChildren(node) {
  while(node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getBeers();
  getMoreBeer();
  getBeersFromSearch();
})