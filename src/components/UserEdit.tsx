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
import LoadingScreen from "./LoadingScreen";

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
});

const UserEdit = observer(() => {
  const classes = useStyles();
  const { userStore } = useStores();
  const history = useHistory();
  const { id } = useParams<{ id?: any }>();
  const param_id = parseInt(id);
  const user = userStore.getUser(param_id);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  if (user.length > 0) {
    const user_item = user[0];

    const [enabled, setEnabled] = useState(user_item.enabled);

    const ValidationSchema = Yup.object().shape({
      username: Yup.string()
        .min(2, "Too Short!")
        .max(15, "Too Long!")
        .test("alphanumeric", "Username should be alphanumeric", 
          function(value:any) {
            const alphanumericRegex: RegExp = new RegExp(/^[0-9a-zA-Z]+$/);
            return alphanumericRegex.test(value);
          })
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
          lastlogin: Date.now()
        };
        setIsLoading(true);
        userStore.updateUser(updateUser).then(() => {
          setIsLoading(false);
          history.push('/');
        });
      },
    });

    const { errors, touched, handleSubmit, getFieldProps } =
      formik;

    return (
      <>
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
        {isLoading && (
          <LoadingScreen />
        )}
      </>
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
});

export default UserEdit;
