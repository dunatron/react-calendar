import React, {Component} from "react";
import {connect } from "react-redux";
import {setUserName} from "../actions/userActions";

@connect((store) => {
  return {
    user: store.user,
    events: store.event
  }
})

export default class TestLayout extends Component {

  componentWillMount() {
    this.props.dispatch(setUserName("HAHAhAH"))
  }

  fetchEvents = async () => {

    await this.props.fetchEventsQuery.refetch({

    }) .then((response) => {
      this.setState({
        events: response.data.readEvents.edges
      });
    });

  };

  render() {

    const {user, events} = this.props;

    console.log(user);
    console.log(events);

    return (
      <div>
        <input value={user.user.name}/>
        <button onClick={() =>{this.props.dispatch(setUserName("Dunatron"))}}>Change</button>
        {user.user.name}

      </div>
    );
  }

}