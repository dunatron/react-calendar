import React, {Component} from 'react';
import CalendarMenu from './components/CalendarMenu';
import CalendarBody from './components/CalendarBody';

import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import {gql, graphql, compose, buildSchema} from 'react-apollo';
import {execute} from 'graphql'; // ES6
import EventList from './components/Events/EventList';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import DisplayEventModal from './components/Modals/DisplayEventModal';
import './sass/App.scss';
import {CircularProgress} from 'material-ui/Progress';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/calendarApp';

// import LoginForm from './containers/JWTLoginForm';
import LoginForm from './components/Login';


/**
 *
 * https://material-ui-next.com/demos/buttons/
 */

const validateToken = gql`
query validateToken {
    validateToken {
      Valid
      Message
      Code
    }
}`;

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
      Date
      Owner {
        Name
        Surname
      }
      SecondaryTag {
        Title
        Description
      }
    }
`;

const EventQueryWithParam = gql`
query readEvents($startDate: String!, $endDate: String!) {
  readEvents(startDate: $startDate, endDate: $endDate) {
    edges {
      node {
        ID
        ...EventOverview
      }
    }
  }
}

fragment EventOverview on Event {
      ID
      Title
      SecondaryTag {
        Title 
       }
      Owner {
        Name
        Surname
      }
    }
