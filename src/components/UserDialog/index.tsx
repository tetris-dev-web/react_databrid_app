import React, { useState } from "react";
import { Modal, Button, TextField, Box } from "@material-ui/core";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
// import { useForm } from '../../hooks/useForm';
import { makeStyles } from "@material-ui/core/styles";
import { useStores } from "../../use-stores";

const useStyles = makeStyles({
  content: {
    backgroundColor: "white",
    padding: "1rem",
    maxWidth: "600px",
    margin: "1rem auto",
  },
});

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}
export default function UserDialog({ isOpen, closeModal }: IProps) {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { todoStore, userStore } = useStores();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    // setText(e.target.value);
    // handleUser({e.target.name: e.target.value})
  };

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [enabled, setEnabled] = useState(false);
  // const [user, handleUser] = useForm({ id, username, firstname, lastname });
  // const [user, handleUser] = useForm({});

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newUser = {
  //     id: Date.now(),
  //     username: username,
  //     firstname: firstname,
  //     lastname: lastname,
  //     enabled: enabled,
  //   };
  //   console.log(newUser);
  //   userStore.addUser(newUser);
  //   closeModal();
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Modal aria-labelledby="modal-new-todo" open={isOpen} onClose={closeModal}>
      <Box className={classes.content}>
        <h2 id="modal-new-todo">Add User</h2>
        <form onSubmit={onSubmit} noValidate>
          <TextField
            id="standard-basic"
            autoFocus
            label="Username"
            fullWidth
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            //   setUsername(e.target.value)
            // }
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            id="standard-basic"
            label="Firstname"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstname(e.target.value)
            }
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            id="standard-basic"
            label="Lastname"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLastname(e.target.value)
            }
            style={{ marginBottom: "1rem" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
