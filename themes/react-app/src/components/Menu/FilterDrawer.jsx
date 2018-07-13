import React from "react"
import { withStyles } from "material-ui/styles"
import IconButton from "material-ui/IconButton"
import CloseIcon from "material-ui-icons/Close"
import CategoriesList from "../../containers/CategoriesListContainer"

import { Drawer } from "material-ui"
import { compose } from "react-apollo/index"

const drawerWidth = 240
const styles = theme => ({
  root: {
    color: theme.palette.primary.main,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "absolute",
    height: "100%",
    width: drawerWidth,
  },
  paper: {
    height: "auto",
    width: "auto",
    margin: "1.2em",
    padding: "1.2em",
    "text-align": "center",
    display: "inline-block",
  },
  closeFilterIcon: {
    color: theme.palette.secondary.main,
  },
})

const FilterDrawer = ({
  classes,
  actionsBarIsFixed,
  height,
  isOpen,
  close,
}) => {
  const fixedFilterStyle = {
    minHeight: height,
  }
  return (
    <Drawer
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      style={actionsBarIsFixed ? fixedFilterStyle : {}}
      anchor="left"
      open={isOpen}
      onClose={() => close()}>
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <IconButton
            className={classes.closeFilterIcon}
            onClick={() => close()}
            color="secondary">
            <CloseIcon />
          </IconButton>
        </div>
        <CategoriesList />
      </div>
    </Drawer>
  )
}

export default compose(withStyles(styles))(FilterDrawer)
