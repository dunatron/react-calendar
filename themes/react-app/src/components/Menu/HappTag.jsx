import React, { Component } from "react"
import { withStyles } from "material-ui/styles/index"
import { compose } from "react-apollo/index"
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import Collapse from "material-ui/transitions/Collapse"
import FolderIcon from "material-ui-icons/Folder"
import ExpandLess from "material-ui-icons/ExpandLess"
import ExpandMore from "material-ui-icons/ExpandMore"
import SecondaryCategories from "./SecondaryTagsList"

const styles = theme => ({
  progress: {
    margin: "100px",
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.main,
    //backgroundColor: theme.palette.primary.main,
  },
  MuiListItemIcon: {
    color: theme.palette.secondary.main,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  button: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
  checkedNumber: {
    color: theme.palette.primary.main,
  },
})

class HappTag extends Component {
  state = {
    open: false,
    numberOfTagsChecked: 0,
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  changeNumberChecked = num => {
    this.setState({
      numberOfTagsChecked: this.state.numberOfTagsChecked + num,
    })
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (nextState.open !== this.state.open)
  //     || (nextState.numberOfTagsChecked !== this.state.numberOfTagsChecked);
  // }
  shouldComponentUpdate(nextProps, nextState) {
    //return false
    if (nextState.open !== this.state.open) {
      return true
    }
    return false
  }

  render() {
    const { classes, listValue } = this.props

    const HappTagTitle = listValue.Title
    const SecondaryTags = listValue.SecondaryTags

    return (
      <List className={classes.root}>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon className={classes.MuiListItemIcon}>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText inset primary={HappTagTitle} />
          {this.state.numberOfTagsChecked !== 0 && (
            <span className={classes.checkedNumber}>
              {this.state.numberOfTagsChecked}
            </span>
          )}
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          component="li"
          in={this.state.open}
          timeout="auto"
          unmountOnExit={false}>
          <SecondaryCategories
            categories={SecondaryTags}
            updateCheckNumber={num => this.changeNumberChecked(num)}
          />
        </Collapse>
      </List>
    )
  }
}

export default compose(withStyles(styles))(HappTag)
