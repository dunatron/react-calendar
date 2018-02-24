import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

import {addFilterTag, removerFilterTag} from "../../actions/tagsReducer";
import {compose, withApollo} from "react-apollo/index";
import {connect} from "react-redux";

const styles = theme => ({
  paper: {
    'height': 'auto',
    'width': 'auto',
    'margin': '1.2em',
    'padding': '1.2em',
    'text-align': 'center',
    'display': 'inline-block',
  },
  list: {
    color: theme.palette.primary.main
  }
});

class SecondaryTagsList extends Component {

  state = {
    checked: [0]
  };

  handleToggle = value => () => {
    const {checked} = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      // add to redux filter
      newChecked.push(value);
      this.props.dispatch(addFilterTag(value.Title))
      this.props.updateCheckNumber(+1);
    } else {
      // remove from redux filter
      newChecked.splice(currentIndex, 1);
      this.props.dispatch(removerFilterTag(value.Title))
      this.props.updateCheckNumber(-1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {

    const {classes} = this.props;

    const categoriesList = this.props.categories;

    return (
      <List className={classes.list}>
        {categoriesList.map((d, i) =>
          <ListItem
            key={i}
            dense={true}
            button
            onClick={this.handleToggle(d, i)}
            className={classes.listItem}
          >
            <Checkbox
              checked={this.state.checked.indexOf(d) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={d.Title}/>
          </ListItem>
        )}
      </List>
    );
  }
}

const reduxWrapper = connect(
  state => ({
    // tags: state.tags
  })
);

export default compose(
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(SecondaryTagsList);