import React, {Component} from 'react';
import {gql, graphql, compose} from 'react-apollo';
import {withStyles} from 'material-ui/styles';
import {CircularProgress} from 'material-ui/Progress';

const styles = theme => ({
  progress: {
    margin: '100px'
  }
});

const EventQuery = gql`
query readEvents {
  readEvents {
    edges {
      node {
        ID
        ...EventOverview
      }
    }
  }
}

fragment EventOverview on Event {
      Title
      Owner {
        Name
        Surname
      }
      Category {
        Name
        BgColor
      }
    }
`;

class EventList extends Component {
  render() {
    const {classes, data: {loading, readEvents}} = this.props;

    if (loading) {
      return <CircularProgress className={classes.progress}/>;
    }

    let Events = [];

    readEvents.edges.map(edge => {
      Events.push(edge.node);
    });

    return Events;
  }
}

export default compose(
  withStyles(styles),
  graphql(EventQuery)
)(EventList);