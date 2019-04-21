const tagNameSearchbar = "simple-searchbar";

class Searchbar {
  constructor(container, callbackFunction) {
    var self = this;

    self.container = container;
    self.callbackFunction = callbackFunction;
    this.render();

    self.buttonSearchElement = self.container.getElementsByTagName("button")[0];
    self.inputSearchElement = self.container.getElementsByTagName("input")[0];

    self.buttonSearchElement.addEventListener("click", function() {
      self.callbackFunction("&s=" + self.inputSearchElement.value);
    });
  }

  render() {
    var self = this;

    self.container.innerHTML = `       
    <style> @import "./components/Searchbar/style.css"; </style>
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
            <button id="buttonSearch" class="sb-element">
            Search
            </button>
        </div>
    </div>
    `;

    return 1;
  }
}

const registerSearchbar = () =>
  customElements.define(tagNameSearchbar, Searchbar);
