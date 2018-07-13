import React from "react"
import { withStyles } from "material-ui/styles"
import Button from "material-ui/Button"
import IconButton from "material-ui/IconButton"
import AddCircleIcon from "material-ui-icons/AddCircleOutline"
import { Drawer, MenuItem } from "material-ui"
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

const SettingsDrawer = ({
  isOpen,
  close,
  logout,
  token,
  validToken,
  openLoginModal,
}) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={() => close()}>
      <MenuItem onClick={() => close()}>CLOSE</MenuItem>
      <MenuItem>Select Happ Calendar</MenuItem>
      <MenuItem>
        {token ? (
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

      {validToken && "You are logged in according to validateToken."}
      {!validToken && "You are not logged in according to validateToken."}
    </Drawer>
  )
}

export default compose(withStyles(styles))(SettingsDrawer)
