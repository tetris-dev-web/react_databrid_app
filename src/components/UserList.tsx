import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";

import '@progress/kendo-theme-default/dist/all.scss';
import '@progress/kendo-theme-default/dist/default-nordic.scss';
import { DataResult, process, State } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridCellProps, GridToolbar, GridDataStateChangeEvent, GridRowClickEvent } from '@progress/kendo-react-grid';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button, ButtonGroup } from '@progress/kendo-react-buttons';

import { IUser } from '../interfaces/User';
import AddUserDialog from "./AddUserDialog";
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
  const { userStore } = useStores();
  useEffect(() => {
    userStore.getUsers().then(refreshUser);
  }, [userStore]);  

  // Local variables
  let history = useHistory();
  let deletingUserId:number = 0;

  const createDataState = (dataState: State) => {
    return {
      result: process(userStore.users.slice(0), dataState),
      dataState: dataState,
    };
  };

  let initialState = createDataState({
    filter: {
      logic: "and",
      filters: [{ field: "username", operator: "contains", value: "" }],
    },
    sort: [{
      field: "username",
      dir: "asc"
    }],
    take: 8,
    skip: 0,
  });

  // State Defination
  const [allowUnsort, setAllowUnsort] = React.useState<boolean>(true);
  const [multipleSort, setMultipleSort] = React.useState<boolean>(false);
  const [gridDataState, setGridDataState] = React.useState<State>(initialState.dataState);
  const [gridClickedRow, setGridClickedRow] = React.useState<any>({});
  const [result, setResult] = React.useState<DataResult>(initialState.result);
  const [openAddDialog, setOpenAddDialog] = React.useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);

  // Load User List
  const refreshUser = () => {
    let updatedState = createDataState(gridDataState);
    setResult(updatedState.result);
  }

  // Event Handler
  const handleGridDataStateChange = (event: GridDataStateChangeEvent) => {
    let updatedState = createDataState(event.dataState);
    setResult(updatedState.result);
    setGridDataState(updatedState.dataState);
  }

  const handleGridRowClick = (event: GridRowClickEvent) => {
    setGridClickedRow(event.dataItem);
  }

  const handleGoEdit = (item: IUser) => {
    history.push('/edit/' + item.id);
  };

  const handleDeleteClick = (item: IUser) => {
    setOpenDeleteDialog(true);
    deletingUserId = item.id;
  };

  const handleDeleteConfirm = () => {
    userStore.deleteUser(deletingUserId).then(refreshUser);
    setOpenDeleteDialog(false);
  }
  const handleCancelAdd = () => {
    setOpenAddDialog(false);
  };

  const handleAddSubmit = (event:any) => {
    const newUser = {
      id: Date.now(),
      username: event.username,
      firstname: event.firstname,
      lastname: event.lastname,
      enabled: event.enabled,
      lastlogin: event.lastlogin
    };
    setTimeout(() => {
      userStore.addUser(newUser).then(refreshUser);
    }, 1000);
    setOpenAddDialog(false);
  };

  const toggleDeleteDialog = (event:any) => {
    setOpenDeleteDialog(!openDeleteDialog);
  }

  // Cell Rendering
  const columnFullName = (props: GridCellProps) => {
    return (
      <td>
        {props.dataItem.firstname + " " + props.dataItem.lastname}
      </td>
    );
  }
  
  const columnLastLogin = (props: GridCellProps) => {
    const field = props.field || "";
    const value = props.dataItem[field];
    const newDate = new Date(value);
    return (
      <td>
        {newDate.toLocaleDateString() + ' ' + newDate.toLocaleTimeString()}
      </td>
    );
  }
  
  const columnEnabled = (props: GridCellProps) => {
    const field = props.field || "";
    const value = props.dataItem[field];
    return (
      <td className = {value ? "k-color-info" : "k-color-error"} >
        {value ? "Yes" : "No"}
      </td>
    );
  }

  const columnAction = (props: GridCellProps) => {
    return (
      <td>
        <ButtonGroup>
          <Button
            fillMode="outline"
            themeColor={"info"}
            onClick={() => handleGoEdit(props.dataItem)}
          >
            Edit
          </Button>
          <Button
            fillMode="solid"
            themeColor={"primary"}
            onClick={() =>handleDeleteClick(props.dataItem)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </td>
    );
  }

  return (
    <>
      <div className={classes.list}>
        <Grid
          data={result}
          pageable={true}
          sortable={{
            allowUnsort: allowUnsort,
            mode: multipleSort ? "multiple" : "single",
          }}
          filterable={true}
          {...gridDataState}
          onDataStateChange={handleGridDataStateChange}
          onRowClick={handleGridRowClick}
          style={{ height: "400px" }}>
          <GridToolbar>
            &nbsp;&nbsp;&nbsp;
            <Button
              title="Add User"
              themeColor={"primary"}
              onClick = {() => {setOpenAddDialog(true)}}
            >
              Add User
            </Button>
            <input
              type="checkbox"
              className="k-checkbox k-checkbox-md k-rounded-md"
              id="unsort"
              checked={allowUnsort}
              onChange={(event) => {
                setAllowUnsort(event.target.checked);
              }}
            />
            <label
              htmlFor="unsort"
              className="k-checkbox-label"
              style={{
                lineHeight: "1.2",
              }}
            >
              Enable unsorting
            </label>
            &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              className="k-checkbox k-checkbox-md k-rounded-md"
              id="multiSort"
              checked={multipleSort}
              onChange={(event) => {
                setMultipleSort(event.target.checked);
              }}
            />
            <label
              htmlFor="multiSort"
              className="k-checkbox-label"
              style={{
                lineHeight: "1.2",
              }}
            >
              Enable multiple columns sorting
            </label>            
          </GridToolbar>
          <GridColumn field="username" title="Username" />
          <GridColumn field="firstname" title="Full Name" cell = {columnFullName} filterable = {false} />
          <GridColumn field="lastlogin" title="Last Login" cell = {columnLastLogin}  filterable = {false} />
          <GridColumn field="enabled" cell={columnEnabled} filterable = {false} />
          <GridColumn cell={columnAction} filterable = {false} />
        </Grid>
      </div>
      {openAddDialog && (
      <AddUserDialog
        cancelAdd={handleCancelAdd}
        onSubmit={handleAddSubmit}
      />
      )}
      {openDeleteDialog && (
        <Dialog title={"Please confirm delete"} onClose={() => {setOpenDeleteDialog(false)}}>
        <p style={{ margin: "25px", textAlign: "center" }}>
          Are you sure you want to delete?
        </p>
        <DialogActionsBar>
          <Button
            fillMode="outline"
            themeColor={"info"}
            onClick={() => {setOpenDeleteDialog(false)}}
          >
            No
          </Button>
          <Button
            themeColor={"primary"}
            onClick={handleDeleteConfirm}
          >
            Yes
          </Button>
        </DialogActionsBar>
      </Dialog>        
      )}

    </>
  );
});

export default UserList;
