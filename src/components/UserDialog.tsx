import React, { useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { makeStyles } from "@material-ui/core/styles";
// import { LoadingButton } from "@material-ui/lab";
import { useStores } from "../use-stores";

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
  const { userStore } = useStores();

  const [enabled, setEnabled] = useState(false);

  const ValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("User Name required"),
    firstname: Yup.string()
      .min(2, "Too Short!")
      .max(25, "Too Long!")
      .required("First Name required"),
    lastname: Yup.string()
      .min(2, "Too Short!")
      .max(25, "Too Long!")
      .required("Last Name required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      const newUser = {
        id: Date.now(),
        username: values.username,
        firstname: values.firstname,
        lastname: values.lastname,
        enabled: enabled,
        lastlogin: Date.now()
      };
      setTimeout(() => {
        userStore.addUser(newUser);
        closeModal();
      }, 1000);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Modal aria-labelledby="modal-new-todo" open={isOpen} onClose={closeModal}>
      <Box className={classes.content}>
        <h2 id="modal-new-todo">Add User</h2>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="User Name"
              {...getFieldProps("username")}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              fullWidth
              label="First Name"
              {...getFieldProps("firstname")}
              error={Boolean(touched.firstname && errors.firstname)}
              helperText={touched.firstname && errors.firstname}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              fullWidth
              label="Last Name"
              {...getFieldProps("lastname")}
              error={Boolean(touched.lastname && errors.lastname)}
              helperText={touched.lastname && errors.lastname}
              style={{ marginBottom: "1rem" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  // {...enabled ? "checked" : ""}
                  onChange={() => setEnabled(!enabled)}
                  color="primary"
                />
              }
              label="Enabled"
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
          </Form>
        </FormikProvider>
      </Box>
    </Modal>
  );
}
