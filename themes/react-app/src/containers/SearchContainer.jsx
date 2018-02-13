import React, {Component} from 'react';
import {withApollo, compose, gql} from 'react-apollo'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {FormControl, FormHelperText} from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import {searchEvents, searchEventsFulfill} from '../actions/searchEventActions';
import {connect} from "react-redux";
import Loader from '../components/Loader';
import EventCard from '../components/Events/EventCard';

const styles = theme => ({
  root: {
    'height': 'inherit'
  },
  searchBar: {
    'display': 'flex',
    'background-color': 'transparent',
    'padding': '15px',
    'align-items': 'center'
  },
  searchFormControl: {
    flex: 1,
  },
  searchedText: {
    flex: 1,
    color: theme.palette.common.lightBlack
  },
  searchText: {
    color: theme.palette.secondary.A700
  },
  searchResultsContainer: {
    // height: '97%',
    // height: `calc(100% - 78px)`,
    height: `calc(100% - 148px)`, // - search bar + nav bar
    overflow: 'scroll',

    // height: '97%', // should be 100% - searchBarhiegit
  },
  searchInnerContainer: {
    display: 'flex',
    'flex-wrap': 'wrap',
    'justify-content': 'center',
  }
});

/**
 * Class Notes: searchText is both a state and prop.
 * state.searchText === Wat the user is typing in the search box
 * props.searchText === text fired as a query
 */
class SearchContainer extends Component {

  state = {
    searchText: '',
  };

  handleSearch = () => {
    // 1. Put search into loading mode
    this.props.dispatch(searchEvents(this.state.searchText));

    // 2. call search events function
    this.searchEvents(this.state.searchText)
      .then(() =>{
        console.log("Finished searching events")
      })

  };

  searchEvents = async () => {
    const {searchText} = this.state;
    // 3. perform search query
    const result = await this.props.client.query({
      query: ALL_EVENTS_SEARCH_QUERY,
      variables: {searchText}
    });
    const events = result.data.searchAllEvents.edges;
    // 4. put results into redux state and remove loading
    this.props.dispatch(searchEventsFulfill(events))
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

    const {classes, searching, searchText, results} = this.props;

    // const SearchResults = () => {
    //   return <div>Search Results</div>
    // };

    const SearchResults = () => {
      if(results.length >= 1) {
        return <div className={classes.searchInnerContainer}>
          {results.map((event, index) => (
            <EventCard key={index} eventObject={event.node} />
          ))}
        </div>
      } else if (results.length === 0) {
        return <div>No Results for {searchText}</div>
      } else {
        return <div>Searching Error</div>
      }
    };

    return (
      <div className="Search__Container">
        <Paper className={classes.root} elevation={4}>

          <div className={classes.searchBar}>
            <Typography variant="title" color="inherit" className={classes.searchedText}>
              {this.props.searchText}
            </Typography>
            <FormControl className={classes.searchFormControl}>
              <InputLabel htmlFor="search">Search</InputLabel>
              <Input
                id="Search input field"
                type={'text'}
                className={classes.searchText}
                value={this.state.searchText}
                onChange={this.handleChange('searchText')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleSearch}
                      onMouseDown={() => {
                        console.log('Search icon mouse down event')
                      }}
                    >
                      <SearchIcon/>
                    </IconButton>

                  </InputAdornment>
                }
              />
            </FormControl>
          </div>

            {searching && <Loader loadingText={searchText} />}
            {!searching && <div className={classes.searchResultsContainer}>
              <SearchResults />
            </div>}

        </Paper>


      </div>
    );
  }
}

SearchContainer.propTypes = {
  classes: PropTypes.object,
};

const ALL_EVENTS_SEARCH_QUERY = gql`
query searchEvents($searchText: String!) {
  searchAllEvents(filter: $searchText) {
    edges {
      node {
        ID
        Title
        Date
        Description
        Venue
        Start
        Finish
        Approved
        Free
        Website
        TicketUrl
        TicketPhone
        Restriction
        SpecEntry
        AccessType
        IsEventFindaEvent
        Thumbnail
        EventFindaUrl
        EventFindaImages {
          edges {
            node {
              URL
              Title
              transformation_id
            }
          }
        }
        LocationText
        Lat
        Lon
        Image {
          ID
        }
        SecondaryTag {
          ID
          Title
        }
      }
    }
  }
}
`;

const reduxWrapper = connect(
  state => ({
    searchText: state.search.searchText,
    results: state.search.results,
    searching: state.search.searching,
    searched: state.search.searched,
    error: state.search.error,
  })
);

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles)
)(SearchContainer);
