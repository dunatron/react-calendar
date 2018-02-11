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
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon/>
              </IconButton>
            }
            title={EventData.Title}
            subheader={EventData.Date}
          />
          <CardMedia
            className={classes.media}
            image="http://via.placeholder.com/350x150"
            title="Contemplative Reptile"
          />
          <CardContent>
            <div className={classes.timeHolder}>
              <TimeIcon/> {EventData.Start} - {EventData.Finish}
            </div>
            <div>
              <LocationIcon/> {EventData.LocationText}
            </div>
            <Typography component="p">
              {EventData.Description}
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon/>
            </IconButton>
            <CopyToClipboard text={window.location.href} onCopy={this.onCopy}>
              <IconButton aria-label="Share">
                <ShareIcon/>
              </IconButton>
            </CopyToClipboard>
            <div>
              {this.state.copied ? <span >Copied.</span> : null}
            </div>
            <IconButton aria-label="show-map" onClick={this.toggleDrawer('bottomDraw', true)}>
              <MapIcon/>
            </IconButton>

            <div className={classes.flexGrow}/>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon/>
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph type="body2">
                Full Description:
              </Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                the rice, and cook again without stirring, until mussels have opened and rice is
                just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Drawer
          anchor="bottom"
          open={this.state.bottomDraw}
          onRequestClose={this.toggleDrawer('bottomDraw', false)}
        >
          <div>
            <HappMap defaultZoom={15} lat={parseFloat(EventData.Lat)} lng={parseFloat(EventData.Lon)}/>
          </div>
        </Drawer>
      </div>
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
    EventFindaID
    EventFindaUrl
    LocationText
    Lat
    Lon
  }
}
`;

export default compose(
  withStyles(styles),
  graphql(SingleEventQuery)
)(EventDataSheet);