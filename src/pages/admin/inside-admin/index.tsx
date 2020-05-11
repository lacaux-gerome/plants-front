import React, { useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AppContext } from "typed-index";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
// Components and internal
import { HomeAdmin } from "./home";
import { adminAppRouter } from "routes/internal-router";
// Material UI named
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Material UI default
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
// Icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { SidebarNavigation } from "../components/organism/sidebar-navigation";
import { localStorageWrapper } from "network/local-storage/local-storage-wrapper";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const InsideAdmin = () => {
  const classes = useStyles();
  const { setIsConnected } = useContext(AppContext);
  const history = useHistory();
  //states
  const [isAppBarOpened, setIsAppBarOpened] = useState<boolean>(true);
  //logic
  const handleAppBarOpen = () => setIsAppBarOpened(true);
  const handleAppBarClose = () => setIsAppBarOpened(false);
  const disconnectFromAdmin = () => {
    // TODO add call to api to disconnect the user
    localStorageWrapper.removeItem("isConnectedToAdmin");
    setIsConnected(false);
    history.push(adminAppRouter.login());
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !isAppBarOpened && classes.drawerPaperClose
          ),
        }}
        open={isAppBarOpened}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleAppBarClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SidebarNavigation disconnectFromAdmin={disconnectFromAdmin} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route path={adminAppRouter.home()} exact>
              <HomeAdmin
                isAppBarOpened={isAppBarOpened}
                handleAppBarOpen={handleAppBarOpen}
              />
            </Route>
          </Switch>
        </Container>
      </main>
    </div>
  );
};
