import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import firebase from "../../services/firebase";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const SubscribersListing = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    firebase.child("subscribers").on("value", (snapshot) => {
      console.log(snapshot.val());
      setRows(snapshot.val());
    });
  }, []);
  return (
    <>
      <h1
        style={{ marginBottom: "2rem", textAlign: "center", marginTop: "2rem" }}
      >
        Subscriber Listing
      </h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone Number</StyledTableCell>
              <StyledTableCell align="right">UID</StyledTableCell>
              <StyledTableCell align="right">isEmail Verified</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(rows).map((id) => {
              return (
                <StyledTableRow key={rows[id].displayName}>
                  <StyledTableCell component="th" scope="row">
                    {rows[id].displayName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {rows[id].email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {rows[id].phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {rows[id].uid}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {rows[id].emailVerified ? <h5>true</h5> : <h5>false</h5>}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
