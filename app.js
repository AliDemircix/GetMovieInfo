const searchShow = (searchText = 'ask') => {
  console.log(searchText);
  fetch(`http://api.tvmaze.com/search/shows?q=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      const resultName = data.map((item) => {
        return item.show;
      });
      console.log(resultName);
      renderResult(resultName);
      document.getElementById('errorMessage').innerHTML = '';
    })
    .catch((err) => {
      document.getElementById('errorMessage').innerHTML = err;
      renderResult([]);
    });
};

const renderResult = (results) => {
  const resultList = document.getElementById('list');
  resultList.innerHTML = '';
  results.forEach((result) => {
    if (result.image != null) {
      const movie = document.createElement('li');
      movie.innerHTML = ` <img src="${result.image['medium']}"><div class='show-info-content'><h3>${result.name}</h3><p>Language: ${result.language}</p></div> `;
      resultList.appendChild(movie);
      console.log(result.image['medium']);
    }
  });
};

let searchTimeToken = 0;
window.onload = () => {
  const searchElement = document.getElementById('searchId');

  searchElement.onkeyup = (e) => {
    clearTimeout(searchTimeToken);
    if (searchElement.value.trim().length === 0) {
      return;
    }
    searchTimeToken = setTimeout(() => {
      searchShow(searchElement.value);
    }, 500);
  };
};
window.addEventListener('load', searchShow());
