import React, { useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Button,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UserDialog from "./UserDialog";
import { useStores } from "../use-stores";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    minHeight: "300px",
  },
  table: {
    minWidth: 650,
  },
  marginRight: {
    marginRight: 10,
  },
});

const UserList = observer(() => {
  const classes = useStyles();
  const [modalUserOpen, setModalUser] = useState(false);
  const { userStore } = useStores();

  return (
    <>
      {modalUserOpen && (
        <UserDialog
          isOpen={modalUserOpen}
          closeModal={() => setModalUser(false)}
        />
      )}
      <Container maxWidth="lg">
        <Box className={classes.header}>
          <h2>User List</h2>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setModalUser(true)}
          >
            New User
          </Button>
        </Box>
        <Box className={classes.list}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">FullName</TableCell>
                  <TableCell align="center">LastLogin</TableCell>
                  <TableCell align="center">Enabled</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userStore.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">
                      {user.firstname} {user.lastname}
                    </TableCell>
                    <TableCell align="center">{new Date(user.lastlogin).toLocaleDateString() + ' ' + new Date(user.lastlogin).toLocaleTimeString()}</TableCell>
                    <TableCell align="center">
                      {user.enabled ? "True" : "False"}
                    </TableCell>
                    <TableCell align="center">
                      
                      <IconButton className={classes.marginRight} component={Link} to={`edit/${user.id}`}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => userStore.deleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
});

export default UserList;
