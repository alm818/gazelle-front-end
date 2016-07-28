import { Route, IndexRoute } from 'react-router';
import React from 'react';
import AppController from 'components/AppController';
import ArticleController from 'components/ArticleController';
import AuthorController from 'components/AuthorController';
import IssueController from 'components/IssueController';
import CategoryController from 'components/CategoryController';
import TextPageController from 'components/TextPageController';
import NotFound from 'components/NotFound';
// import TeamController from "components/Team";
// import ArchivesController from "components/Archives";

// <Route path="issue/:issueId/:category/:articleSlug" component={ArticleController} />

// <Route path="team" component={TeamController} />
// <Route path="archives" component={ArchivesController} />
export default (
  <Route path="/" component={AppController}>
    <Route path="issue/:issueId/:articleCategory/:articleSlug" component={ArticleController} />
    <Route path="author/:authorSlug" component={AuthorController} />
    <Route path="issue/:issueId" component={IssueController} />
    <Route path="category/:category" component={CategoryController} />
    <Route path=":slug" component={TextPageController} />
    <IndexRoute component={IssueController} />
  </Route>
);