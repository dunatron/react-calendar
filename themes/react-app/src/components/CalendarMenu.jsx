import React, { Component } from "react"
import { withStyles } from "material-ui/styles"
import Logos from "./Menu/Logos"
import Navigation from "./Menu/Navigation"
import Actions from "./Menu/Actions"

const styles = theme => ({
  MainMenu: {
    display: "flex",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("md")]: {
    MainMenu: {
      flexWrap: "nowrap",
      maxHeight: `${theme.spec.menuDesktopHeight}px`,
    },
  },
})

class CalendarMenu extends Component {
  shouldComponentUpdate(nextProps) {
    return false
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.MainMenu}>
        <Logos />
        <Navigation />
        <Actions />
      </div>
    )
  }
}

export default withStyles(styles)(CalendarMenu)
