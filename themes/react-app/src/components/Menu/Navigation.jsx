import React, {Component} from 'react';
import {gql} from 'react-apollo';
import {propType as fragmentPropType} from 'graphql-anywhere';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import LeftArrow from 'material-ui-icons/KeyboardArrowLeft';
import RightArrow from 'material-ui-icons/KeyboardArrowRight';
import IconButton from 'material-ui/IconButton';

const styles = {
  LogosWrapper: {
    'display': 'flex',
    'flex': '1',
    'align-items': 'center',
    'justify-content': 'center',
    'min-height': '70px'
  },
  Arrow: {
    'height': '30px'
  },
  iconStyles: {
    'marginRight': '24px',
  },
  CurrentMonth: {
    'padding': '0 10px'
  },
  ArrowButton: {
    'width': '48px',
    'height': '48px',
    'padding': '2px',
  },
  ArrowIcon: {
    'font-size': '36px'
  }
};

class Navigation extends Component {


  constructor(props) {
    super(props);

    this.state = {
      currentMonth: null,
      currentYear: null
    };

    this.leftNavClick = this.leftNavClick.bind(this);
    this.rightNavClick = this.rightNavClick.bind(this);

  }

  leftNavClick() {
    this.setState({currentMonth: 'Left'})
  }

  rightNavClick() {
    this.setState({currentMonth: 'Right'})
  }

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.LogosWrapper}>
        <IconButton
          className={classes.ArrowButton}
          onClick={this.props.previousMonthClick}
        >

          <LeftArrow className={classes.ArrowIcon} />
        </IconButton>
        <h1 className={classes.CurrentMonth}>{this.props.currentMonth + this.props.currentYear}</h1>
        <IconButton
          className={classes.ArrowButton}
          onClick={this.props.nextMonthClick}
        >
          <RightArrow className={classes.ArrowIcon} />
        </IconButton>

      </div>
    );
  }
}

export default withStyles(styles)(Navigation);