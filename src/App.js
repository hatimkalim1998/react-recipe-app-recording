import React, { Component } from "react";
import "./App.css";
import { recipes } from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
class App extends Component {
  state = {
    recipes: recipes,
    url:
      "https://www.food2fork.com/api/search?key=d539b2db410257524ed9f3d4bab401d2",
    base_url:
      "https://www.food2fork.com/api/search?key=d539b2db410257524ed9f3d4bab401d2",
    query: "&q=",
    details_id: 35398,
    indexPage: 1,
    search: "",
    error: ""
  };
  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jasonData = await data.json();
      if (jasonData.length === 0) {
        this.setState({
          error: "sorry, but your search did not return any results"
        });
      } else {
        this.setState({
          recipes: jasonData.recipes
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.getRecipes();
  }
  displayPage = index => {
    switch (index) {
      default:
      case 1:
        return (
          <RecipeList
            recipes={this.state.recipes}
            handleDetails={this.handleDetails}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            value={this.state.search}
            error={this.state.error}
          />
        );
      case 0:
        return (
          <RecipeDetails
            id={this.state.details_id}
            handleIndex={this.handleIndex}
          />
        );
    }
  };
  handleIndex = index => {
    this.setState({
      indexPage: index
    });
  };
  handleDetails = (index, id) => {
    this.setState({
      indexPage: index,
      details_id: id
    });
  };
  handleChange = e => {
    const value = e.target.value;
    this.setState({
      search: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { base_url, query, search } = this.state;
    this.setState(
      () => {
        return {
          url: base_url + query + search,
          search: ""
        };
      },
      () => {
        this.getRecipes();
      }
    );
  };
  render() {
    /* console.log(this.state.recipes); */
    return (
      <React.Fragment>{this.displayPage(this.state.indexPage)}</React.Fragment>
    );
  }
}

export default App;
