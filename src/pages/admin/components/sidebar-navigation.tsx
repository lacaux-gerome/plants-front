import React from "react";
import { ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import { adminAppRouter } from "routes/internal-router";
import { useHistory } from "react-router-dom";

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
export const SidebarNavigation = () => {
  const history = useHistory();

  return (
    <List>
      {sidebarMap.map((sidebarItem) => (
        <div key={sidebarItem.id} onClick={() => sidebarItem.onClick(history)}>
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
  );
};
