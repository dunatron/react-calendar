/**



 query getCategories {
  readHappTags {
    edges {
      node {
        Title
        Description
        SecondaryTags {
          edges {
            node {
              Title
              Description
            }
          }
        }
      }
    }
  }
}

 **/

import React, {Component} from 'react';
import {gql, graphql, compose} from 'react-apollo';
import {withStyles} from 'material-ui/styles';
import {CircularProgress} from 'material-ui/Progress';
import HappTag from './HappTag';


const styles = theme => ({
  progress: {
    margin: '100px'
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const CategoriesQuery = gql`
query getCategories {
  readHappTags {
    edges {
      node {
        Title
        Description
        SecondaryTags {
          edges {
            node {
              Title
              Description
            }
          }
        }
      }
    }
  }
}
`;



class CategoriesList extends Component {

  render() {
    const {classes, data: {loading, readHappTags}} = this.props;

    if (loading) {
      return <CircularProgress className={classes.progress}/>;
    }

    console.log(readHappTags);
    let Events = [];

    readHappTags.edges.map(edge => {
      console.log(edge);
      Events.push(edge.node);
    });

    console.group('EVENTS');
    console.log(Events);
    console.groupEnd();

    return (
      <div>
        {Events.map((d,i) =>
          <HappTag name={d.ID} listValue={d} key={i} fill={d.color} />
        )}
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  graphql(CategoriesQuery)
)(CategoriesList);