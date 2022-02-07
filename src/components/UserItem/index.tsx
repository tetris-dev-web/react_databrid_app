import React, { useState } from "react";
import { StyledTodoItem } from "./styles";
import { useParams } from 'react-router-dom';
import { Button, Checkbox, IconButton, TextField } from "@material-ui/core";
import { IUser } from "../../stores/UserStore";
import { useStores } from "../../use-stores";
import { observer } from "mobx-react-lite";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FlexContainer from "../FlexContainer";

const UserItem = observer(() => {
  // const [editMode, setEditMode] = useState(false);
  // const [formValue, setFormvalue] = useState(user.username);
  const { id } = useParams<{id?: any}>();
  const { userStore } = useStores();
  const user = userStore.getUser(id);
  console.log("user:",user);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newUser = {
  //     ...user,
  //     username: formValue
  //   };
  //   userStore.updateUser(newUser);
  //   setEditMode(false);
  // };
  // const { id } = useParams(); // property id
  

  return (
    <div>
      <h2>User Item</h2>
    </div>
  );
});

export default UserItem;