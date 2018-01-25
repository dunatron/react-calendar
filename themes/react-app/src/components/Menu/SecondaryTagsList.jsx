import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';

const styles = {

  paper: {
    'height': 'auto',
    'width': 'auto',
    'margin': '1.2em',
    'padding': '1.2em',
    'text-align': 'center',
    'display': 'inline-block',
  }

};

class SecondaryTagsList extends Component {

  state = {
    checked: [0],
  };

  handleToggle = value => () => {
    const {checked} = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  render() {

    const {classes} = this.props;

    const categoriesList = this.props.categories;

    return (
      <List>
        {categoriesList.map((d,i) =>
          <ListItem
            key={i}
            dense
            button
            onClick={this.handleToggle(d)}
            className={classes.listItem}
          >
            <Checkbox
              checked={this.state.checked.indexOf(d) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={d.node.Title}/>
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <CommentIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    );
  }
}

export default withStyles(styles)(SecondaryTagsList);