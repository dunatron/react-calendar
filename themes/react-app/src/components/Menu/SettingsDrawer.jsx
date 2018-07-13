import React from "react"
import { withStyles } from "material-ui/styles"
import Button from "material-ui/Button"
import IconButton from "material-ui/IconButton"
import AddCircleIcon from "material-ui-icons/AddCircleOutline"
import { Drawer, MenuItem } from "material-ui"
import { compose } from "react-apollo/index"
import CloseIcon from "material-ui-icons/Close"
import ExitToAppIcon from "material-ui-icons/ExitToApp"
import NavigationIcon from "material-ui-icons/Navigation"

const drawerWidth = 240
const styles = theme => ({
  root: {
    color: theme.palette.primary.main,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
  closeSettingsIcon: {
    color: theme.palette.secondary.main,
  },
  exitToAppIcon: {
    color: theme.palette.secondary.main,
  },
})

const SettingsDrawer = ({
  isOpen,
  close,
  logout,
  token,
  validToken,
  openLoginModal,
  hasValidToken,
  classes,
}) => {
  return (
    <Drawer
      // variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
      open={isOpen}
      onClose={() => close()}>
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <IconButton
            className={classes.closeSettingsIcon}
            onClick={() => close()}
            color="secondary">
            <CloseIcon />
          </IconButton>
          <Button
            variant="extendedFab"
            aria-label="login"
            onClick={hasValidToken ? () => logout() : () => openLoginModal()}
            className={classes.button}>
            {hasValidToken ? "Logout " : "Login"}{" "}
            <ExitToAppIcon className={classes.exitToAppIcon} />
          </Button>
        </div>
        <MenuItem>
          {hasValidToken ? (
            <Button color="contrast" onClick={() => logout()}>
              Logout
            </Button>
          ) : (
            <IconButton
              aria-label="Add to favorites"
              onClick={() => openLoginModal()}>
              <AddCircleIcon />
            </IconButton>
          )}
        </MenuItem>

        {hasValidToken && "You are logged in according to validateToken."}
        {!hasValidToken && "You are not logged in according to validateToken."}
      </div>
    </Drawer>
  )
}

export default compose(withStyles(styles))(SettingsDrawer)
