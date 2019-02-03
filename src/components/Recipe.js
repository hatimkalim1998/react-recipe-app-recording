import React, { Component } from "react";

export default class Recipe extends Component {
  render() {
    const {
      image_url,
      publisher,
      source_url,
      title,
      recipe_id
    } = this.props.recipe;
    const { handleDetails } = this.props;
    return (
      <React.Fragment>
        <div className="col-10 col-md-6 col-lg-4 mx-auto my-3">
          <div className="card shadow-sm">
            <img
              src={image_url}
              alt="recipe"
              className="img-card-top"
              style={{ height: "14rem" }}
            />
            <div className="card-body text-capitalize">
              <h6>{title}</h6>
              <div className="text-warning text-slanted">
                provided by {publisher}
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-primary text-capitalize"
                type="button"
                onClick={() => handleDetails(0, recipe_id)}
              >
                details
              </button>
              <a
                href={source_url}
                className="btn btn-success mx-3 text-capitalize"
                target="_blank"
                rel="noopener noreferrer"
              >
                recipe url
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
