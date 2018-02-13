import React, {Component} from 'react';
import {gql, graphql, compose} from 'react-apollo';

import {withStyles} from 'material-ui/styles';
import classnames from 'classnames';
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Drawer from 'material-ui/Drawer';
import MapIcon from 'material-ui-icons/Map';
import TimeIcon from 'material-ui-icons/AccessTime';
import LocationIcon from 'material-ui-icons/LocationOn';
import {CircularProgress} from 'material-ui/Progress';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import HappMap from '../HappMap';

import EventCard from './EventCard';

const customStyles = {
  content : {
    'width': 'max-content',
    'margin': 'auto',
    'overflow-x': 'hidden'
  }
};

const styles = theme => ({
  card: {
    'alignSelf': 'stretch',
    'maxWidth': '450px',
    'flex-shrink': '0',
    'margin': '10px',
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  closeButton: {
    'left': '30px',
    'float': 'right',
    'top': '-30px'
  },
  list: {
    width: 250,
  },
  listFull: {
    width: 'auto',
  },
  timeHolder: {
    'display': 'flex',
    'align-items': 'center'
  },
  MyModal: {
    'width': 'max-content'
  },
});

class EventDataSheet extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      bottomDraw: false,
      eventData: {},
      clipboardValue: '',
      copied: false
    };

  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  componentWillReceiveProps(nextProps) {
    //eventData
    this.setState({
      eventData: nextProps.eventData
    })
  }

  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  onChange = ({target: {value}}) => {
    this.setState({value, copied: false});
  };


  onCopy = () => {
    this.setState({
      copied: true
    });
  };


  render() {

    const {classes, data: {loading, getSingleEvent}, eventTitle} = this.props;

    if (loading) {
      return <div>
        <h2>Loading {eventTitle} %s Data</h2>
        <CircularProgress className={classes.progress}/>
      </div>;
    }

    const EventData = getSingleEvent[0];

    console.group('Event Data Card');
    console.log(getSingleEvent[0]);
    console.groupEnd();

    return (
      <EventCard eventObject={EventData} />
    );
  }
}


const SingleEventQuery = gql`
query getEventByIDQuery($eventID: ID!) {
  getSingleEvent(ID: $eventID) {
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
`;

export default compose(
  withStyles(styles),
  graphql(SingleEventQuery)
)(EventDataSheet);