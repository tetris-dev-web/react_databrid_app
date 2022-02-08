import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Container,
  Box,
  Grid,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useStores } from "../use-stores";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
});

const UserItem = observer(() => {
  const classes = useStyles();
  const { userStore } = useStores();
  const history = useHistory();
  const { id } = useParams<{ id?: any }>();
  const param_id = parseInt(id);
  const user = userStore.getUser(param_id);

  if (user.length > 0) {
    const user_item = user[0];

    const [enabled, setEnabled] = useState(user_item.enabled);
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
        username: user_item.username,
        firstname: user_item.firstname,
        lastname: user_item.lastname,
      },
      validationSchema: ValidationSchema,
      onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
        const updateUser = {
          id: param_id,
          username: values.username,
          firstname: values.firstname,
          lastname: values.lastname,
          enabled: enabled,
          lastlogin: new Date()
        };
        setTimeout(() => {
          userStore.updateUser(updateUser);
          history.push('/');
        }, 1000);
      },
    });

    const { errors, touched, handleSubmit, getFieldProps } =
      formik;

    return (
      <Container maxWidth="lg">
        <Box className={classes.content}>
          <h2>User Item</h2>
          <Grid container>
            <Grid item sm={6}>
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
                    Update
                  </Button>
                </Form>
              </FormikProvider>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="lg">
        <Box className={classes.content}>
          <h2>User Item</h2>
          <Grid container>
            <Grid item sm={6}></Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

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
});

export default UserItem;
