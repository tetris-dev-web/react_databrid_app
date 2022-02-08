import * as React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
  Form,
  Field,
  FormElement,
  FormRenderProps,
  FieldRenderProps
} from "@progress/kendo-react-form";
import { Input, Switch } from "@progress/kendo-react-inputs";
import {DateInput } from "@progress/kendo-react-dateinputs";
import { Error } from "@progress/kendo-react-labels";
import { getter } from "@progress/kendo-react-common";
import { Button } from '@progress/kendo-react-buttons';

interface AddUserProps {
  cancelAdd: () => void;
  onSubmit: (event: any) => void;
}

const usernameGetter: any = getter("username");
const firstNameGetter: any = getter("firstname");
const lastNameGetter: any = getter("lastname");
const submitValidator = (values: any) => {

  let validated: boolean = true;

  // User name validation
  let msgUsername:string = "";
  const username = usernameGetter(values);
  if (username == undefined || username == "") {
    msgUsername = "Usernameis required";
    validated = false;
  }
  if (username != undefined && username.length > 25) {
    msgUsername = "User length should be less than 15.";
    validated = false;
  }
  const alphanumericRegex: RegExp = new RegExp(/^[0-9a-zA-Z]+$/);
  if (!alphanumericRegex.test(username)) {
    msgUsername = "Username should be alphanumeric.";
    validated = false;
  }

  // First name validation
  let msgFirstName:string = "";
  const firstName = firstNameGetter(values);
  if (firstName == undefined || firstName == "") {
    msgFirstName = "First name is required";
    validated = false;
  }
  if (firstName != undefined && firstName.length > 25) {
    msgFirstName = "First name length should be less than 25.";
    validated = false;
  }

  // Last name validation
  let msgLastName:string = "";
  const lastName = lastNameGetter(values);
  if (lastName == undefined || lastName == "") {
    msgLastName = "Last name is required";
    validated = false;
  }
  if (lastName != undefined && lastName.length > 25) {
    msgLastName = "Last name length should be less than 25.";
    validated = false;
  }
  
  // Full name validation
  if (firstName != undefined && lastName != undefined && (firstName.length + lastName.length) > 40) {
    msgFirstName = "Full name length should be less than 40.";
    msgLastName = "Full name length should be less than 40.";
    validated = false;
  }

  // If validation is ok, pass it
  if (validated) return;

  return {
    VALIDATION_SUMMARY: "Please input valid information",
    ["username"]: msgUsername,
    ["firstname"]: msgFirstName,
    ["lastname"]: msgLastName
  };
};

const ValidatedInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const AddUserDialog = (props: AddUserProps) => {
  return (
    <Dialog title="Add User" onClose={props.cancelAdd} width = {400} >
      <Form
        onSubmit={props.onSubmit}
        validator={submitValidator}
        render={(formRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <fieldset className={"k-form-fieldset"}>
            <legend className={"k-form-legend"}>
              Please fill in the following information:
            </legend>
            {formRenderProps.visited &&
              formRenderProps.errors &&
              formRenderProps.errors.VALIDATION_SUMMARY && (
                <div className={"k-messagebox k-messagebox-error"}>
                  {formRenderProps.errors.VALIDATION_SUMMARY}
                </div>
              )}
              <div className="mb-3">
                <Field
                  name={"username"}
                  component={ValidatedInput}
                  label={"User Name"}
                />
              </div>
              <div className="mb-6">
                <Field
                  name={"firstname"}
                  component={ValidatedInput}
                  label={"First Name"}
                />
              </div>
              <div className="mb-6">
                <Field
                  name={"lastname"}
                  component={ValidatedInput}
                  label={"Last Name"}
                />
              </div>
              <div className="mb-6">
                <Field
                  name={"lastlogin"}
                  component={DateInput}
                  label={"Last Login"}
                />
              </div>
              <div className="mb-6">
                <Field
                  name={"enabled"}
                  component={Switch}
                  label={"Enabled"}
                />
              </div>
            </fieldset>
            <DialogActionsBar>
              <div className="k-form-buttons">
                <Button
                  themeColor={"primary"}
                  disabled={!formRenderProps.allowSubmit}
                >
                  Submit
                </Button>
                <Button
                  fillMode="outline"
                  themeColor={"info"}
                  onClick={props.cancelAdd}
                >
                  Cancel
                </Button>
              </div>
            </DialogActionsBar> 
          </FormElement>
        )}
      />
    </Dialog>
  );
};
export default AddUserDialog;