function searching(event) {
  event.preventDefault();
  let searchingBar = document.querySelector("#search-bar");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = searchingBar.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searching);
