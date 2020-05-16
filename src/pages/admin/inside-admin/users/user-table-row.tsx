import React from "react";
import clsx from "clsx";
import { User } from "generated/graphql";
import {
  TableRow,
  TableCell,
  Avatar,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";

type UserTableRowProps = {
  user: User;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarCell: {
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: "40px 250px",
      gridColumnGap: theme.spacing(2),
    },
  })
);
export const UserTableRow = ({ user }: UserTableRowProps) => {
  const classes = useStyles();
  return (
    <TableRow hover onClick={() => {}} tabIndex={-1} key={user.id}>
      <TableCell
        align="left"
        component="th"
        id={user.id}
        className={clsx(classes.avatarCell)}
        scope="row"
        padding="default"
      >
        <Avatar>{user.email[0]}</Avatar>
        <span>{user.email}</span>
      </TableCell>
      <TableCell
        align="left"
        component="th"
        id={user.id}
        scope="row"
        padding="default"
      >
        <span>{user.createdAt}</span>
      </TableCell>
      <TableCell
        align="left"
        component="th"
        id={user.id}
        scope="row"
        padding="default"
      >
        <span>{user.role}</span>
      </TableCell>
    </TableRow>
  );
};
