import React from 'react';
import Helmet from 'react-helmet'; // Add <head> data=
import FalcorController from 'lib/falcor/FalcorController';

// Components
import Author from 'components/Author';
import NotFound from 'components/NotFound';

export default class AuthorController extends FalcorController {
  static getFalcorPathSets(params) {
    // URL Format: thegazelle.org/author/:authorSlug

    // Multilevel request requires Falcor Path for each level of data requested
    return [
      ["authorsBySlug", params.authorSlug, ["name", "biography", "slug", "job_title", "image"]],
      ["authorsBySlug", params.authorSlug, "articles", {"to": 10}, ["title", "image", "teaser", "issueNumber", "category", "slug"]],
      ["authorsBySlug", params.authorSlug, "articles", {"to": 10}, "authors", {to: 10}, ["name", "slug"]],
    ];
  }

  // TODO: list all articles written by author x
  render() {
    if (this.state.ready) {
      if (this.state.data == null) {
        return (
          <NotFound />
        );
      } else {
        let authorSlug = this.props.params.authorSlug;
        const authorData = this.state.data.authorsBySlug[authorSlug];
        if (!authorData.image) { // Default image for authors without one
          authorData.image = "http://0.gravatar.com/avatar/c63ec0271e2c8a10b2e343bbd1dec547?s=200&d=http%3A%2F%2F0.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D200&r=G";
        }
        if (!authorData.job_title) { // Default job title for authors without one
          authorData.job_title = "Contributor";
        }
        const meta = [
          // Search results
          {name: "description", content: authorData.biography},

          // Social media
          {property: "og:title", content: authorData.name + " | The Gazelle"},
          {property: "og:type", content: "website"},
          {property: "og:url", content: "beta.thegazelle.org/author/" + authorData.slug},
          {property: "og:description", content: authorData.biography},
        ];
        return (
          <div>
            <Helmet
              meta={meta}
              title={authorData.name + " | The Gazelle"}
            />
            <Author author={authorData} />
          </div>
        );
      }
    } else {
      return (
        <div>
          Loading
        </div>
      );
    }
  }
}
