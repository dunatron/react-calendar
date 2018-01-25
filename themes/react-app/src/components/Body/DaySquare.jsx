import React, {Component} from 'react';
import {gql} from 'react-apollo';
import {propType as fragmentPropType} from 'graphql-anywhere';
import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import Day from './DaySquare.jsx';


const styles = {
  LogosWrapper: {
    'display': 'flex',
    'flex': '1',
    'min-height': '70px',
    'align-items': 'center',
    'justify-content': 'center'

  },
  Logo: {
    'padding': '10px',
    'height': '80px',
    'animation': 'App-logo-spin infinite 20s linear',
  }
};

class DaySquare extends Component {

  constructor(props) {
    super(props)

    const {currentDate} = props;

    this.state = {
      events: [props.events]
    };
    this.eventClick = this.eventClick.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      events: [nextProps.events]
    })
  }

  eventClick(id, title) {
    console.log(id);
    console.log(title);
  }



  renderEvents() {
    const events = this.state.events[0];

    const listItems = events.map((d) => <div
      className="event_card" key={d.node.ID}
      // onClick={() => this.eventClick(d.node.ID, d.node.Title)}
      //onClick={this.props.eventClick}
      onClick={()=>this.props.eventClick(d.node.ID, d.node.Title)}
    >
      {d.node.Title}
      </div>);

    return (
      <div className="events_wrapper">
        {listItems }
      </div>
    );
  }

  render() {

    const {classes} = this.props;

    return (
      <div className={this.props.className} >
        <span className="day_number">{this.props.dayNumber}</span>
        <div className="inner_square">
          {this.renderEvents()}
        </div>
      </div>
  );
  }
}

export default withStyles(styles)(DaySquare);