import React from 'react';
import Helmet from 'react-helmet'; // Add <head> meta data
import FalcorController from 'lib/falcor/FalcorController';

// Components
import NotFound from 'components/NotFound';
import IssueList from 'components/IssueList';

export default class ArchivesController extends FalcorController {
  static getFalcorPathSets(params) {
    // URL Format: thegazelle.org/author/:authorSlug

    // Multilevel request requires Falcor Path for each level of data requested
    return [
      ["issues", {length:10}, ["issueNumber", "pubDate"]],
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
        const issueData = this.state.data.issues;
        const meta = [
          // Search results
          {name: "description", content: "The Gazelle is a weekly student publication, serving the NYU Abu Dhabi community and the greater Global Network University at NYU."},

          // Social media
          {property: "og:title", content: "Archives | The Gazelle"},
          {property: "og:type", content: "website"},
          {property: "og:url", content: "beta.thegazelle.org/archives"},
          {property: "og:description", content: "The Gazelle is a weekly student publication serving the NYU Abu Dhabi community."},
        ];
        return (
          <div>
            <Helmet
              meta={meta}
              title={"Archives | The Gazelle"}
            />
            <IssueList issues={issueData} />
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
