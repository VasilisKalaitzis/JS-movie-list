const tagNameMovieList = "movie-list";

class MovieList {
  constructor(container) {
    var self = this;
    self.container = container;
    //self.movies can be used later for cache
    self.movies = [];

    this.render();

    self.movieContainer = self.container.getElementsByTagName(
      "movie-list-template"
    )[0];
  }

  // Add Movies to the MovieList
  // Params
  // (array) movies: an array of movies
  addMovies(movies) {
    var self = this;

    if (movies.Response === "True" && movies.Search.length > 0) {
      movies.Search.map(
        movie => (
          self.movies.push(movie),
          self.renderMovieItem(
            self.templateMovieItem(movie),
            self.movieContainer
          )
        )
      );
    } else {
      console.log(
        "Error. MovieList.addMovies => movies is undefined or empty. message:" +
          movies.Error
      );
      return 0;
    }

    return 1;
  }

  // Remove Movies from the MovieList
  // Params
  // (array) movies: an array of movies
  removeMovies(movies = []) {
    var self = this;

    // if no movies specified, delete the whole list
    if (!movies.length > 0) {
      self.clearNode();
    }

    return 1;
  }

  // Delete childs from node
  // Params
  // (htmlElement) node: The referrence of an HTML element
  clearNode() {
    var self = this;

    self.movies = [];
    self.movieContainer.innerHTML = ``;

    return 1;
  }

  render() {
    var self = this;

    self.container.innerHTML = `       
    <style> @import "./components/MovieList/style.css"; </style>
    <movie-list-template
    class="movie-list flex-container container"
    >
    </movie-list-template>
    `;

    return 1;
  }

  // Static template used for each movie item
  // Params
  // (object) movie: Contains movie row as it is returned from the API, unparsed
  templateMovieItem(movie) {
    // ToDo: This should also become a individual component

    let result;
    try {
      result = `
      <div class="movie-item movie-item-simple">
        <div class="movie-item-details">
          <span>${movie.Title}</span>
        </div>
        <div class="movie-item-image">                
          <img
            alt="MovieImage"
            src=${movie.Poster}
          />
        </div>
      </div>
      `;
    } catch (err) {
      console.log(
        "Error. MovieList.templateMovieItem => message:" + err.message
      );
      return err;
    }

    return result;
  }

  // Render template to the node
  // Params
  // (html string) template: A string containing HTML code
  // (htmlElement) node: The referrence of an HTML element
  renderMovieItem(template, node) {
    // ToDo: This should also become a individual component
    node.innerHTML += template;
  }
}

const registerMovieList = () =>
  customElements.define(tagNameMovieList, MovieList);
