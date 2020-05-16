import React from "react";
import clsx from "clsx";
// Material UI named
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Material UI default
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// Icons
import MenuIcon from "@material-ui/icons/Menu";

type AppBarAdmin = {
  handleDrawerOpen: () => void;
  isOpened: boolean;
  title: string;
};

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonHidden: {
    visibility: "hidden",
  },
  title: {
    flexGrow: 1,
    marginLeft: 36,
  },
}));
export const AppBarAdmin = ({
  handleDrawerOpen,
  isOpened,
  title,
}: AppBarAdmin) => {
  const classes = useStyles();
  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, isOpened && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(isOpened && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={clsx(classes.title)}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
