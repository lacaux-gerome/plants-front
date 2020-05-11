import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

import { Copyright } from "../components/molecules/copyright";
import { AppBarAdmin } from "../components/organism/appbar";
import { TableToolbar } from "../components/table/table-toolbar";
import { TableHeadAdmin, HeadCell } from "../components/table/table-head";
import { TableBody, TableRow, TableCell } from "@material-ui/core";

type HomeAdminProps = {
  isAppBarOpened: boolean;
  handleAppBarOpen: () => void;
};

interface Data {
  email: string;
  createdAt: number;
  role: string;
}
const createData = (email: string, createdAt: number, role: string): Data => ({
  email,
  createdAt,
  role,
});

const rows = [
  createData("gerome.lacaux@hetic.net", new Date().getTime(), "ADMIN"),
];
const headCells: HeadCell<Data>[] = [
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
    <EnhancedTable />
    <Box pt={4}>
      <Copyright />
    </Box>
  </>
);

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
type Order = "asc" | "desc";

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

function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("createdAt");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar title="Users" numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHeadAdmin
              order={order}
              headCells={headCells}
              numSelected={selected.length}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => (
                  <TableRow hover onClick={() => {}} tabIndex={-1} key={index}>
                    {Object.entries(row).map(([k, v]) => (
                      <TableCell
                        align="left"
                        component="th"
                        id={k}
                        scope="row"
                        padding="default"
                      >
                        {/* <Avatar>{row.name[0]}</Avatar>
            {row.name} */}
                        {v.toString()}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )}
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
