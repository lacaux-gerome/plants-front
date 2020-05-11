import React from "react";
import { useHistory } from "react-router-dom";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Divider,
} from "@material-ui/core";
import { adminAppRouter } from "routes/internal-router";

import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

type SidebarItem = {
  id: number;
  label: string;
  route: string;
  isActive: (route: string) => boolean;
  icon: JSX.Element;
  onClick: (history) => void;
};

const sidebarMap: SidebarItem[] = [
  {
    id: 1,
    label: "Users",
    route: adminAppRouter.home(),
    isActive: (route) => adminAppRouter.home() === route,
    icon: <PersonIcon />,
    onClick: (history) => history.push(adminAppRouter.home()),
  },
];

type SidebarNavigationProps = {
  disconnectFromAdmin: () => void;
};
export const SidebarNavigation = ({
  disconnectFromAdmin,
}: SidebarNavigationProps) => {
  const history = useHistory();
  return (
    <>
      <List>
        {sidebarMap.map((sidebarItem) => (
          <div
            key={sidebarItem.id}
            onClick={() => sidebarItem.onClick(history)}
          >
            <ListItem
              selected={sidebarItem.isActive(history.location.pathname)}
              button
            >
              <ListItemIcon>{sidebarItem.icon}</ListItemIcon>
              <ListItemText primary={sidebarItem.label} />
            </ListItem>
          </div>
        ))}
      </List>
      <List>
        <Divider />
        <ListItem onClick={disconnectFromAdmin} button>
          <ListItemIcon>
            <ExitToAppIcon color="inherit" />
          </ListItemIcon>
          <ListItemText>Se deconnecter</ListItemText>
        </ListItem>
      </List>
    </>
  );
};
