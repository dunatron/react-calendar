import React, {Component} from 'react';
import {withStyles} from "material-ui/styles/index";
import {compose} from "react-apollo/index";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import SecondaryCategories from './SecondaryTagsList';

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

class HappTag extends Component {


  state = { open: false };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {

    const {classes, listValue} = this.props;

    const HappTagTitle = listValue.Title;
    const SecondaryTags = listValue.SecondaryTags.edges;

    return <List>
      <ListItem button onClick={this.handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary={HappTagTitle} />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {/*<Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit>*/}
        {/*<SecondaryCategories categories={SecondaryTags} />*/}
      {/*</Collapse>*/}
      <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit={false}>
        <SecondaryCategories categories={SecondaryTags} />
      </Collapse>
    </List>

  }
}

export default compose(
  withStyles(styles),
)(HappTag);