`;


const theme = createMuiTheme({
  "direction": "ltr",
  "palette": {
    "common": {
      "black": "#000",
      "white": "#fff",
      "transparent": "rgba(0, 0, 0, 0)",
      "fullBlack": "rgba(0, 0, 0, 1)",
      "darkBlack": "rgba(0, 0, 0, 0.87)",
      "lightBlack": "rgba(0, 0, 0, 0.54)",
      "minBlack": "rgba(0, 0, 0, 0.26)",
      "faintBlack": "rgba(0, 0, 0, 0.12)",
      "fullWhite": "rgba(255, 255, 255, 1)",
      "darkWhite": "rgba(255, 255, 255, 0.87)",
      "lightWhite": "rgba(255, 255, 255, 0.54)"
    },
    "type": "dark",
    "primary": {
      "50": "#e3f2fd",
      "100": "#bbdefb",
      "200": "#90caf9",
      "300": "#64b5f6",
      "400": "#42a5f5",
      "500": "#2196f3",
      "600": "#1e88e5",
      "700": "#1976d2",
      "800": "#1565c0",
      "900": "#0d47a1",
      "A100": "#82b1ff",
      "A200": "#448aff",
      "A400": "#2979ff",
      "A700": "#2962ff",
      "contrastDefaultColor": "light"
    },
    "secondary": {
      "50": "#fce4ec",
      "100": "#f8bbd0",
      "200": "#f48fb1",
      "300": "#f06292",
      "400": "#ec407a",
      "500": "#e91e63",
      "600": "#d81b60",
      "700": "#c2185b",
      "800": "#ad1457",
      "900": "#880e4f",
      "A100": "#ff80ab",
      "A200": "#ff4081",
      "A400": "#f50057",
      "A700": "#c51162",
      "contrastDefaultColor": "light"
    },
    "error": {
      "50": "#ffebee",
      "100": "#ffcdd2",
      "200": "#ef9a9a",
      "300": "#e57373",
      "400": "#ef5350",
      "500": "#f44336",
      "600": "#e53935",
      "700": "#d32f2f",
      "800": "#c62828",
      "900": "#b71c1c",
      "A100": "#ff8a80",
      "A200": "#ff5252",
      "A400": "#ff1744",
      "A700": "#d50000",
      "contrastDefaultColor": "light"
    },
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#d5d5d5",
      "A200": "#aaaaaa",
      "A400": "#303030",
      "A700": "#616161",
      "contrastDefaultColor": "dark"
    },
    "shades": {
      "dark": {
        "text": {
          "primary": "rgba(255, 255, 255, 1)",
          "secondary": "rgba(255, 255, 255, 0.7)",
          "disabled": "rgba(255, 255, 255, 0.5)",
          "hint": "rgba(255, 255, 255, 0.5)",
          "icon": "rgba(255, 255, 255, 0.5)",
          "divider": "rgba(255, 255, 255, 0.12)",
          "lightDivider": "rgba(255, 255, 255, 0.075)"
        },
        "input": {
          "bottomLine": "rgba(255, 255, 255, 0.7)",
          "helperText": "rgba(255, 255, 255, 0.7)",
          "labelText": "rgba(255, 255, 255, 0.7)",
          "inputText": "rgba(255, 255, 255, 1)",
          "disabled": "rgba(255, 255, 255, 0.5)"
        },
        "action": {
          "active": "rgba(255, 255, 255, 1)",
          "disabled": "rgba(255, 255, 255, 0.3)"
        },
        "background": {
          "default": "#303030",
          "paper": "#424242",
          "appBar": "#212121",
          "contentFrame": "#212121"
        },
        "line": {
          "stepper": "#bdbdbd"
        }
      },
      "light": {
        "text": {
          "primary": "rgba(0, 0, 0, 0.87)",
          "secondary": "rgba(0, 0, 0, 0.54)",
          "disabled": "rgba(0, 0, 0, 0.38)",
          "hint": "rgba(0, 0, 0, 0.38)",
          "icon": "rgba(0, 0, 0, 0.38)",
          "divider": "rgba(0, 0, 0, 0.12)",
          "lightDivider": "rgba(0, 0, 0, 0.075)"
        },
        "input": {
          "bottomLine": "rgba(0, 0, 0, 0.42)",
          "helperText": "rgba(0, 0, 0, 0.54)",
          "labelText": "rgba(0, 0, 0, 0.54)",
          "inputText": "rgba(0, 0, 0, 0.87)",
          "disabled": "rgba(0, 0, 0, 0.42)"
        },
        "action": {
          "active": "rgba(0, 0, 0, 0.54)",
          "disabled": "rgba(0, 0, 0, 0.26)"
        },
        "background": {
          "default": "#fafafa",
          "paper": "#fff",
          "appBar": "#f5f5f5",
          "contentFrame": "#eeeeee"
        },
        "line": {
          "stepper": "#bdbdbd"
        }
      }
    },
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "hint": "rgba(0, 0, 0, 0.38)",
      "icon": "rgba(0, 0, 0, 0.38)",
      "divider": "rgba(0, 0, 0, 0.12)",
      "lightDivider": "rgba(0, 0, 0, 0.075)"
    },
    "input": {
      "bottomLine": "rgba(0, 0, 0, 0.42)",
      "helperText": "rgba(0, 0, 0, 0.54)",
      "labelText": "rgba(0, 0, 0, 0.54)",
      "inputText": "rgba(0, 0, 0, 0.87)",
      "disabled": "rgba(0, 0, 0, 0.42)"
    },
    "action": {
      "active": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.26)"
    },
    "background": {
      "default": "#fafafa",
      "paper": "#fff",
      "appBar": "#f5f5f5",
      "contentFrame": "#eeeeee"
    },
    "line": {
      "stepper": "#bdbdbd"
    }
  },
  "typography": {
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "display4": {
      "fontSize": "7rem",
      "fontWeight": 300,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "letterSpacing": "-.04em",
      "lineHeight": "1.14286em",
      "marginLeft": "-.06em",
      "color": "rgba(0, 0, 0, 0.54)"
    },
    "display3": {
      "fontSize": "3.5rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "letterSpacing": "-.02em",
      "lineHeight": "1.30357em",
      "marginLeft": "-.04em",
      "color": "rgba(0, 0, 0, 0.54)"
    },
    "display2": {
      "fontSize": "2.8125rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.06667em",
      "marginLeft": "-.04em",
      "color": "rgba(0, 0, 0, 0.54)"
    },
    "display1": {
      "fontSize": "2.125rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.20588em",
      "marginLeft": "-.04em",
      "color": "rgba(0, 0, 0, 0.54)"
    },
    "headline": {
      "fontSize": "1.5rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.35417em",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    "title": {
      "fontSize": "1.3125rem",
      "fontWeight": 500,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.16667em",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    "subheading": {
      "fontSize": "1rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.5em",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    "body2": {
      "fontSize": "0.875rem",
      "fontWeight": 500,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.71429em",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    "body1": {
      "fontSize": "0.875rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.46429em",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    "caption": {
      "fontSize": "0.75rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.375em",
      "color": "rgba(0, 0, 0, 0.54)"
    },
    "button": {
      "fontSize": "0.875rem",
      "textTransform": "uppercase",
      "fontWeight": 500,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
    }
  },
  "mixins": {
    "toolbar": {
      "minHeight": 56,
      "@media (min-width:0px) and (orientation: landscape)": {
        "minHeight": 48
      },
      "@media (min-width:600px)": {
        "minHeight": 64
      }
    }
  },
  "breakpoints": {
    "keys": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 960,
      "lg": 1280,
      "xl": 1920
    }
  },
  "shadows": [
    "none",
    "0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
    "0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    "0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)",
    "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    "0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)",
    "0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
    "0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
    "0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
    "0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
    "0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)",
    "0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
    "0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
    "0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)"
  ],
  "transitions": {
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    }
  },
  "spacing": {
    "unit": 8
  },
  "zIndex": {
    "mobileStepper": 900,
    "menu": 1000,
    "appBar": 1100,
    "drawerOverlay": 1200,
    "navDrawer": 1300,
    "dialogOverlay": 1400,
    "dialog": 1500,
    "layer": 2000,
    "popover": 2100,
    "snackbar": 2900,
    "tooltip": 3000
  },
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(135deg, #FFAB8E 0%, #FF865D 33%, #FF6733 71%, #C13100 91%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
  },
});

const styles = {
  Calendar: {
    'width': '100%',
    'height': '100%',
  },
  card: {
    'minWidth': 'min-content',
    'maxWidth': '300px',
    'flex-shrink': '0',
    'margin': '10px',
  },
  media: {
    height: 200,
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    const theClient = props.theCient;

    this.state = {
      currentDate: moment(),
      currentMonth: null,
      currentYear: null,
      monthName: null,
      events: [],
      client: theClient,
      modalIsOpen: false,
      open: false,
      currentEvent: {
        ID: 5,
        Title: null
      }
    };

    this.sampleStore = {
      EventTitle: 'LOLZ',
      CurrentMonth: 'March'
    };

    this.nextMonthClick = this.nextMonthClick.bind(this);
    this.previousMonthClick = this.previousMonthClick.bind(this);
    this.eventClick = this.eventClick.bind(this);
    // Modal state
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    // This is the only lifecycle hook called on server rendering.
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = async () => {

    console.group('THE PROPS RENDER YOUR EXPORTED GRAPHQL');
    console.log(this.props);
    console.log(this.props.fetchEventsQuery);


    await this.props.fetchEventsQuery.refetch({
      // variables: {
      //   linkId,
      // },
      // update: (store, { data: { vote } }) => {
      //   this.props.updateStoreAfterVote(store, vote, linkId)
      // },
    }) .then((response) => {
      console.log('AWAIT IS DONE');
      console.log(response);
      this.setState({
        events: response.data.readEvents.edges
      });
    });


    console.groupEnd();

    // this.state.client.query({query: EventQuery}).then((value) => {
    //   this.setState({events: value.data.readEvents.edges, loading: false})
    // });

    // await this.props.readEvents({
    //   variables: {
    //     linkId,
    //   },
    //   update: (store, { data: { vote } }) => {
    //     this.props.updateStoreAfterVote(store, vote, linkId)
    //   },
    // })
  };

  runQuery() {
    // http://graphql.org/graphql-js/passing-arguments/
    // https://www.howtographql.com/react-apollo/0-introduction/
    this.state.client.query({
      query: EventQueryWithParam,
    }).then((value) => {
      console.group('runQuery in App.jsx');
      console.log(value);
      console.groupEnd();
    });
  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  eventClick(id, title) {
    this.setState({
      currentEvent: {
        ID: id,
        Title: title
      }
    });
    this.openModal();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  nextMonthClick(e) {
    e.preventDefault();
    let currentDate = this.state.currentDate;

    currentDate.add(1, 'M');

    this.setState({
      currentDate: currentDate,
    });

    this.fetchEvents();
  }

  previousMonthClick(e) {
    e.preventDefault();
    let currentDate = this.state.currentDate;

    currentDate.add(-1, 'M');

    this.setState({
      currentDate: currentDate,
    });

    this.fetchEvents();
    this.runQuery();
  }


  render() {

    const {classes} = this.props;

    const {data: {validateToken, }, fetchEventsQuery: {loading, readEvents}} = this.props;

    if (loading) {
      return <CircularProgress className={classes.progress}/>;
    }

    console.group('App.jsx PROPS & token & events edges');
    console.log('PROPS');
    console.log(this.props);
    console.log('TOKEN');
    console.log(validateToken);
    console.log('Events Edges');
    console.log(readEvents.edges);
    console.groupEnd();

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.Calendar}>
          <CalendarMenu currentDate={this.state.currentDate}
                        nextMonthClick={this.nextMonthClick}
                        previousMonthClick={this.previousMonthClick}
          />

          {validateToken.Valid && 'You are logged in.'}
          {!validateToken.Valid && <LoginForm />}

          <CalendarBody currentDate={this.state.currentDate} events={this.state.events} eventClick={this.eventClick}/>

          <DisplayEventModal eventID={this.state.currentEvent.ID} isOpen={this.state.modalIsOpen}
                             eventData={this.state.currentEvent}/>

        </div>
      </MuiThemeProvider>
    )
  }
}

// export default App;
export default compose(
  graphql(validateToken),
  graphql(EventQuery, { name: 'fetchEventsQuery' }),
  withStyles(styles)
)(App);
