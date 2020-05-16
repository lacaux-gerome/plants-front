import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { adminAppRouter } from "routes/internal-router";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TableBody, TableRow, TableCell, Button } from "@material-ui/core";

import { User, Query, QueryPaginatedUsersArgs } from "generated/graphql";
import { UserTableRow } from "./user-table-row";
import { AppBarAdmin } from "pages/admin/components/organism/appbar";
import { Copyright } from "pages/admin/components/molecules/copyright";
import {
  HeadCell,
  TableHeadAdmin,
} from "pages/admin/components/table/table-head";
import {
  Order,
  stableSort,
  getComparator,
} from "pages/admin/components/table/table-sort";
import { TableToolbar } from "pages/admin/components/table/table-toolbar";

type HomeAdminProps = {
  isAppBarOpened: boolean;
  handleAppBarOpen: () => void;
};

export const UsersAdmin = ({
  handleAppBarOpen,
  isAppBarOpened,
}: HomeAdminProps) => {
  const history = useHistory();
  const _handleClickNewUser = () => {
    history.push(adminAppRouter.newUser());
  };
  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={_handleClickNewUser}
      >
        New user
      </Button>
      <AppBarAdmin
        title="Users"
        handleDrawerOpen={handleAppBarOpen}
        isOpened={isAppBarOpened}
      />
      <UsersTable />
      <Box pt={4}>
        <Copyright />
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
  })
);
const headCells: HeadCell<User>[] = [
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    sortable: false,
    label: "Email",
  },
  {
    id: "createdAt",
    sortable: true,
    numeric: true,
    disablePadding: false,
    label: "Crée le",
  },
  {
    id: "role",
    numeric: false,
    sortable: true,
    disablePadding: false,
    label: "Roles",
  },
];

const getAllUsers = gql`
  query GetAllUsers($offset: Int!, $limit: Int!) {
    paginatedUsers(offset: $offset, limit: $limit) {
      users {
        id
        createdAt
        email
        role
      }
      length
    }
  }
`;
const UsersTable = () => {
  const classes = useStyles();
  // Order states
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof User>("createdAt");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { data, loading } = useQuery<
    Pick<Query, "paginatedUsers">,
    QueryPaginatedUsersArgs
  >(getAllUsers, {
    variables: {
      offset: page,
      limit: rowsPerPage,
    },
    // fetchPolicy: "cache-and-network",
  });
  if (loading) {
    return <div>Loading</div>;
  }
  if (!data) {
    return <div>Empty row</div>;
  }
  const paginatedUsers = data.paginatedUsers;
  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof User
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, paginatedUsers.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar title="Users" />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHeadAdmin
              order={order}
              headCells={headCells}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={paginatedUsers.length}
            />
            <TableBody>
              {stableSort(
                paginatedUsers.users,
                getComparator(order, orderBy)
              ).map((user: User) => (
                <UserTableRow user={user} />
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={paginatedUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
