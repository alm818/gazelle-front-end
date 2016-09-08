import React from 'react';
import BaseComponent from 'lib/BaseComponent';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router';

export default class Archives extends BaseComponent {
  render () {
    let renderIssueList =
      // Render nothing if issues is empty
      _.map((this.props.issues || []), (issue) => {
        return (
          <div key={issue.issueNumber} className="archives__issue-item__title">
            <Link to={"/issue/" + issue.issueNumber + "/"}>
              {"Issue " + issue.issueNumber}
            </Link>
            <h2 className="archives__issue-item__pubDate">{"Published: " + moment(issue.pubDate).format('MMM DD, YYYY').toString()}</h2>
          </div>
        );
      });
    return (
      <div>
        {renderIssueList}
      </div>
    );
  }
}

Archives.propTypes = {
  issues: React.PropTypes.shape({
    issueNumber: React.PropTypes.string,
    pubDate: React.PropTypes.string,
  }),
}
