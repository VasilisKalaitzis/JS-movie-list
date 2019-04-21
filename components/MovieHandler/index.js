// This module utilize and handles the initialization, actions and mutators
// of MovieList and Searchbar components. This is not a standalone module

// dependencies:
// (class) Movielist
// (class) Searchbar

const tagNameMovieHandler = "movie-handler";
const templateMovieHandler = document.createElement("template");
templateMovieHandler.innerHTML = `       
<style> @import "./components/MovieHandler/style.css"; </style>
<div class="movie-handler">
    <!-- Searchbar -->
    <simple-searchbar id="simpleSearchbar"></simple-searchbar>

    <!-- Movie list -->
    <movie-list id="movieList"></movie-list>
</div>`;

class MovieHandler extends HTMLElement {
  constructor() {
    super();
    var self = this;
    // Set static data
    // ToDo: Make this glaboaly accessible and easier to configure!
    // Very easy alternative: add url attribute to the custom element
    // Real solution: Have a configurable file
    self.static_url = "http://www.omdbapi.com/";
    self.static_key = "338f9a63";

    // Function binding
    self.showMovies = self.showMovies.bind(this);
  }

  // Called after initialization
  connectedCallback() {
    var self = this;

    if (!self.shadowRoot) {
      self.attachShadow({ mode: "open" });
      self.shadowRoot.appendChild(templateMovieHandler.content.cloneNode(true));

      // Set default values of properties
      let searchbarElement = self.shadowRoot.getElementById("simpleSearchbar");
      self.searchbar = new Searchbar(searchbarElement, self.showMovies);

      // Set default values of properties
      let movieListElement = self.shadowRoot.getElementById("movieList");
      self.movieList = new MovieList(movieListElement);
    }

    return 1;
  }

  // Display a list of movies
  // Value = input of the searchbar
  // Params
  // (boolean) append: (1 = keep previous list) (0 = clear previous list)
  showMovies(query = "", append = 0) {
    var self = this;

    append === 0 ? self.movieList.removeMovies() : null;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        self.movieList.addMovies(JSON.parse(this.response));
      }
    };

    xhttp.open(
      "GET",
      self.static_url + "?apikey=" + self.static_key + query,
      true
    );
    xhttp.send();
  }
}

const registerMovieHandler = () =>
  customElements.define(tagNameMovieHandler, MovieHandler);
window.WebComponents
  ? window.WebComponents.waitFor(register)
  : registerMovieHandler();
