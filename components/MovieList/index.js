const tagName = "movie-handler";
const template = document.createElement("template");
template.innerHTML = `          
<div class="movie-handler">
    <!-- Searchbar -->
    <div class="sb-container flex-container">
    <div class="input-block">
        <input
        id="inputSearch"
        class="sb-element"
        type="text"
        placeholder="Search"
        />
    </div>
    <div class="button-block">
        <button class="sb-element" onclick="showMovies()">
        Search
        </button>
    </div>
    </div>

    <!-- Movie list -->
    <movie-list
    id="movieList"
    class="movie-list flex-container container"
    ></movie-list>
</div>`;

class MovieList extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}

const register = () => customElements.define(tagName, MovieList);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
