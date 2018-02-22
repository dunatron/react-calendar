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
import {gql, compose} from 'react-apollo';
import {withStyles} from 'material-ui/styles';
import Loader from '../components/Loader';
import HappTag from '../components/Menu/HappTag';

import {connect } from "react-redux";
import {fetchTags, startFetchTags} from '../actions/tagsReducer'
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

const ALL_TAGS_QUERY = gql`
query getCategories {
  readHappTags {
    ID
    Title
    SecondaryTags {
      Title
      Checked
      HappTagID
    }
  }
}
`;


class CategoriesList extends Component {

  fetchTags = async () => {
    // 1. Place Component into loading mode
    this.props.dispatch(startFetchTags());
    // 2. Start Fetching the tags
    this.props.client.query({
      query: ALL_TAGS_QUERY,
    })
    // 3. tags have been fetched, do something with them
      .then((res) => {
        this.props.dispatch(fetchTags(res.data.readHappTags));
      })
  };

  componentWillMount() {
    this.fetchTags().then(() => {
      console.log('Tags have been loaded into redux store');
    })
  }

  render() {

    const {classes, tags:{fetching, allTags, fetched, error}} = this.props;

    if (fetching) {
      return <Loader loadingText={"fetching tags"} size={20} fontSize={18}/>;
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