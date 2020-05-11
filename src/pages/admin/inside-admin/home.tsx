import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import MaterialTable, { Column } from "material-table";

import { Copyright } from "../components/molecules/copyright";
import { AppBarAdmin } from "../components/organism/appbar";
import { tableIcons } from "../components/atoms/material-table-icons";
import { useTheme } from "@material-ui/core";

type HomeAdminProps = {
  isAppBarOpened: boolean;
  handleAppBarOpen: () => void;
};
export const HomeAdmin = ({
  handleAppBarOpen,
  isAppBarOpened,
}: HomeAdminProps) => (
  <>
    <AppBarAdmin
      title="Users"
      handleDrawerOpen={handleAppBarOpen}
      isOpened={isAppBarOpened}
    />
    <MaterialTableDemo />
    <Box pt={4}>
      <Copyright />
    </Box>
  </>
);

interface Row {
  createdAt: Date;
  email: string;
  role: string; // TODO change this
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default function MaterialTableDemo() {
  const [state, setState] = useState<TableState>({
    columns: [
      { title: "createdAt", field: "created At", type: "date" },
      { title: "email", field: "email" },
      { title: "role", field: "rôle" },
    ],
    data: [],
  });
  const theme = useTheme();
  return (
    <MaterialTable
      options={{
        headerStyle: {
          backgroundColor: theme.palette.action.selected,
        },
      }}
      icons={tableIcons}
      title="Users list"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
