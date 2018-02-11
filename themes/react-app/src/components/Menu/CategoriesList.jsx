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

import {connect } from "react-redux";
import {fetchTags, startFetchTags} from '../../actions/tagsReducer'
import {withApollo} from "react-apollo/index";

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

// const CategoriesQuery = gql`
// query getCategories {
//   readHappTags {
//     edges {
//       node {
//         Title
//         Description
//         SecondaryTags {
//           edges {
//             node {
//               Title
//               Description
//               Checked
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `;

const ALL_TAGS_QUERY = gql`
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
              Checked
            }
          }
        }
      }
    }
  }
}
`;



class CategoriesList extends Component {

  fetchTags = async () => {

    const { header} = this.props;

    // 1. Place Component into loading mode
    await this.props.dispatch(startFetchTags());


    // 2. Start Fetching the events
    await this.props.client.query({
      query: ALL_TAGS_QUERY,
    })
      .then((res) => {

        console.log('TAGS ON MOUNT', res);

        let Tags = [];

        res.data.readHappTags.edges.map(edge => {
          console.log(edge);
          Tags.push(edge.node);
        });


        // 3. Events have been updated and loading mode will be false
        this.props.dispatch(fetchTags(Tags));
        // return res.data.getEventsBetween
      })

  };

  componentWillMount() {

    console.log('CATEGORIESLIST PLEASE JUST LOAD ONCE....');

    this.fetchTags().then(() => {
      console.log('EVENTS TAGS HAVE BEEN STORED IN REDUX');
    })
  }

  render() {

    console.log('Categories List render method', this.props);

    const {classes, tags:{fetching, allTags, fetched, error}} = this.props;

    if (fetching) {
      return <CircularProgress className={classes.progress}/>;
    }

    return (
      <div>
        {allTags.map((d,i) =>
          <HappTag name={d.ID} listValue={d} key={i} parentIndex={i} fill={d.color} />
        )}
      </div>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    tags: state.tags
  })
);

export default compose(
  withStyles(styles),
  withApollo,
  reduxWrapper,
  // graphql(CategoriesQuery)
)(CategoriesList);