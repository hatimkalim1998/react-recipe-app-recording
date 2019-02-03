import React, { Component } from "react";
import { recipe } from "../tempDetails";
export default class RecipeDetails extends Component {
  /* constructor(props) {
    super(props);
    this.state = {
      recipe: recipe,
      url:
        "https://www.food2fork.com/api/get?key=d539b2db410257524ed9f3d4bab401d2&rId=" +
        this.props.id
    };
  }

  async componentDidMount() {
    try {
      const data = await fetch(this.state.url);
      const jasonData = await data.json();
      this.setState({
        recipe: jasonData.recipe
      });
    } catch (error) {
      console.log(error);
    }
  } */

  state = {
    recipe: recipe
  };
  async componentDidMount() {
    const id = this.props.id;
    const url =
      "https://www.food2fork.com/api/get?key=d539b2db410257524ed9f3d4bab401d2&rId=" +
      id;
    try {
      const data = await fetch(url);
      const jasonData = await data.json();
      this.setState(
        (state, props) => {
          return { recipe: jasonData.recipe };
        },
        () => {}
      );
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;
    const { handleIndex } = this.props;
    //console.log(this.state.recipe);
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <button
                type="button"
                className="btn btn-warning text-capitalize mb-5"
                onClick={() => handleIndex(1)}
              >
                back to recipe list
              </button>
              <img
                src={image_url}
                alt="recipe"
                className="w-100 d-block img-thumbnail"
              />
            </div>
            {/* details */}
            <div className="col-10 mx-auto col-md-6 my-3">
              <h6 className="text-uppercase">{title}</h6>
              <h6 className="text-warning text-capitalize text-slanted">
                provided by {publisher}
              </h6>
              <a
                href={publisher_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-capitalize mt-2"
              >
                publisher webpage
              </a>
              <a
                href={source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success text-capitalize mt-2 mx-3"
              >
                recipe url
              </a>
              <ul className="list-group mt-4">
                <h2 className="mt-3 mb-4">Ingredients</h2>
                {ingredients.map((item, index) => {
                  return (
                    <li className="list-group-item text-slanted" key={index}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
